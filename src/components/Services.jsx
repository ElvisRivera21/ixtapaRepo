import React from 'react';

function Services() {
    const services = [
        {
            title: 'Oceanfront Villas',
            description: 'Enjoy breathtaking ocean views from our luxury villas just steps from the beach.',
        },
        {
            title: 'Private Pools',
            description: 'Relax in your own private pool, perfect for unwinding in paradise.',
        },
        {
            title: 'Airport Transfers',
            description: 'We offer convenient airport pickup and drop-off for a stress-free experience.',
        },
        {
            title: 'Concierge Service',
            description: 'From reservations to recommendations, our team is here to make your stay perfect.',
        },
    ];

    return (
        <section id="services" style={{ padding: '2rem' }}>
            <h2 style={{ textAlign: 'center' }}>Our Story</h2>
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '1.5rem',
                marginTop: '1.5rem'
            }}>
                {services.map((service, index) => (
                    <div key={index} style={{
                        padding: '1rem',
                        border: '1px solid #ddd',
                        borderRadius: '8px',
                        backgroundColor: '#fff',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                    }}>
                        <h3>{service.title}</h3>
                        <p>{service.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default Services;
