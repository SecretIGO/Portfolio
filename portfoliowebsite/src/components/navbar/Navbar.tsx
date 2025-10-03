import React, { useEffect, useState } from 'react';
import './Navbar.css';
import { Menu, X, ChevronDown, Sun, Moon, Twitter, Facebook, Linkedin, Github } from 'lucide-react';

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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window === 'undefined') return 'light';
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    return prefersDark ? 'dark' : 'light';
  });

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.setAttribute('data-theme', 'dark');
    } else {
      root.setAttribute('data-theme', 'light');
    }
  }, [theme]);

  const toggleTheme = () => setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));

  return (
    <header className="navbar">
      <div className="navbar-container">
        {/* Logo/Brand */}
        <a href="#home" className="navbar-brand">
          <img src="/images/SecretIGO_ico.png" alt="SecretIGO" className="navbar-logo" />
          <span className="navbar-brand-name">SecretIGO</span>
        </a>

        {/* Desktop Navigation */}
        <nav className="navbar-nav">
          <a href="#home" className="nav-link">Home</a>
          <a href="#about" className="nav-link">About</a>
          <a 
            href="#projects" 
            className="nav-link nav-link-dropdown"
            onMouseEnter={onProjectsMouseEnter}
            onMouseLeave={onProjectsMouseLeave}
            aria-haspopup="menu"
            aria-expanded={isProjectsHovered}
          >
            Projects
            <ChevronDown size={16} className="dropdown-icon" />
          </a>
          <a href="#contact" className="nav-link">Contact</a>
        </nav>

        {/* Theme Toggle and Socials */}
        <div className="navbar-actions">
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <span className="navbar-actions-sep" aria-hidden="true" />
          <div className="navbar-socials" aria-label="Social links">
            <a href="#twitter" className="navbar-social-link" aria-label="Twitter"><Twitter size={18} /></a>
            <a href="#facebook" className="navbar-social-link" aria-label="Facebook"><Facebook size={18} /></a>
            <a href="#linkedin" className="navbar-social-link" aria-label="LinkedIn"><Linkedin size={18} /></a>
            <a href="#github" className="navbar-social-link" aria-label="GitHub"><Github size={18} /></a>
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="mobile-menu-toggle" 
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="mobile-menu">
          <a href="#home" className="mobile-nav-link" onClick={toggleMobileMenu}>Home</a>
          <a href="#about" className="mobile-nav-link" onClick={toggleMobileMenu}>About</a>
          <a href="#projects" className="mobile-nav-link" onClick={toggleMobileMenu}>Projects</a>
          <a href="#contact" className="mobile-nav-link" onClick={toggleMobileMenu}>Contact</a>
          <button className="mobile-theme-toggle" onClick={() => { toggleTheme(); toggleMobileMenu(); }}>
            {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
          </button>
          <div className="mobile-separator" aria-hidden="true" />
          <div className="mobile-socials" aria-label="Social links">
            <a href="#twitter" className="mobile-social-link" onClick={toggleMobileMenu} aria-label="Twitter"><Twitter size={18} /></a>
            <a href="#facebook" className="mobile-social-link" onClick={toggleMobileMenu} aria-label="Facebook"><Facebook size={18} /></a>
            <a href="#linkedin" className="mobile-social-link" onClick={toggleMobileMenu} aria-label="LinkedIn"><Linkedin size={18} /></a>
            <a href="#github" className="mobile-social-link" onClick={toggleMobileMenu} aria-label="GitHub"><Github size={18} /></a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
