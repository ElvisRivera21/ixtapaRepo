import Header from './components/Header';
import HeroSection from './components/HeroSection';
import About from './components/About';
import Services from './components/Services';
import Gallery from './components/Gallery';
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
        <About />
        <Services />
        <Gallery />
        <Contact />
        <Footer />
      </div>
    </>
  );
}


export default App;
