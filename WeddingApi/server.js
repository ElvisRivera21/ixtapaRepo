// WeddingApi/server.js
import express from 'express';
// (We won't rely on cors/helmet until this is working 100%)
const app = express();
const PORT = process.env.PORT || 3000;

/* ---------- CORS: unconditional, handles ALL routes & preflights ---------- */
app.use((req, res, next) => {
  const origin = req.headers.origin || '*';
  res.setHeader('Access-Control-Allow-Origin', origin);
  res.setHeader('Vary', 'Origin'); // required when echoing origin
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  if (req.method === 'OPTIONS') return res.sendStatus(204);
  next();
});

/* ---------- Basics ---------- */
app.use(express.json());

/* ---------- Health ---------- */
app.get('/health', (_req, res) => res.json({ status: 'ok' }));

/* ---------- RSVP ---------- */
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
  return res.status(200).json({ message: 'RSVP received!' });
});

/* ---------- 404 ---------- */
app.use((_req, res) => res.status(404).json({ error: 'Not found' }));

/* ---------- Listen (Render uses PORT) ---------- */
app.listen(PORT, () => {
  console.log(`API running on port ${PORT}`);
});
