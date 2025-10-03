import React, { useEffect, useState } from 'react';
import './Hero.css';
import { ArrowRight, Github, Linkedin, Mail } from 'lucide-react';

const Hero: React.FC = () => {
  const roles = ['Software Engineer', 'Developer', 'Problem Solver', 'Creative Designer'];
  const [currentRole, setCurrentRole] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [roles.length]);

  return (
    <section className="hero" id="home">
      {/* Subtle Background */}
      <div className="hero-background">
        <div className="gradient-accent"></div>
      </div>

      <div className="hero-container">
        <div className="hero-content">
          <div className="hero-badge">
            <span className="badge-dot"></span>
            <span>Open to opportunities</span>
            <div className="badge-shine"></div>
          </div>
          
          <h1 className="hero-title">
            <span className="hero-name">Johanz David Tolentino</span>
            <span key={currentRole} className="flickering-role">
              {roles[currentRole]}
            </span>
          </h1>
          
          <p className="hero-description">
            I craft elegant digital experiences through clean code and thoughtful design. 
            Specializing in modern web technologies, cloud architecture, and scalable solutions.
          </p>
          
          <div className="hero-actions">
            <a href="#contact" className="hero-cta primary">
              <span>Let's Talk</span>
              <ArrowRight size={18} />
              <div className="cta-shine"></div>
            </a>
            <a href="#projects" className="hero-cta secondary">
              <span>View Work</span>
            </a>
          </div>
          
          <div className="hero-social">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="GitHub">
              <Github size={20} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="LinkedIn">
              <Linkedin size={20} />
            </a>
            <a href="mailto:johanzdavidtolentino@gmail.com" className="social-link" aria-label="Email">
              <Mail size={20} />
            </a>
          </div>
        </div>
        
        <div className="hero-visual">
          <div className="hero-image-wrapper">
            <div className="image-backdrop"></div>
            <img 
              src="/images/SecretIGO_ico.png" 
              alt="Johanz David Tolentino" 
              className="hero-image"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
