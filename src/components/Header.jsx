import React from 'react';
import './Header.css';

const Header = () => {
    return (
        <nav className="wedding-header">
            <a href="#about">About</a>
            <a href="#gallery">Gallery</a>
            <a href="#contact">RSVP</a>
            <a href="#hotels">Recommended Hotels</a>
            <a href="#things-to-do">Things To Do</a>
        </nav>
    );
};

export default Header;

