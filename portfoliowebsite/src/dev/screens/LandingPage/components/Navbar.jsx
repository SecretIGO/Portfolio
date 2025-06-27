import React, { useState, useCallback, useRef } from 'react';
import logo from '../image/SecretIGO_ico.png';

const Navbar = () => {
  const [isProjectsHovered, setIsProjectsHovered] = useState(false);
  const collapseTimeoutRef = useRef(null);

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
    <div className="flex-container flex-row flex-between">
      <div className="logo-banner-container flex-container flex-row flex-center">
        <img src={logo} alt="Logo" />
        <h1>SecretIGO</h1>
      </div>
      <nav className="flex-container flex-row flex-center">
        <a href="#home">Home</a>
        <a href="#about">About</a>
        <a 
          href="#contact" 
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          Projects
        </a>
        <a href="#contact">Contact</a>
      </nav>
      <div 
        className={`full-width-dropdown ${isProjectsHovered ? 'expanded' : ''}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="projects-dropdown">
          <div className="project-item">Project 1</div>
          <div className="project-item">Project 2</div>
        </div>
      </div>
    </div>
  );
};

export default Navbar; 