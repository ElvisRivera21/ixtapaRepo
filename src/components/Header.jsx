// src/components/Header.jsx

import React from 'react';
import './Header.css'; // We'll style this next

const Header = () => {
    return (
      
      <nav>
            <a href="#about">About</a>
            <a href="#services">Services</a>
            <a href="#gallery">Gallery</a>
            <a href="#contact">Contact</a>
        </nav>
    );
};

export default Header;
