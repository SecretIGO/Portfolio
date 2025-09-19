import React from 'react';
import './Footer.css';
import TechyFooterBackground from './TechyFooterBackground';
import { Mail, Phone, Twitter, Facebook, Linkedin, Github } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <div className="footer" role="contentinfo">
      <TechyFooterBackground />
      <div className="footer-content" aria-label="Footer">
        <div className="futuristic-panel">
          <div className="panel-grid">
            {/* Company */}
            <div className="panel-section company-section">
              <div className="section-header">
                <img src="/images/SecretIGO_ico.png" alt="SecretIGO logo" className="company-logo" />
                <h2 className="company-name company-name--sm gradient-text">SecretIGO</h2>
                <p className="company-tagline">Software Engineer & Full Stack Developer</p>
              </div>
            </div>

            {/* Contact Information */}
            <div className="panel-section contact-section">
              <h3 className="section-title">Contact</h3>
              <div className="contact-grid">
                <div className="contact-item">
                  <div className="contact-icon">
                    <Mail size={18} />
                  </div>
                  <a href="mailto:johanzdavidtolentino@gmail.com" className="contact-text">johanzdavidtolentino@gmail.com</a>
                </div>
                <div className="contact-item">
                  <div className="contact-icon">
                    <Phone size={18} />
                  </div>
                  <div className="contact-text">
                    <a href="tel:+639201673680">(+63)920 - 167 - 3680</a><br />
                    <a href="tel:+639270615084">(+63)927 - 061 - 5084</a>
                  </div>
                </div>
              </div>
            </div>

            {/* Services */}
            <div className="panel-section services-section">
              <h3 className="section-title">Services</h3>
              <div className="services-list">
                <div className="service-item">Web Development</div>
                <div className="service-item">Mobile Apps</div>
                <div className="service-item">API Design</div>
                <div className="service-item">DevOps</div>
              </div>
            </div>

            {/* Social Links */}
            <div className="panel-section social-section">
              <h3 className="section-title">Connect</h3>
              <div className="social-buttons">
                <a className="social-btn" href="#twitter" aria-label="Twitter">
                  <Twitter size={20} />
                </a>
                <a className="social-btn" href="#facebook" aria-label="Facebook">
                  <Facebook size={20} />
                </a>
                <a className="social-btn" href="#linkedin" aria-label="LinkedIn">
                  <Linkedin size={20} />
                </a>
                <a className="social-btn" href="#github" aria-label="GitHub">
                  <Github size={20} />
                </a>
              </div>
            </div>
          </div>

          {/* Credit Footer */}
          <div className="panel-footer">
            <div className="credit-line">
              <span className="copyright">© 2025 SecretIGO</span>
              <span className="separator">•</span>
              <span className="creator">Crafted by Johanz David Tolentino</span>
            </div>
            <div className="tagline">White light through copper lines — where ideas become products.</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;

