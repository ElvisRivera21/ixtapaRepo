// server.js (ESM)
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

const app = express();
const PORT = process.env.PORT || 3000;

// ---- Basic middleware
app.use(helmet());
app.use(morgan('tiny'));
app.use(express.json());

// ---- CORS allow-list (dev + prod)
const ALLOWED = new Set([
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'http://localhost:5174',
  'http://127.0.0.1:5174',
  'https://ixtapa-repo.vercel.app',
  'https://justinandkiara.com',
  'https://www.justinandkiara.com',
]);

// Small helper to see what's happening during CORS
function corsOrigin(origin, cb) {
  if (!origin) return cb(null, true);               // curl/Postman/same-host
  const ok = ALLOWED.has(origin);
  if (!ok) console.warn('[CORS] Blocked Origin:', origin);
  return ok ? cb(null, true) : cb(new Error('Not allowed by CORS'));
}

app.use(
  cors({
    origin: corsOrigin,
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
);

// Make sure ALL preflights get a response
app.options('*', cors());

// ---- Health
app.get('/health', (req, res) => res.json({ status: 'ok' }));

// ---- RSVP
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

  res.status(200).json({ message: 'RSVP received!' });
});

// ---- 404
app.use((req, res) => res.status(404).json({ error: 'Not found' }));

// ---- Listen on all interfaces (works on Render/WSL)
app.listen(PORT, '0.0.0.0', () => {
  console.log(`API running on port ${PORT}`);
  console.log('[CORS] Allowed origins:', [...ALLOWED].join(', '));
});
