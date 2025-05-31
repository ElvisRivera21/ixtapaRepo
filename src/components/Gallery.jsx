import React from 'react';

function Gallery() {
    const images = [
        '/images/beach1.jpg',
        '/images/villa1.jpg',
        '/images/pool1.jpg',
        '/images/sunset1.jpg',
    ];

    return (
        <section id="gallery" style={{ padding: '2rem' }}>
            <h2 style={{ textAlign: 'center' }}>Gallery</h2>
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '1rem',
                marginTop: '1rem'
            }}>
                {images.map((src, index) => (
                    <img
                        key={index}
                        src={src}
                        alt={`Gallery image ${index + 1}`}
                        style={{ width: '100%', borderRadius: '8px' }}
                    />
                ))}
            </div>
        </section>
    );
}

export default Gallery;
