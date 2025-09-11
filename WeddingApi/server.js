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

// CORS allow-list (covers dev + prod domains)
const allowed = new Set([
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'http://localhost:5174',
  'http://127.0.0.1:5174',
  'https://ixtapa-repo.vercel.app',
  'https://justinandkiara.com',
  'https://www.justinandkiara.com',
]);

app.use(cors({
  origin(origin, cb) {
    // allow curl/Postman/no-Origin requests
    if (!origin) return cb(null, true);
    if (allowed.has(origin)) return cb(null, true);
    return cb(new Error(`Not allowed by CORS: ${origin}`));
  },
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

// respond to preflight requests
app.options('*', cors());

// Health
app.get('/health', (req, res) => res.json({ status: 'ok' }));

// RSVP
app.post('/rsvp', (req, res) => {
  const { name, attending, guests, message } = req.body;
  if (!name || attending == null) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  console.log('--- New RSVP ---');
  console.log({
    name,
    attending,
    guests,
    message: message || null
  });
  console.log('----------------');

  res.status(200).json({ message: 'RSVP received!' });
});

// 404 fallback
app.use((req, res) => res.status(404).json({ error: 'Not found' }));

// Listen on all interfaces (important for WSL/Render)
app.listen(PORT, '0.0.0.0', () => {
  console.log(`API running on port ${PORT}`);
});
