import React from 'react';
import './ThingsToDo.css';

function ThingsToDo() {
    const recommendations = [
        {
            name: 'Playa La Ropa',
            description: 'A beautiful beach perfect for sunbathing, swimming, and water sports.',
            link: 'https://goo.gl/maps/PLJ3ywY1yaP2',
        },
        {
            name: 'Raul’s Sunset Bar',
            description: 'Beachside drinks and dinner with one of the best sunset views in town.',
            link: 'https://goo.gl/maps/5Nj2FYvw2yvTCCoA8',
        },
        {
            name: 'Mercado Municipal',
            description: 'Local market full of handmade crafts, fresh produce, and authentic food.',
            link: 'https://goo.gl/maps/mt9ZKxT3yFJGDF7G6',
        },
        {
            name: 'Espuma Restaurant',
            description: 'A romantic fine dining experience on a cliffside terrace.',
            link: 'https://espumarestaurant.com/',
        }
    ];

    return (
        <section id="things-to-do" className="things-section">
            <h2 className="things-title">Activities & Dining</h2>
            <p className="things-subtext">Explore the beauty of Zihuatanejo with these favorite spots.</p>
            <div className="things-list">
                {recommendations.map((item, index) => (
                    <div key={index} className="thing-card">
                        <h3>{item.name}</h3>
                        <p>{item.description}</p>
                        <a href={item.link} target="_blank" rel="noopener noreferrer">Learn More</a>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default ThingsToDo;
