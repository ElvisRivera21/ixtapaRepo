import React, { useState } from "react";
import "./Contact.css";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    attending: "",
    guests: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  // Uses the backend URL from your .env file
  const API_BASE = import.meta.env.VITE_RSVP_API || "http://localhost:3001";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      const res = await fetch(`${API_BASE}/rsvp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus("✅ Thank you! Your RSVP has been sent successfully.");
        setFormData({
          name: "",
          email: "",
          attending: "",
          guests: "",
          message: "",
        });
      } else {
        const err = await res.json().catch(() => ({}));
        setStatus(err.error || "Something went wrong. Please try again.");
      }
    } catch (error) {
      setStatus("Network error — please try again.");
      console.error("RSVP submit error:", error);
    }
  };

  return (
    <section className="contact-section" id="rsvp">
      <h2>RSVP</h2>
      <p>Please let us know if you’ll be joining us in Mexico!</p>

      <form className="contact-form" onSubmit={handleSubmit}>
        <label>
          Name(s)
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Email
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Will you be attending?
          <select
            name="attending"
            value={formData.attending}
            onChange={handleChange}
            required
          >
            <option value="">Select an option</option>
            <option value="Yes">Yes, we’ll be there!</option>
            <option value="No">Sorry, can’t make it</option>
          </select>
        </label>

        <label>
          Number of Guests (including you)
          <input
            type="number"
            name="guests"
            min="1"
            max="10"
            value={formData.guests}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Message or Notes
          <textarea
            name="message"
            placeholder="Any food preferences, travel notes, or special requests?"
            value={formData.message}
            onChange={handleChange}
          />
        </label>

        <button type="submit">Send RSVP</button>
        <p className="status">{status}</p>
      </form>
    </section>
  );
}