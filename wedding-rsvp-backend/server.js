const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
require("dotenv").config();

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const app = express();

// =====================
// CONFIGURATION
// =====================
const ALLOW_ORIGINS = (process.env.ALLOW_ORIGINS || "")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

console.log("🌐 Allowed origins:", ALLOW_ORIGINS);

app.use(
  cors({
    origin: (origin, cb) => {
      // Allow requests with no origin (curl, server-to-server, etc.)
      if (!origin || ALLOW_ORIGINS.length === 0 || ALLOW_ORIGINS.includes(origin)) {
        return cb(null, true);
      }
      console.warn(`❌ Blocked CORS request from origin: ${origin}`);
      return cb(new Error("Not allowed by CORS"), false);
    },
    methods: ["GET", "POST", "OPTIONS"],
  })
);

app.use(express.json({ limit: "200kb" }));

// =====================
// ROUTES
// =====================

// Health check
app.get("/", (_req, res) => res.send("Wedding RSVP backend is running."));

// RSVP endpoint: SAVE -> EMAIL -> RESPOND
app.post("/rsvp", async (req, res) => {
  try {
    const { name, email, attending, guests, message } = req.body || {};

    // Basic validation (don’t reject "No"/false)
    const trimmedName = String(name || "").trim();
    const trimmedEmail = String(email || "").trim().toLowerCase();
    const partySize = Number(guests);

    if (!trimmedName || !trimmedEmail || Number.isNaN(partySize)) {
      return res.status(400).json({
        ok: false,
        error: "Missing required fields. Required: name, email, guests, attending",
      });
    }

    // Convert attending to boolean safely
    const attendingBool =
      typeof attending === "boolean"
        ? attending
        : ["yes", "true", "y", "1"].includes(String(attending || "").trim().toLowerCase());

    // Split name into first/last (simple)
    const parts = trimmedName.split(/\s+/);
    const firstName = parts.shift() || "";
    const lastName = parts.join(" ") || "";

    // =====================
    // 1) SAVE TO DATABASE
    // =====================
    const saved = await prisma.rsvp.create({
      data: {
        firstName,
        lastName,
        email: trimmedEmail,
        partySize,
        attending: attendingBool,
        notes: message ? String(message) : null,
      },
    });

    // =====================
    // 2) SEND EMAIL
    // =====================
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST || "smtp.gmail.com",
      port: Number(process.env.EMAIL_PORT || 465),
      secure: String(process.env.EMAIL_SECURE || "true") === "true",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Optional SMTP verify (won't fail the request if it errors)
    await transporter.verify().catch((err) => {
      console.warn("⚠️ SMTP verification failed:", err?.message || err);
    });

    const subject = `Wedding RSVP — ${trimmedName} (${attendingBool ? "Attending" : "Not attending"})`;

    const text = `
Name: ${trimmedName}
Email: ${trimmedEmail}
Attending: ${attendingBool ? "Yes" : "No"}
Guests (incl. sender): ${partySize}
Message: ${message || "(none)"}
DB Record ID: ${saved.id}
    `.trim();

    const html = `
      <div style="font-family: Arial, sans-serif; line-height: 1.5;">
        <h2 style="margin: 0 0 8px;">Wedding RSVP</h2>
        <p><strong>Name:</strong> ${trimmedName}</p>
        <p><strong>Email:</strong> ${trimmedEmail}</p>
        <p><strong>Attending:</strong> ${attendingBool ? "Yes" : "No"}</p>
        <p><strong>Guests (including sender):</strong> ${partySize}</p>
        <p><strong>Message:</strong><br>${(message || "(none)").replace(/\n/g, "<br>")}</p>
        <hr/>
        <p style="color:#666; font-size:12px;">DB Record ID: ${saved.id}</p>
      </div>
    `;

    await transporter.sendMail({
      from: `"RSVP Bot" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO,
      cc: process.env.EMAIL_CC || undefined,
      bcc: process.env.EMAIL_BCC || undefined,
      replyTo: trimmedEmail,
      subject,
      text,
      html,
    });

    console.log(
      `✅ RSVP saved (${saved.id}) + email sent from ${process.env.EMAIL_USER} to ${process.env.EMAIL_TO}`
    );

    return res.status(201).json({ ok: true, savedId: saved.id });
  } catch (err) {
    console.error("❌ RSVP error:", err);
    return res.status(500).json({ ok: false, error: "Failed to process RSVP." });
  }
});

// =====================
// START SERVER
// =====================
const PORT = process.env.PORT || 10000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`✅ RSVP backend listening on port ${PORT}`);
});

// Graceful shutdown (helps Prisma in dev)
process.on("SIGINT", async () => {
  console.log("\n🧹 Shutting down...");
  await prisma.$disconnect();
  process.exit(0);
});