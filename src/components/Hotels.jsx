import React from 'react';
import './Hotels.css';

function Hotels() {
    const hotels = [
        {
            name: 'Thompson Zihuatanejo',
            description: 'A luxurious beachfront resort perfect for romantic getaways.',
            link: 'https://www.hyatt.com/en-US/hotel/mexico/thompson-zihuatanejo/zihth',
        },
        {
            name: 'Hotel Aura del Mar',
            description: 'Charming boutique hotel with ocean views and great amenities.',
            link: 'https://www.hotelauradelmar.com/',
        },
        {
            name: 'Embarc Zihuatanejo',
            description: 'A stylish and comfortable resort tucked into the hillside.',
            link: 'https://www.diamondresorts.com/destinations/property/Embarc-Zihuatanejo',
        }
    ];

    return (
        <section id="hotels" className="hotels-section">
            <h2 className="hotels-title">Recommended Hotels</h2>
            <p className="hotels-subtext">Here are a few places we recommend for your stay in Zihuatanejo.</p>
            <div className="hotels-list">
                {hotels.map((hotel, index) => (
                    <div key={index} className="hotel-card">
                        <h3>{hotel.name}</h3>
                        <p>{hotel.description}</p>
                        <a href={hotel.link} target="_blank" rel="noopener noreferrer">View Hotel</a>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default Hotels;
