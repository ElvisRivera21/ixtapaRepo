// server.js
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(morgan('tiny'));
app.use(express.json());

// Allow frontend domains (local + deployed)
app.use(cors({
  origin: [
    'http://localhost:5173',           // React dev
    'https://ixtapa-repo.vercel.app/',    // replace with your Vercel deploy
    'https://justinandkiara.com',      // replace with your custom domain
  ],
  credentials: true,
}));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// RSVP route
app.post('/rsvp', (req, res) => {
  const { name, attending, guests, message } = req.body;

  if (!name || !attending) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // You could save this to a DB, Google Sheet, or file
  console.log('--- New RSVP ---');
  console.log(`Name: ${name}`);
  console.log(`Attending: ${attending}`);
  console.log(`Guests: ${guests}`);
  console.log(`Message: ${message || 'None'}`);
  console.log('----------------');

  return res.status(200).json({ message: 'RSVP received!' });
});

// Catch-all for unknown routes
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// Start server
app.listen(PORT, () => {
  console.log(`API running on port ${PORT}`);
});
