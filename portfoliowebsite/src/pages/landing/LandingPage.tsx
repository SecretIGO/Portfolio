import React, { useCallback, useRef, useState } from 'react';
import MegaDropdown from '../../components/mega-dropdown/MegaDropdown';
import Navbar from '../../components/navbar/Navbar';
import Footer from '../../components/footer/Footer';
import './LandingPage.css';

const LandingPage: React.FC = () => {
  const [isProjectsHovered, setIsProjectsHovered] = useState(false);
  const collapseTimeoutRef = useRef<number | null>(null);

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

      {/* Header */}
      <header className="grid-item header">
        <div className="header-content">
          <Navbar 
            isProjectsHovered={isProjectsHovered}
            onProjectsMouseEnter={handleMouseEnter}
            onProjectsMouseLeave={handleMouseLeave}
          />
        </div>
      </header>

      <div className="main-container">
        <main className="grid-item main-content">
          <section className="layout-section">
            <h3 className="layout-title">Responsive Layout: Three Divisions</h3>
            <div className="main-divisions-responsive">
              <div className="main-division-1 flex-center-column">
                <h4>Division 1</h4>
                <p>Content for division 1</p>
              </div>
              <div className="main-division-2 flex-center-column">
                <h4>Division 2</h4>
                <p>Content for division 2</p>
              </div>
              <div className="main-division-3 flex-center-column">
                <h4>Division 3</h4>
                <p>Content for division 3</p>
              </div>
            </div>
          </section>

          <section className="layout-section">
            <h3>Layout 3: Left and Middle Merged (3-1)</h3>
            <div className="main-divisions-merged-left">
              <div className="main-division-merged flex-center-column">
                <h4>Merged Left & Middle</h4>
                <p>Content for merged left and middle divisions</p>
              </div>
              <div className="main-division-3 flex-center-column">
                <h4>Division 3</h4>
                <p>Content for division 3</p>
              </div>
            </div>
          </section>

          <section className="layout-section">
            <h3>Layout 4: All Merged (Single)</h3>
            <div className="main-divisions-all-merged">
              <div className="main-division-all flex-center-column">
                <h4>All Divisions Merged</h4>
                <p>Content for all merged divisions</p>
              </div>
            </div>
          </section>
        </main>
      </div>
      <footer className="footer">
        <Footer />
      </footer>
    </>
  );
};

export default LandingPage;
