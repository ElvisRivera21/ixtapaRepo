import React from 'react';

function Gallery() {
    const galleryItems = [
        {
            
            image: 'src/assets/Photos/JK4.JPG',
        },
        {
            
            image: 'src/assets/Photos/JK3.JPG',
        },
        {
            
            image: 'src/assets/Photos/JK2.JPG',
        },
        {
            
            image: 'src/assets/Photos/JK1.JPG',
        },
        {
            
            image: 'src/assets/Photos/JK5.JPG',
        },
        {
            
            image: 'src/assets/Photos/JK6.JPG',
        },
        {
           
            image: 'src/assets/Photos/JK7.JPG',
        },
        {
            
            image: 'src/assets/Photos/JK8.JPG',
        },
        {
            
            image: 'src/assets/Photos/JK9.JPG',
        },
       
    ];

    return (
        <section id="gallery" style={{ padding: '2rem', backgroundColor: '#f9f9f9' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '1rem' }}>Wedding Gallery</h2>
            <p style={{ textAlign: 'center', marginBottom: '2rem', color: '#666' }}>
                A glimpse into the unforgettable moments we’ve captured.
            </p>
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '1.5rem',
            }}>
                {galleryItems.map((item, index) => (
                    <div key={index} style={{
                        borderRadius: '8px',
                        overflow: 'hidden',
                        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                        backgroundColor: '#fff',
                        transition: 'transform 0.3s ease',
                    }}>
                        <img
                            src={item.image}
                            alt={item.title}
                            style={{
                                width: '100%',
                                height: 'auto',
                                display: 'block',
                            }}
                        />
                        <div style={{ padding: '0.75rem', textAlign: 'center' }}>
                            <h3 style={{ margin: 0, fontSize: '1rem', color: '#333' }}>{item.title}</h3>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default Gallery;
