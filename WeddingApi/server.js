// WeddingApi/server.js
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

const app = express();
const PORT = process.env.PORT || 3000;

/* ---------- middleware ---------- */
app.use(helmet());
app.use(morgan('tiny'));
app.use(express.json());

// Global CORS (permissive while debugging)
app.use(
  cors({
    origin: true,              // reflect request Origin
    credentials: true,
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

/* ---------- explicit preflight for /rsvp ---------- */
app.options('/rsvp', (req, res) => {
  const origin = req.headers.origin || '*';
  res.set({
    'Access-Control-Allow-Origin': origin,
    'Vary': 'Origin', // required when reflecting Origin
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Credentials': 'true',
  });
  return res.sendStatus(204);
});

/* ---------- routes ---------- */
app.get('/health', (_req, res) => res.json({ status: 'ok' }));

app.post('/rsvp', (req, res) => {
  const { name, attending, guests, message } = req.body || {};
  if (!name || attending == null) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  console.log('--- New RSVP ---', {
    name,
    attending,
    guests,
    message: message || null,
  });

  // normal response (CORS headers are already added by cors())
  return res.status(200).json({ message: 'RSVP received!' });
});

/* ---------- 404 ---------- */
app.use((_req, res) => res.status(404).json({ error: 'Not found' }));

/* ---------- listen ---------- */
app.listen(PORT, () => {
  console.log(`API running on port ${PORT}`);
});
