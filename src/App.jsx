import Header from './components/Header';
import HeroSection from './components/HeroSection';

import Services from './components/Services';

import Contact from './components/Contact';
import Footer from './components/Footer';
import './index.css';

function App() {
  return (
    <>
      <div className="container">
        <Header />
        <HeroSection />
      </div>
      <div className="container">
        
        <Services />
        
        <Contact />
        <Footer />
      </div>
    </>
  );
}


export default App;
