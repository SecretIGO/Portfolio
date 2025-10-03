import React from 'react';
import './Footer.css';
import { Mail, Phone, MapPin, Twitter, Facebook, Linkedin, Github } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="footer" role="contentinfo">
      <div className="footer-container">
        {/* Main footer content */}
        <div className="footer-main">
          {/* Brand Section */}
          <div className="footer-section footer-brand">
            <div className="brand-header">
              <img src="/images/SecretIGO_ico.png" alt="SecretIGO" className="footer-logo" />
              <h2 className="brand-name">SecretIGO</h2>
            </div>
            <p className="brand-description">
              Full-stack software engineer specializing in modern web technologies, 
              cloud architecture, and scalable solutions.
            </p>
            <div className="social-links">
              <a href="#twitter" className="social-link" aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a href="#facebook" className="social-link" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#linkedin" className="social-link" aria-label="LinkedIn">
                <Linkedin size={20} />
              </a>
              <a href="#github" className="social-link" aria-label="GitHub">
                <Github size={20} />
              </a>
            </div>
          </div>

          {/* Services Section */}
          <div className="footer-section">
            <h3 className="footer-heading">Navigation</h3>
            <ul className="footer-links">
              <li><a href="#recognitions">Recognitions</a></li>
              <li><a href="#awards">Awards</a></li>
              <li><a href="#projects">Projects</a></li>
              <li><a href="#devops">Experiments</a></li>
              <li><a href="#uhh">uhh</a></li>
            </ul>
          </div>

          {/* Quick Links Section */}
          <div className="footer-section">
            <h3 className="footer-heading">Page Navigation</h3>
            <ul className="footer-links">
              <li><a href="#about">Home</a></li>
              <li><a href="#projects">About</a></li>
              <li><a href="#blog">Projects</a></li>
            </ul>
          </div>

          {/* Contact Section */}
          <div className="footer-section">
            <h3 className="footer-heading">Get in Touch</h3>
            <ul className="footer-contact">
              <li>
                <Mail size={16} />
                <a href="mailto:johanzdavidtolentino@gmail.com">johanzdavidtolentino@gmail.com</a>
              </li>
              <li>
                <Phone size={16} />
                <a href="tel:+639201673680">(+63) 920 167 3680</a>
              </li>
              <li>
                <MapPin size={16} />
                <span>Philippines</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p className="copyright">
              © {new Date().getFullYear()} SecretIGO. All rights reserved.
            </p>
            <p className="credits">
              Crafted with passion by <span className="highlight">Johanz David Tolentino</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

