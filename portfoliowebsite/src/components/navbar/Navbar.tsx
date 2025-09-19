import React from 'react';
import './Navbar.css';

interface NavbarProps {
  isProjectsHovered: boolean;
  onProjectsMouseEnter: () => void;
  onProjectsMouseLeave: () => void;
}

const Navbar: React.FC<NavbarProps> = ({
  isProjectsHovered,
  onProjectsMouseEnter,
  onProjectsMouseLeave
}) => {

  return (
    <div className="navbar-container">
      <div className="logo-banner-container">
        <img src="/images/SecretIGO_ico.png" alt="Logo" />
        <h1>SecretIGO</h1>
      </div>
      <nav className="navbar-nav">
        <a href="#home">Home</a>
        <a href="#about">About</a>
        <a 
          href="#contact" 
          onMouseEnter={onProjectsMouseEnter}
          onMouseLeave={onProjectsMouseLeave}
          aria-haspopup="menu"
          aria-expanded={isProjectsHovered}
          data-has-dropdown="true"
        >
          Projects
        </a>
        <a href="#contact">Contact</a>
      </nav>
    </div>
  );
};

export default Navbar;
