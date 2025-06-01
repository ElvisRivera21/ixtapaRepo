import React from 'react';
import './Contact.css';

function Contact() {
    const emailAddress = 'kiarariver11@yahoo.com';
    const subject = encodeURIComponent('Wedding RSVP Confirmation');
    const body = encodeURIComponent(
        `Hello,\n\nI received the invitation and wanted to let you know:\n\n[ ] Yes, I will be attending.\n[ ] No, I won’t be able to attend.\n\nLooking forward to celebrating with you!\n\nBest,\n[Your Name]`
    );

    const mailtoLink = `mailto:${emailAddress}?subject=${subject}&body=${body}`;

    return (
        <section id="contact" className="contact-section">
            <h2 className="contact-title">Contact Us</h2>
            <p className="contact-text">
                We'd love to hear from you! You can email us directly or RSVP using the button below.
            </p>
            <a
                href={mailtoLink}
                className="contact-button"
            >
                RSVP via Email
            </a>

            <div>
                <p className="honeymoon-message">
                    Your presence is the greatest gift. <br />
                    If you'd like to support our honeymoon adventure, you can visit our Venmo directly:
                </p>
                <a
                    href="https://venmo.com/Kiaaararivera"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="venmo-link"
                >
                    @Kiaaararivera on Venmo
                </a>
            </div>
        </section>
    );
}

export default Contact;
