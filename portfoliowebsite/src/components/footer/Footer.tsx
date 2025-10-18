import React from 'react';
import './Footer.css';
import { Mail, Phone, MapPin, Twitter, Facebook, Linkedin, Github } from 'lucide-react';
import { PAGE_NAV, SITE_SECTIONS, SOCIALS } from '../../_constants/navigation';
import IconButton from '../../_ui_library/button-icon/IconButton';

const Footer: React.FC = () => {

  const socialIconMap: Record<string, React.ComponentType<{ size?: number | string; className?: string }>> = {
    twitter: Twitter,
    facebook: Facebook,
    linkedin: Linkedin,
    github: Github,
  };

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
              {SOCIALS.map(s => {
                const Icon = socialIconMap[s.name] || Github;
                const label = s.name.charAt(0).toUpperCase() + s.name.slice(1);
                return (
                  <IconButton
                    key={s.name}
                    href={s.href}
                    variant='secondary'
                    radius='sm'
                    icon={Icon}
                    size='md'
                    rel="noopener noreferrer"
                    aria-label={label}
                    animation='hover-lift'
                  />
                );
              })}
            </div>
          </div>

          {/* Services Section */}
          <div className="footer-section">
            <h3 className="footer-heading">Navigation</h3>
            <ul className="footer-links">
              {SITE_SECTIONS.map(item => (
                <li key={item.id}>
                  <a href={item.href}>{item.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links Section */}
          <div className="footer-section">
            <h3 className="footer-heading">Page Navigation</h3>
            <ul className="footer-links">
              {PAGE_NAV.map(item => (
                <li key={item.id}>
                  <a href={item.href}>{item.label}</a>
                </li>
              ))}
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

