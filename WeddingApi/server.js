// server.js (ESM)
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(morgan('tiny'));
app.use(express.json());

// CORS allow-list
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://ixtapa-repo.vercel.app',   // no trailing slash
    'https://justinandkiara.com',
    'https://www.justinandkiara.com'
  ],
  credentials: true,
}));

// Health
app.get('/health', (req, res) => res.json({ status: 'ok' }));

// RSVP
app.post('/rsvp', (req, res) => {
  const { name, attending, guests, message } = req.body;
  if (!name || attending == null) return res.status(400).json({ error: 'Missing required fields' });

  console.log('--- New RSVP ---');
  console.log({ name, attending, guests, message: message || null });
  console.log('----------------');

  res.status(200).json({ message: 'RSVP received!' });
});

// 404
app.use((req, res) => res.status(404).json({ error: 'Not found' }));

// Listen on all interfaces (important for WSL)
app.listen(PORT, '0.0.0.0', () => {
  console.log(`API running on port ${PORT}`);
});
