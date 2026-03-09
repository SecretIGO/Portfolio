import React, { useCallback, useRef, useState } from 'react';
import MegaDropdown from '../../components/mega-dropdown/MegaDropdown';
import Navbar from '../../components/navbar/Navbar';
import Footer from '../../components/footer/Footer';
import Hero from '../../components/hero/Hero';
import About from '../../components/about/About';
import Projects from '../../components/projects/Projects';
import './LandingPage.css';

const LandingPage: React.FC = () => {
  const [isProjectsHovered, setIsProjectsHovered] = useState(false);
  const collapseTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseLeave = useCallback(() => {
    const timeout = setTimeout(() => {
      setIsProjectsHovered(false);
    }, 100);
    collapseTimeoutRef.current = timeout;
  }, []);

  const handleMouseEnter = useCallback(() => {
    if (collapseTimeoutRef.current) {
      clearTimeout(collapseTimeoutRef.current);
      collapseTimeoutRef.current = null;
    }
    setIsProjectsHovered(true);
  }, []);

  return (
    <>
      <MegaDropdown 
        isVisible={isProjectsHovered}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      />

      <Navbar 
        isProjectsHovered={isProjectsHovered}
        onProjectsMouseEnter={handleMouseEnter}
        onProjectsMouseLeave={handleMouseLeave}
      />

      <main id="main" className="page-container main-container" role="main">
        <Hero />
        <About />
        <Projects />
      </main>
      
      <Footer />
    </>
  );
};

export default LandingPage;
