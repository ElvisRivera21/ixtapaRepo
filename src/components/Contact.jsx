// src/components/Contact.jsx
import React, { useState } from 'react';
import './Contact.css';

export default function Contact() {
  const [name, setName] = useState('');
  const [attending, setAttending] = useState('yes');
  const [guests, setGuests] = useState(0);
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (busy) return;

    setBusy(true);
    try {
      const API_BASE = import.meta.env.PROD
        ? 'https://ixtaparepo.onrender.com' // Render backend
        : 'http://localhost:3000';

      const res = await fetch(`${API_BASE}/rsvp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          attending,
          guests: Number(guests) || 0,
          message,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || `HTTP ${res.status}`);
      }

      alert('RSVP submitted successfully!');
      setName('');
      setAttending('yes');
      setGuests(0);
      setMessage('');
    } catch (err) {
      console.error('RSVP submit failed:', err);
      alert('Error submitting RSVP. Please try again.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <section id="contact" className="contact-section">
      <h2 className="contact-title">RSVP & Wishes</h2>
      <form onSubmit={handleSubmit} className="contact-form">
        <label>
          Your Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>

        <label>
          Will you attend?
          <select
            value={attending}
            onChange={(e) => setAttending(e.target.value)}
          >
            <option value="yes">Yes, I will be attending</option>
            <option value="no">No, I won’t be able to attend</option>
          </select>
        </label>

        {attending === 'yes' && (
          <label>
            Number of Guests:
            <input
              type="number"
              min="0"
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
            />
          </label>
        )}

        <label>
          Message (optional):
          <textarea
            rows="4"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </label>

        <button type="submit" className="contact-button" disabled={busy}>
          {busy ? 'Sending…' : 'RSVP'}
        </button>
      </form>
    </section>
  );
}
