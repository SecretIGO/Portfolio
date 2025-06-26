import React from 'react';
import './css/css_footer.css';
import './css/css_landing_page.css';
import './css/css_navbar.css';
import logo from './image/SecretIGO_ico.png'

const LandingPage = () => {
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
        {/* Layout 1: Original 3 divisions (1-2-1) */}
        <div className="layout-section">
          <h3>Layout 1: Three Divisions (1-2-1)</h3>
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

        {/* Layout 2: Middle and Right merged (1-3) */}
        <div className="layout-section">
          <h3>Layout 2: Middle and Right Merged (1-3)</h3>
          <div className="main-divisions-merged-right">
            <div className="main-division-1">
              <div className="flex-container flex-column flex-center">
                <h4>Division 1</h4>
                <p>Content for division 1</p>
              </div>
            </div>
            
            <div className="main-division-merged">
              <div className="flex-container flex-column flex-center">
                <h4>Merged Middle & Right</h4>
                <p>Content for merged middle and right divisions</p>
              </div>
            </div>
          </div>
        </div>

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
            <p>Email: johanzdavidtolentino@gmail.com</p>
            <p>Mobile: +63 920-167-3680</p>
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