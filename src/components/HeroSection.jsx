import React from 'react';
import './hero.css';

const HeroSection = () => {
    const mailtoLink = `mailto:therealelvisrivera@gmail.com?subject=Wedding RSVP&body=Hi Justin and Kiara,%0D%0A%0D%0AWe're excited to RSVP for your wedding! Here are our details:%0D%0A%0D%0AName(s):%0D%0ANumber of guests:%0D%0ADietary restrictions (if any):%0D%0A%0D%0AWith love,%0D%0A[Your Name]`;

    return (
        <section className="hero">
            <video autoPlay loop muted playsInline className="hero-video">
                <source src="videos/heroSectionGoodVersion.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <div className="hero-overlay"></div>
            <div className="hero-content">
                <h1 className="hero-title">Meet Us In Mexico</h1>
                <p className="hero-names">Justin <span className="amp">&amp;</span> Kiara</p>
                <p className="hero-date">AUGUST 18, 2026 • ZIHUATANEJO, MX</p>
                <a href={mailtoLink} className="hero-btn">Let Us Know</a>
            </div>
        </section>
    );
};

export default HeroSection;

