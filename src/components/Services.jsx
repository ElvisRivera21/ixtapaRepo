import React, { useEffect, useRef, useState } from 'react';
import './Services.css';

export default function Services() {
  const base = import.meta.env.BASE_URL;

  const slides = [
    { src: `${base}photos/photo1.jpg`, alt: 'JK 1' },
    { src: `${base}photos/photo2.jpg`, alt: 'JK 2' },
    { src: `${base}photos/photo3.jpg`, alt: 'JK 3' },
    { src: `${base}photos/photo4.jpg`, alt: 'JK 4' },
    { src: `${base}photos/photo5.jpg`, alt: 'JK 5' },
    { src: `${base}photos/photo6.jpg`, alt: 'JK 6' },
    { src: `${base}photos/photo7.jpg`, alt: 'JK 7' },
    { src: `${base}photos/photo8.jpg`, alt: 'JK 8' },
    { src: `${base}photos/photo9.jpg`, alt: 'JK 9' },
    { src: `${base}photos/photo10.jpg`, alt: 'JK 10' },
  ];

  const [i, setI] = useState(0);
  const [playing, setPlaying] = useState(true);
  const timer = useRef(null);

  const go = (n) => setI((p) => (p + n + slides.length) % slides.length);
  const goTo = (n) => setI(n);

  // autoplay
  useEffect(() => {
    if (!playing) return;
    timer.current = setInterval(() => go(1), 4000);
    return () => clearInterval(timer.current);
  }, [playing]);

  // keyboard navigation
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight') go(1);
      if (e.key === 'ArrowLeft') go(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // touch swipe
  const touch = useRef({ x: 0 });
  const onTouchStart = (e) => (touch.current = { x: e.touches[0].clientX });
  const onTouchEnd = (e) => {
    const dx = e.changedTouches[0].clientX - touch.current.x;
    if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
  };

  /* 🕒 COUNTDOWN TIMER LOGIC */
  const targetDate = new Date('2026-04-04T00:00:00'); // <-- set your date here
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const diff = targetDate - now;

      if (diff <= 0) {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, mins: 0, secs: 0 });
      } else {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          mins: Math.floor((diff / (1000 * 60)) % 60),
          secs: Math.floor((diff / 1000) % 60),
        });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="gallery" className="gallery-section">
      <h2 className="gallery-title">Wedding Gallery</h2>

      <div className="monogram-wrap">
        <img
          src={`${base}JK_monogram_wedding.svg`}
          alt="J & K monogram"
          className="monogram-under"
        />
      </div>

      {/* 💍 Countdown Timer */}
      <div className="countdown-container">
        <p className="countdown-title">Countdown to the Big Day</p>
        <div className="countdown">
          <div>
            <span>{timeLeft.days}</span>
            <p>Days</p>
          </div>
          <div>
            <span>{timeLeft.hours}</span>
            <p>Hours</p>
          </div>
          <div>
            <span>{timeLeft.mins}</span>
            <p>Minutes</p>
          </div>
          <div>
            <span>{timeLeft.secs}</span>
            <p>Seconds</p>
          </div>
        </div>
      </div>

      <div className="gallery-subtext">
        <p>
          Hola amigos! Welcome to our wedding website! We’re so excited to celebrate our love in
          beautiful <strong>Zihuatanejo, Mexico</strong>. Here you'll find all the details you need
          to plan your trip and join us for a weekend full of sunshine, laughter, and unforgettable
          memories.
        </p>

        <ul>
          <li>✈️ Fly into Ixtapa – Zihuatanejo International Airport (ZIH)</li>
          <li>🚕 Taxis and shuttles are available</li>
          <li>🚫 Uber is limited</li>
          <li>☀️ Travel Tip: Bring pesos, pack light breathable clothes, and don’t forget sunscreen!</li>
        </ul>

        {/* RSVP Reminder */}
        <div className="rsvp-reminder">
          <h3>🗓️ RSVP by January 1st, 2026</h3>
          <p>
            Please let us know if you’ll be joining us in paradise by submitting your RSVP before the
            new year. We can’t wait to celebrate with you!
          </p>
        </div>

        {/* FAQ Section */}
        <div className="faq-section">
          <h3>💬 FAQ</h3>
          <ul>
            <li><strong>What’s the dress code?</strong> For our beach theme, think tropical and relaxed, linen like clothing.</li>
            <li><strong>Can I bring a plus one?</strong> You’re absolutely welcome to bring a guest!</li>
            <li><strong>How much should I budget?</strong> Around $50 USD per day is generous for meals and beverages throughout the day.</li>
            <li><strong>Is transportation easy?</strong> Taxis and shuttles are plentiful; we recommend confirming pickup with your hotel front desk.</li>
            <li><strong>Any must-haves?</strong> Sunglasses, sunscreen, a hat, and comfortable shoes for exploring the local markets!</li>
          </ul>
        </div>

        {/* Gift & Registry Section */}
        <div className="gift-section">
          <h3>🎁 Gifts & Honeymoon Fund</h3>
          <p>
            Your presence in Mexico is the greatest gift we could ask for! If you’d like to contribute
            to our honeymoon adventures, we’ve set up a fund to help us make unforgettable memories.
          </p>
          <a href="#registry" className="registry-btn">View Our Registry</a>
        </div>
      </div>

      {/* Slideshow */}
      <div
        className="slideshow"
        onMouseEnter={() => setPlaying(false)}
        onMouseLeave={() => setPlaying(true)}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <button className="nav prev" onClick={() => go(-1)} aria-label="Previous slide">
          ‹
        </button>

        <div className="track" style={{ transform: `translateX(-${i * 100}%)` }}>
          {slides.map((s, idx) => (
            <div className="slide" key={idx}>
              <img src={s.src} alt={s.alt} className="slide-img" loading="lazy" />
              <div className="vignette" />
            </div>
          ))}
        </div>

        <button className="nav next" onClick={() => go(1)} aria-label="Next slide">
          ›
        </button>

        <div className="dots">
          {slides.map((_, idx) => (
            <button
              key={idx}
              className={`dot ${i === idx ? 'active' : ''}`}
              onClick={() => goTo(idx)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
