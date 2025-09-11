// server.js
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

// TEMP: open CORS wide to confirm
app.use(cors({ origin: true, credentials: true }));
app.options('*', cors());

// routes
app.get('/health', (req, res) => res.json({ status: 'ok' }));

app.post('/rsvp', (req, res) => {
  const { name, attending, guests, message } = req.body || {};
  if (!name || attending == null) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  console.log('--- New RSVP ---', { name, attending, guests, message: message || null });
  res.status(200).json({ message: 'RSVP received!' });
});

app.use((req, res) => res.status(404).json({ error: 'Not found' }));

// IMPORTANT: listen on Render’s port
app.listen(PORT, () => {
  console.log(`API running on port ${PORT}`);
});
