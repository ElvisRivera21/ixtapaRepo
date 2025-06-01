import Header from './components/Header';
import HeroSection from './components/HeroSection';

import Services from './components/Services';
import Hotels from './components/Hotels';
import Contact from './components/Contact';
import Footer from './components/Footer';
import './index.css';
import ThingsToDo from './components/ThingsToDo';
function App() {
  return (
    <>
      <div className="container">
        <Header />
        <HeroSection />
      </div>
      <div className="container">
        
        <Services />
        <Hotels />
        <ThingsToDo />
        <Contact />
        <Footer />
      </div>
    </>
  );
}


export default App;
