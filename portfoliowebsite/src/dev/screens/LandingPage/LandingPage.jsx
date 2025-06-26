import React, { useState, useEffect } from 'react';
import './css/css_footer.css';
import './css/css_landing_page.css';
import './css/css_navbar.css';
import logo from './image/SecretIGO_ico.png'

const LandingPage = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth <= 480;
  const isTablet = windowWidth > 480 && windowWidth <= 768;

  return (
    <div className="main-container">
      <header className="grid-item header">
        <div className="flex-container flex-row flex-between">
          <div className="logo-banner-container flex-container flex-row flex-center">
            <img src={logo} alt="Logo" />
            <h1>SecretIGO</h1>
          </div>
          <nav className="flex-container flex-row flex-center">
            <a href="#home">Home</a>
            <a href="#about">About</a>
            <a href="#contact">Projects</a>
            <a href="#contact">Contact</a>
          </nav>
        </div>
      </header>
      <main className="grid-item main-content">
        {isMobile ? (
          <div className="layout-section">
            <h3>Mobile Layout: Stacked Divisions</h3>
            <div className="main-divisions-stacked">
              <div className="main-division-1">
                <div className="flex-container flex-column flex-center">
                  <h4>Division 1</h4>
                  <p>Content for division 1</p>
                </div>
              </div>
              <div className="main-division-2">
                <div className="flex-container flex-column flex-center">
                  <h4>Division 2</h4>
                  <p>Content for division 2</p>
                </div>
              </div>
              <div className="main-division-3">
                <div className="flex-container flex-column flex-center">
                  <h4>Division 3</h4>
                  <p>Content for division 3</p>
                </div>
              </div>
            </div>
          </div>
        ) : isTablet ? (
          <div className="layout-section">
            <h3>Tablet Layout: Middle and Right Merged</h3>
            <div className="main-divisions-merged-right">
              <div className="main-division-1">
                <div className="flex-container flex-column flex-center">
                  <h4>Division 1</h4>
                  <p>Content for division 1</p>
                </div>
              </div>
              <div className="main-division-merged">
                <div className="flex-container flex-column flex-center">
                  <div>
                    <h4>Division 2</h4>
                    <p>Content for division 2</p>
                  </div>
                  <div style={{ marginTop: '1rem' }}>
                    <h4>Division 3</h4>
                    <p>Content for division 3</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="layout-section">
            <h3>Desktop Layout: Three Divisions (1-2-1)</h3>
            <div className="main-divisions">
              <div className="main-division-1">
                <div className="flex-container flex-column flex-center">
                  <h4>Division 1</h4>
                  <p>Content for division 1</p>
                </div>
              </div>
              <div className="main-division-2">
                <div className="flex-container flex-column flex-center">
                  <h4>Division 2</h4>
                  <p>Content for division 2</p>
                </div>
              </div>
              <div className="main-division-3">
                <div className="flex-container flex-column flex-center">
                  <h4>Division 3</h4>
                  <p>Content for division 3</p>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* Layout 3: Left and Middle merged (3-1) */}
        <div className="layout-section">
          <h3>Layout 3: Left and Middle Merged (3-1)</h3>
          <div className="main-divisions-merged-left">
            <div className="main-division-merged">
              <div className="flex-container flex-column flex-center">
                <h4>Merged Left & Middle</h4>
                <p>Content for merged left and middle divisions</p>
              </div>
            </div>
            <div className="main-division-3">
              <div className="flex-container flex-column flex-center">
                <h4>Division 3</h4>
                <p>Content for division 3</p>
              </div>
            </div>
          </div>
        </div>
        {/* Layout 4: All merged (single) */}
        <div className="layout-section">
          <h3>Layout 4: All Merged (Single)</h3>
          <div className="main-divisions-all-merged">
            <div className="main-division-all">
              <div className="flex-container flex-column flex-center">
                <h4>All Divisions Merged</h4>
                <p>Content for all merged divisions</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer className="grid-item footer">
        <div className="flex-container flex-row flex-between">
          <div className="footer-section">
            <h4>Contact Info</h4>
            <div className="flex-container flex-row">
              <a>Email: johanzdavidtolentino@gmail.com</a>
              <a>Mobile: +63 920-167-3680</a>
            </div>
          </div>
          <div className="footer-section">
            <h4>Follow Us</h4>
            <div className="flex-container flex-row">
              <a href="#twitter">Twitter</a>
              <a href="#facebook">Facebook</a>
              <a href="#linkedin">LinkedIn</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage; 