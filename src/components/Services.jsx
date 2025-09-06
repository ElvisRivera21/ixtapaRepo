import React from 'react';
import './Services.css';

function Services() {
    const galleryItems = [
        { image: '/Photos/JK1.JPG' },
        { image: '/Photos/JK2.JPG' },
        { image: '/Photos/JK3.JPG' },
        { image: '/Photos/JK4.JPG' },
        { image: '/Photos/JK5.JPG' },
        { image: '/Photos/JK6.JPG' },
        { image: '/Photos/JK7.JPG' },
        { image: '/Photos/JK8.JPG' },
    ];

    return (
        <section id="gallery" className="gallery-section">
            <div className="gallery-divider"></div>
            <h2 className="gallery-title">Wedding Gallery</h2>
            <p className="gallery-subtext">
                A glimpse into the unforgettable moments we’ve captured.
            </p>
            <div className="gallery-grid">
                {galleryItems.map((item, index) => (
                    <div key={index} className="gallery-card">
                        <img src={item.image} alt={`Gallery image ${index + 1}`} />
                    </div>
                ))}
            </div>
        </section>
    );
}

export default Services;
