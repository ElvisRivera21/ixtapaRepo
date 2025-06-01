import React from 'react';
import './Footer.css';
function Footer() {
    return (
        <footer style={{ textAlign: 'center', padding: '1.5rem', backgroundColor: '#', marginTop: '2rem' }}>
            <p style={{ margin: 0 }}>&copy; {new Date().getFullYear()} Justin & Kiara</p>
            <p style={{
                fontFamily: "'Pacifico', cursive",
                fontSize: '1rem',
                color: 'white',
                marginTop: '0.5rem'
            }}>
                Designed by Elvis Rivera
            </p>
            <p style={{ fontSize: '0.875rem', marginTop: '0.25rem' }}>
                <a href="mailto:therealelvisrivera@gmail.com" style={{ textDecoration: 'underline', color: '#0077cc' }}>
                    Need a website? Reach out →
                </a>
            </p>
        </footer>
    );
}

export default Footer;
