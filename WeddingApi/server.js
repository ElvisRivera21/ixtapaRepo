import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import { z } from 'zod';
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient();

app.use(express.json());
app.use(helmet());
app.use(morgan('tiny'));
app.use(cors({
  origin: [
    'http://localhost:5173',       // local React dev
    'https://your-site.vercel.app' // replace with your real frontend domain
  ]
}));
app.use(rateLimit({ windowMs: 60_000, max: 60 }));

// Simple health check
app.get('/health', (_req, res) => res.json({ ok: true }));

// Validation schema
const RsvpSchema = z.object({
  email: z.string().email(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  attending: z.boolean(),
  partySize: z.number().int().min(1).max(12).optional().default(1),
  message: z.string().optional().default("")
});

// Public RSVP endpoint
app.post('/rsvp', async (req, res) => {
  try {
    const data = RsvpSchema.parse(req.body);

    // Upsert guest
    const guest = await prisma.guest.upsert({
      where: { email: data.email },
      create: { email: data.email, firstName: data.firstName, lastName: data.lastName },
      update: { firstName: data.firstName, lastName: data.lastName }
    });

    // Upsert RSVP
    const rsvp = await prisma.rSVP.upsert({
      where: { guestId: guest.id },
      create: { guestId: guest.id, attending: data.attending, partySize: data.partySize, message: data.message },
      update: { attending: data.attending, partySize: data.partySize, message: data.message }
    });

    res.json({ ok: true, rsvp });
  } catch (err) {
    if (err?.issues) return res.status(400).json({ error: 'Validation failed', details: err.issues });
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Admin-only middleware
function requireAdmin(req, res, next) {
  if (req.headers.authorization === `Bearer ${process.env.ADMIN_TOKEN}`) return next();
  return res.sendStatus(401);
}

// Admin: list RSVPs
app.get('/admin/rsvps', requireAdmin, async (_req, res) => {
  const rsvps = await prisma.rSVP.findMany({
    include: { guest: true },
    orderBy: { createdAt: 'desc' }
  });
  res.json(rsvps);
});

// Admin: stats
app.get('/admin/stats', requireAdmin, async (_req, res) => {
  const attending = await prisma.rSVP.count({ where: { attending: true } });
  const notAttending = await prisma.rSVP.count({ where: { attending: false } });
  const total = await prisma.rSVP.aggregate({ _sum: { partySize: true }, where: { attending: true } });
  res.json({ attending, notAttending, headcount: total._sum.partySize ?? 0 });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API running on :${PORT}`));
