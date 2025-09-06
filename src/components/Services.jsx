import React from 'react';
import './Services.css';

function Services() {
    const base = import.meta.env.BASE_URL; // '' locally, '/ixdtapRepo/' on GH Pages
    const galleryItems = [
        { image: `${base}photos/photo1.JPG` },
        { image: `${base}photos/photo2.JPG` },
        { image: `${base}photos/photo3.JPG` },
        { image: `${base}photos/photo4.JPG` },
        { image: `${base}photos/photo5.JPG` },
        { image: `${base}photos/photo6.JPG` },
        { image: `${base}photos/photo7.JPG` },
        { image: `${base}photos/photo8.JPG` },
        { image: `${base}photos/photo9.JPG` },
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
