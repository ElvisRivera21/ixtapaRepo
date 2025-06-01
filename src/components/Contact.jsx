import React from 'react';

function Contact() {
    const emailAddress = 'kiarariver11@yahoo.com';
    const subject = encodeURIComponent('Wedding RSVP Confirmation');
    const body = encodeURIComponent(
        `Hello,\n\nI received the invitation and wanted to let you know:\n\n[ ] Yes, I will be attending.\n[ ] No, I won’t be able to attend.\n\nLooking forward to celebrating with you!\n\nBest,\n[Your Name]`
    );

    const mailtoLink = `mailto:${emailAddress}?subject=${subject}&body=${body}`;

    return (
        <section id="contact" style={{ padding: '2rem', textAlign: 'center', backgroundColor: '#fefcfb' }}>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2rem', marginBottom: '1rem' }}>
                Contact Us
            </h2>
            <p style={{ marginBottom: '1.5rem', fontSize: '1.1rem' }}>
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
                    transition: 'background-color 0.3s ease',
                    marginBottom: '2rem'
                }}
                onMouseOver={e => e.target.style.backgroundColor = '#c58e5b'}
                onMouseOut={e => e.target.style.backgroundColor = '#d4a373'}
            >
                RSVP via Email
            </a>

            <div style={{ marginTop: '3rem' }}>
                <p style={{ fontStyle: 'italic', fontSize: '1rem', color: '#5a5a5a', marginBottom: '1rem' }}>
                    Your presence is the greatest gift. <br />
                    If you'd like to support our honeymoon adventure, you can visit our Venmo directly:
                </p>
                <a
                    href="https://venmo.com/Kiaaararivera"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                        display: 'inline-block',
                        padding: '0.6rem 1.2rem',
                        border: '2px solid #d4a373',
                        borderRadius: '8px',
                        textDecoration: 'none',
                        color: '#d4a373',
                        fontWeight: 'bold',
                        transition: 'background-color 0.3s ease, color 0.3s ease'
                    }}
                    onMouseOver={e => {
                        e.target.style.backgroundColor = '#d4a373';
                        e.target.style.color = '#fff';
                    }}
                    onMouseOut={e => {
                        e.target.style.backgroundColor = 'transparent';
                        e.target.style.color = '#d4a373';
                    }}
                >
                    @Kiaaararivera on Venmo
                </a>
            </div>
        </section>
    );
}

export default Contact;
