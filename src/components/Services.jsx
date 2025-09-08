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
    { src: `${base}photos/photo11.jpg`, alt: 'JK 11' },
    { src: `${base}photos/photo12.jpg`, alt: 'JK 12' },
    { src: `${base}photos/photo13.jpg`, alt: 'JK 13' },
    { src: `${base}photos/photo14.jpg`, alt: 'JK 14' },
    { src: `${base}photos/photo15.jpg`, alt: 'JK 15' },
    { src: `${base}photos/photo16.jpg`, alt: 'JK 16' },
    { src: `${base}photos/photo17.jpg`, alt: 'JK 17' },
    { src: `${base}photos/photo18.jpg`, alt: 'JK 18' },
    { src: `${base}photos/photo19.jpg`, alt: 'JK 19' },
    { src: `${base}photos/photo20.jpg`, alt: 'JK 20' },// match whatever the actual case is on disk
    // ...continue, matching each file’s exact name & extension case
  ];

  const [i, setI] = useState(0);
  const [playing, setPlaying] = useState(true);
  const timer = useRef(null);

  const go = (n) => setI((p) => (p + n + slides.length) % slides.length);
  const goTo = (n) => setI(n);

  // autoplay
  useEffect(() => {
    if (!playing) return;
    timer.current = setInterval(() => go(1), 3500);
    return () => clearInterval(timer.current);
  }, [playing]);

  // keyboard nav
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight') go(1);
      if (e.key === 'ArrowLeft') go(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // touch swipe
  const touch = useRef({ x: 0, y: 0 });
  const onTouchStart = (e) => (touch.current = { x: e.touches[0].clientX, y: e.touches[0].clientY });
  const onTouchEnd = (e) => {
    const dx = e.changedTouches[0].clientX - touch.current.x;
    if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
  };

  return (
    <section id="gallery" className="gallery-section">
     

      <div className="gallery-divider"></div>
      <h2 className="gallery-title">Wedding Gallery</h2>

      {/* centered monogram directly under header */}
      <div className="monogram-wrap">
        <img
          src={`${base}JK_monogram_wedding.svg`}
          alt="J & K monogram"
          className="monogram-under"
        />
      </div>

      <p className="gallery-subtext">
        A glimpse into the unforgettable moments we’ve captured.
      </p>

      {/* SLIDESHOW */}
      <div
        className="slideshow"
        onMouseEnter={() => setPlaying(false)}
        onMouseLeave={() => setPlaying(true)}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <button className="nav prev" aria-label="Previous slide" onClick={() => go(-1)}>‹</button>

        <div className="track" style={{ transform: `translateX(-${i * 100}%)` }}>
          {slides.map((s, idx) => (
            <div className="slide" key={idx}>
              <img
                src={s.src}
                alt={s.alt}
                loading="lazy"
                className="slide-img"
              />
              <div className="vignette" />
            </div>
          ))}
        </div>

        <button className="nav next" aria-label="Next slide" onClick={() => go(1)}>›</button>

        <div className="dots" role="tablist" aria-label="Slide navigation">
          {slides.map((_, idx) => (
            <button
              key={idx}
              className={`dot ${i === idx ? 'active' : ''}`}
              onClick={() => goTo(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              aria-selected={i === idx}
              role="tab"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
