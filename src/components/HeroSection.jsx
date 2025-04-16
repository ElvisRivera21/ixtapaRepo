// src/components/HeroSection.jsx
import React from 'react';
import './hero.css';

const HeroSection = () => {
    return (
        <section className="hero">
            <video autoPlay loop muted playsInline className="hero-video">
                <source src="videos/heroSectionGoodVersion.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <div className="hero-overlay"></div>
            <div className="hero-content">
                <h1>Welcome to Ixtapa Paradise</h1>
                <p>Relax. Recharge. Reconnect by the Pacific.</p>
                <a href="#booking" className="hero-btn">Book Your Stay</a>
            </div>
        </section>
    );
};

export default HeroSection;
