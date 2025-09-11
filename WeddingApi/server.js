// server.js (ESM)
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

const app = express();
const PORT = process.env.PORT || 3000;

// middleware
app.use(helmet());
app.use(morgan('tiny'));
app.use(express.json());

// --- TEMP: allow every origin so preflight can't fail ---
app.use(cors({
  origin: true,                 // reflect the request Origin
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,            // ok even without cookies; browser will accept
}));
app.options('*', cors());

// health
app.get('/health', (req, res) => res.json({ status: 'ok' }));

// rsvp
app.post('/rsvp', (req, res) => {
  const { name, attending, guests, message } = req.body || {};
  if (!name || attending == null) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  console.log('--- New RSVP ---', { name, attending, guests, message: message || null });
  res.status(200).json({ message: 'RSVP received!' });
});

// 404
app.use((req, res) => res.status(404).json({ error: 'Not found' }));

app.listen(PORT, '0.0.0.0', () => {
  console.log(`API running on port ${PORT}`);
});
