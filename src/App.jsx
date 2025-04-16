// src/App.jsx

import React from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
function App() {
  return (
    <>
      <Header />
      <HeroSection />
      <main style={{ padding: '2rem' }}>
        <h1>Whats up CeCe</h1>
        <p>Find your perfect vacation stay.</p>
      </main>
    </>
  );
}

export default App;
