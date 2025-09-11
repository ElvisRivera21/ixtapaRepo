// src/components/Contact.jsx
import React, { useState } from 'react';
import './Contact.css';

export default function Contact() {
  const [name, setName] = useState('');
  const [attending, setAttending] = useState('yes');
  const [guests, setGuests] = useState(0);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const API_BASE = import.meta.env.PROD
      ? 'https://YOUR-API-DOMAIN.com'  // later, when deployed
      : 'http://localhost:3000';

    const res = await fetch(`${API_BASE}/rsvp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, attending, guests, message }),
    });

    if (res.ok) {
      alert('RSVP submitted successfully!');
      setName(''); setAttending('yes'); setGuests(0); setMessage('');
    } else {
      alert('Error submitting RSVP. Please try again.');
    }
  };

  return (
    <section id="contact" className="contact-section">
      <h2 className="contact-title">RSVP & Wishes</h2>
      <form onSubmit={handleSubmit} className="contact-form">
        <label>
          Your Name:
          <input type="text" value={name} onChange={(e)=>setName(e.target.value)} required />
        </label>

        <label>
          Will you attend?
          <select value={attending} onChange={(e)=>setAttending(e.target.value)}>
            <option value="yes">Yes, I will be attending</option>
            <option value="no">No, I won’t be able to attend</option>
          </select>
        </label>

        {attending === 'yes' && (
          <label>
            Number of Guests:
            <input type="number" min="0" value={guests} onChange={(e)=>setGuests(e.target.value)} />
          </label>
        )}

        <label>
          Message (optional):
          <textarea rows="4" value={message} onChange={(e)=>setMessage(e.target.value)} />
        </label>

        <button type="submit" className="contact-button">RSVP</button>
      </form>
    </section>
  );
}
