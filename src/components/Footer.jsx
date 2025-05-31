import React from 'react';

function Footer() {
    return (
        <footer style={{ textAlign: 'center', padding: '1rem', backgroundColor: '#f3f3f3', marginTop: '2rem' }}>
            <p>&copy; {new Date().getFullYear()} Ixtapa Vacations. All rights reserved.</p>
        </footer>
    );
}

export default Footer;
