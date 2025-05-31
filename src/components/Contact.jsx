import React from 'react';

function Contact() {
    const emailAddress = 'kiarariver11@yahoo.com';
    const subject = encodeURIComponent('Wedding RSVP Confirmation');
    const body = encodeURIComponent(
        `Hello,\n\nI received the invitation and wanted to let you know:\n\n[ ] Yes, I will be attending.\n[ ] No, I won’t be able to attend.\n\nLooking forward to celebrating with you!\n\nBest,\n[Your Name]`
    );

    const mailtoLink = `mailto:${emailAddress}?subject=${subject}&body=${body}`;

    return (
        <section id="contact" style={{ padding: '2rem', textAlign: 'center' }}>
            <h2>Contact Us</h2>
            <p style={{ marginBottom: '1rem' }}>
                We'd love to hear from you! You can email us directly or RSVP using the button below.
            </p>
            <a
                href={mailtoLink}
                style={{
                    display: 'inline-block',
                    padding: '0.75rem 1.5rem',
                    backgroundColor: '#d4a373',
                    color: '#fff',
                    textDecoration: 'none',
                    borderRadius: '6px',
                    fontWeight: 'bold',
                    transition: 'background-color 0.3s ease'
                }}
                onMouseOver={e => e.target.style.backgroundColor = '#c58e5b'}
                onMouseOut={e => e.target.style.backgroundColor = '#d4a373'}
            >
                RSVP via Email
            </a>
        </section>
    );
}

export default Contact;

