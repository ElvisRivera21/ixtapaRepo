const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();

// === CONFIGURATION ===
// Allow your approved frontends (local + deployed)
const ALLOW_ORIGINS = (process.env.ALLOW_ORIGINS || "")
  .split(",")
  .map(s => s.trim())
  .filter(Boolean);

console.log("🌐 Allowed origins:", ALLOW_ORIGINS);

app.use(cors({
  origin: (origin, cb) => {
    // Allow requests with no origin (like curl or local testing)
    if (!origin || ALLOW_ORIGINS.length === 0 || ALLOW_ORIGINS.includes(origin)) {
      return cb(null, true);
    }
    console.warn(`❌ Blocked CORS request from origin: ${origin}`);
    return cb(new Error("Not allowed by CORS"), false);
  },
  methods: ["POST"],
}));

app.use(express.json({ limit: "200kb" }));

// Health check route
app.get("/", (_req, res) => res.send("Wedding RSVP backend is running."));

app.post("/rsvp", async (req, res) => {
  try {
    const { name, email, attending, guests, message } = req.body || {};

    if (!name || !email || !attending || !guests) {
      return res.status(400).json({ error: "Missing required fields." });
    }

    // === Email Transport Setup ===
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST || "smtp.gmail.com",
      port: Number(process.env.EMAIL_PORT || 465),
      secure: String(process.env.EMAIL_SECURE || "true") === "true",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Optional: Verify SMTP connection (debug helper)
    await transporter.verify().catch(err =>
      console.warn("⚠️ SMTP verification failed:", err.message)
    );

    // === Email Body ===
    const subject = `Wedding RSVP — ${name} (${attending})`;

    const text = `
Name: ${name}
Email: ${email}
Attending: ${attending}
Guests (incl. sender): ${guests}
Message: ${message || "(none)"}
    `.trim();

    const html = `
      <div style="font-family: Arial, sans-serif; line-height: 1.5;">
        <h2 style="margin: 0 0 8px;">Wedding RSVP</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Attending:</strong> ${attending}</p>
        <p><strong>Guests (including sender):</strong> ${guests}</p>
        <p><strong>Message:</strong><br>${(message || "(none)").replace(/\n/g, "<br>")}</p>
      </div>
    `;

    // === Send Email ===
    await transporter.sendMail({
      from: `"RSVP Bot" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO,
      cc: process.env.EMAIL_CC || undefined,
      bcc: process.env.EMAIL_BCC || undefined,
      replyTo: email,
      subject,
      text,
      html,
    });

    console.log(`✅ RSVP email sent successfully from ${process.env.EMAIL_USER} to ${process.env.EMAIL_TO}`);
    res.status(200).json({ ok: true });
  } catch (err) {
    console.error("❌ RSVP send error:", err.message);
    res.status(500).json({ error: err.message || "Failed to send RSVP." });
  }
});

// === START SERVER ===
const PORT = process.env.PORT || 10000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`✅ RSVP backend listening on port ${PORT}`);
});