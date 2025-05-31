import React from 'react';
import './Services.css';

function Services() {
    const galleryItems = [
        { image: 'src/assets/Photos/JK4.JPG' },
        { image: 'src/assets/Photos/JK3.JPG' },
        { image: 'src/assets/Photos/JK2.JPG' },
        { image: 'src/assets/Photos/JK1.JPG' },
        { image: 'src/assets/Photos/JK5.JPG' },
        { image: 'src/assets/Photos/JK6.JPG' },
        { image: 'src/assets/Photos/JK7.JPG' },
        { image: 'src/assets/Photos/JK8.JPG' },
        { image: '' }, // optional placeholder or remove
    ];

    return (
        <section id="gallery" className="gallery-section">
            <h2 className="gallery-title">Wedding Gallery</h2>
            <p className="gallery-subtext">
                A glimpse into the unforgettable moments we’ve captured.
            </p>
            <div className="gallery-grid">
                {galleryItems
                    .filter(item => item.image) // Skip empty images
                    .map((item, index) => (
                        <div key={index} className="gallery-card">
                            <img src={item.image} alt={`Gallery image ${index + 1}`} />
                        </div>
                    ))}
            </div>
        </section>
    );
}

export default Services;
