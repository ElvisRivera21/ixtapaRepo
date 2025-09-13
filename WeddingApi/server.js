// server.js
import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();

// --- ENV ---
const PORT = process.env.PORT || 3000;

/**
 * Allow multiple origins.
 * You can set ALLOWED_ORIGINS in Render like:
 *   https://justinandkiara.com,https://www.justinandkiara.com,http://localhost:5173
 */
const RAW_ORIGINS =
  process.env.ALLOWED_ORIGINS ||
  "http://localhost:5173,https://justinandkiara.com,https://www.justinandkiara.com";
const ALLOWLIST = RAW_ORIGINS.split(",").map((s) => s.trim());

// Helpful: confirm which DB this process is using
try {
  const dbHost = new URL(process.env.DATABASE_URL).host;
  console.log("DB host:", dbHost);
} catch {
  console.log("DATABASE_URL not set or unparsable.");
}

// --- MIDDLEWARE ---
app.use(express.json());

// CORS (allow-list + proper preflight)
app.use(
  cors({
    origin: (origin, cb) => {
      // allow non-browser tools (curl/Postman) with no Origin header
      if (!origin) return cb(null, true);
      if (ALLOWLIST.includes(origin)) return cb(null, true);
      return cb(new Error(`Not allowed by CORS: ${origin}`));
    },
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: false,
  })
);
// Respond to all OPTIONS preflights
app.options("*", cors());

// --- HEALTH ---
app.get("/", (_req, res) => res.send("API OK"));

// --- CREATE RSVP (from your form) ---
// Accepts: { name, attending, guests, message, email?, firstName?, lastName?, guestId? }
app.post("/rsvp", async (req, res) => {
  try {
    const {
      name,
      attending,
      guests,
      message,
      email,
      firstName,
      lastName,
      guestId,
    } = req.body;

    if (!name) return res.status(400).json({ error: "Missing 'name'." });

    // normalize types from the form
    const attendingBool =
      typeof attending === "boolean"
        ? attending
        : String(attending).toLowerCase() === "yes" ||
          String(attending).toLowerCase() === "true";

    const guestsInt = Number.isFinite(Number(guests)) ? Number(guests) : 0;

    // If you collect email, upsert a Guest; or connect by guestId if provided
    let guestConnect = undefined;
    if (email) {
      const guest = await prisma.guest.upsert({
        where: { email },
        create: { email, firstName: firstName || null, lastName: lastName || null },
        update: { firstName: firstName || null, lastName: lastName || null },
      });
      guestConnect = { connect: { id: guest.id } };
    } else if (guestId) {
      guestConnect = { connect: { id: Number(guestId) } };
    }

    const row = await prisma.rSVP.create({
      data: {
        name,
        attending: attendingBool,
        guests: guestsInt,
        message: message || null,
        ...(guestConnect || {}),
      },
    });

    console.log("RSVP created:", row);
    res.status(201).json(row);
  } catch (err) {
    console.error("POST /rsvp failed:", err);
    res.status(500).json({ error: "Failed to save RSVP" });
  }
});

// --- LIST RSVPs (with Guest info) ---
app.get("/rsvps", async (req, res) => {
  try {
    const {
      q = "",
      attending = "all", // all | yes | no
      sort = "desc",     // asc | desc
      limit = "100",
      offset = "0",
    } = req.query;

    const where = {
      AND: [
        q
          ? {
              OR: [
                { name: { contains: String(q), mode: "insensitive" } },
                { message: { contains: String(q), mode: "insensitive" } },
                { guest: { email: { contains: String(q), mode: "insensitive" } } },
              ],
            }
          : {},
        attending === "yes"
          ? { attending: true }
          : attending === "no"
          ? { attending: false }
          : {},
      ],
    };

    const [rows, total] = await Promise.all([
      prisma.rSVP.findMany({
        where,
        include: { guest: true },
        orderBy: { createdAt: sort === "asc" ? "asc" : "desc" },
        take: Number(limit),
        skip: Number(offset),
      }),
      prisma.rSVP.count({ where }),
    ]);

    res.json({ total, rows });
  } catch (err) {
    console.error("GET /rsvps failed:", err);
    res.status(500).json({ error: "Failed to fetch RSVPs" });
  }
});

// --- CSV EXPORT ---
app.get("/rsvps.csv", async (_req, res) => {
  try {
    const rows = await prisma.rSVP.findMany({
      include: { guest: true },
      orderBy: { createdAt: "desc" },
    });

    const esc = (s = "") => `"${String(s).replaceAll(`"`, `""`)}"`;
    const header =
      [
        "Name",
        "Attending",
        "Guests",
        "Message",
        "CreatedAt",
        "GuestEmail",
        "GuestFirst",
        "GuestLast",
        "GuestId",
      ].join(",") + "\n";

    const body = rows
      .map((r) =>
        [
          esc(r.name),
          r.attending ? "yes" : "no",
          r.guests ?? 0,
          esc(r.message || ""),
          r.createdAt.toISOString(),
          esc(r.guest?.email || ""),
          esc(r.guest?.firstName || ""),
          esc(r.guest?.lastName || ""),
          r.guestId ?? "",
        ].join(",")
      )
      .join("\n");

    res.setHeader("Content-Type", "text/csv; charset=utf-8");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="rsvps-${Date.now()}.csv"`
    );
    res.send(header + body);
  } catch (err) {
    console.error("GET /rsvps.csv failed:", err);
    res.status(500).send("Failed to export CSV");
  }
});

// --- START & SHUTDOWN ---
const server = app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});

process.on("SIGTERM", async () => {
  console.log("SIGTERM received: closing HTTP server and Prisma");
  server.close(async () => {
    await prisma.$disconnect();
    process.exit(0);
  });
});
process.on("SIGINT", async () => {
  console.log("SIGINT received: closing HTTP server and Prisma");
  server.close(async () => {
    await prisma.$disconnect();
    process.exit(0);
  });
});
