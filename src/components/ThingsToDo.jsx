import React from 'react';
import './ThingsToDo.css';

function ThingsToDo() {
    const recommendations = [
    
        {
            name: 'Complete Guide',
            description: 'A romantic fine dining experience on a cliffside terrace.',
            link: 'https://www.ixtapa.net/',
        },
    
        {
            name: 'Playa La Ropa',
            description: 'A beautiful beach perfect for sunbathing, swimming, and water sports.',
            link: 'https://www.google.com/search?q=about+playa+la+ropa&sca_esv=a4e73751e2307eeb&sxsrf=AE3TifNnD2rgEUKUsbQDPeCJycmWovhG_w%3A1757190255517&ei=b5i8aL6vH4S10PEP8PGlwA0&ved=0ahUKEwj-ou7n-8SPAxWEGjQIHfB4CdgQ4dUDCBE&uact=5&oq=about+playa+la+ropa&gs_lp=Egxnd3Mtd2l6LXNlcnAiE2Fib3V0IHBsYXlhIGxhIHJvcGEyBhAAGAgYHjILEAAYgAQYhgMYigUyCxAAGIAEGIYDGIoFMgsQABiABBiGAxiKBTILEAAYgAQYhgMYigUyCBAAGIAEGKIEMgUQABjvBTIIEAAYgAQYogQyCBAAGIAEGKIESIESUIEFWIkQcAB4ApABAJgBhwGgAZYFqgEDMi40uAEDyAEA-AEBmAIHoAK5BcICBBAAGEfCAgcQABiABBgNwgIGEAAYBxgewgIIEAAYBxgKGB7CAggQABgHGAgYHsICCBAAGKIEGIkFmAMA4gMFEgExIECIBgGQBgiSBwMyLjWgB_QssgcDMS41uAeyBcIHAzItN8gHHg&sclient=gws-wiz-serp#fpstate=ive&vld=cid:0a41f5ef,vid:nwQH-eQ5vPQ,st:0',
        },
        {
            name: 'Fish Mercado',
            description: 'Fresh fish market with the catch of the day.',
            link: 'https://www.youtube.com/watch?v=ta9o1p8dfEw',
        },
        {
            name: 'Deep Sea Fishing',
            description: 'Mention in RSVP if you are interested',
            link: 'https://www.youtube.com/watch?v=XNzWsAIdmSY',
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
