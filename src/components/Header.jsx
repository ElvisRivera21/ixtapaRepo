// src/components/Header.jsx

import React from 'react';
import './Header.css'; // We'll style this next

const Header = () => {
    return (
        <header className="header">
            <div className="logo">Ixtapa Rentals</div>
            <nav className="nav">
                <a href="#">Home</a>
                <a href="#">Listings</a>
                <a href="#">About</a>
                <a href="#">Contact</a>
            </nav>
        </header>
    );
};

export default Header;
