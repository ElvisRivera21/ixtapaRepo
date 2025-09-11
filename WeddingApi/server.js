import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const app = express();
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173" })); // adjust for your frontend

// List RSVPs with linked Guest
app.get("/rsvps", async (req, res) => {
  try {
    const rows = await prisma.rSVP.findMany({
      include: { guest: true },     // now pulls guest info too
      orderBy: { createdAt: "desc" }
    });
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch RSVPs" });
  }
});

app.listen(3000, () => {
  console.log("API running on http://localhost:3000");
});
