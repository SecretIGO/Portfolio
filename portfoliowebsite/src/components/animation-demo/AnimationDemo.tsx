import React, { useState } from 'react';
import { useScrollAnimation, useHoverAnimation, useClickAnimation } from '../../hooks/useAnimation';
import './AnimationDemo.css';

const AnimationDemo: React.FC = () => {
  const [showAnimations, setShowAnimations] = useState(false);
  const [scrollRef, isScrollVisible] = useScrollAnimation(0.1);
  const [hoverRef, isHovered] = useHoverAnimation();
  const [clickRef, isClicked] = useClickAnimation();

  return (
    <div className="animation-demo-container">
      <div className="container">
        <h2 className="section-title">Animation Design Tokens Demo</h2>
        
        {/* Basic Animation Presets */}
        <div className="demo-section">
          <h3>Basic Animation Presets</h3>
          <div className="animation-grid">
            <div className="animation-card animate-fade-in">Fade In</div>
            <div className="animation-card animate-slide-in-up">Slide In Up</div>
            <div className="animation-card animate-slide-in-left">Slide In Left</div>
            <div className="animation-card animate-scale-in">Scale In</div>
            <div className="animation-card animate-bounce-in">Bounce In</div>
            <div className="animation-card animate-rotate-in">Rotate In</div>
          </div>
        </div>

        {/* Continuous Animations */}
        <div className="demo-section">
          <h3>Continuous Animations</h3>
          <div className="animation-grid">
            <div className="animation-card animate-pulse">Pulse</div>
            <div className="animation-card animate-spin">Spin</div>
            <div className="animation-card animate-bounce">Bounce</div>
            <div className="animation-card animate-ping">Ping</div>
          </div>
        </div>

        {/* Hover Effects */}
        <div className="demo-section">
          <h3>Hover Effects</h3>
          <div className="animation-grid">
            <div className="animation-card hover-lift">Hover Lift</div>
            <div className="animation-card hover-scale">Hover Scale</div>
            <div className="animation-card hover-rotate">Hover Rotate</div>
            <div 
              ref={hoverRef}
              className={`animation-card ${isHovered ? 'animate-bounce-in' : ''}`}
            >
              Hook-based Hover
            </div>
          </div>
        </div>

        {/* Click Effects */}
        <div className="demo-section">
          <h3>Click Effects</h3>
          <div className="animation-grid">
            <div 
              ref={clickRef}
              className={`animation-card ${isClicked ? 'animate-shake' : ''}`}
            >
              Click Me (Shake)
            </div>
            <div 
              ref={clickRef}
              className={`animation-card ${isClicked ? 'animate-scale-out' : ''}`}
            >
              Click Me (Scale)
            </div>
          </div>
        </div>

        {/* Scroll-triggered Animations */}
        <div className="demo-section">
          <h3>Scroll-triggered Animations</h3>
          <div 
            ref={scrollRef}
            className={`animation-card ${isScrollVisible ? 'animate-slide-in-up' : 'animate-on-scroll'}`}
          >
            Scroll to see me animate!
          </div>
        </div>

        {/* Staggered Animations */}
        <div className="demo-section">
          <h3>Staggered Animations</h3>
          <div className="staggered-grid">
            <div className="animation-card animate-slide-in-up stagger-1">Item 1</div>
            <div className="animation-card animate-slide-in-up stagger-2">Item 2</div>
            <div className="animation-card animate-slide-in-up stagger-3">Item 3</div>
            <div className="animation-card animate-slide-in-up stagger-4">Item 4</div>
            <div className="animation-card animate-slide-in-up stagger-5">Item 5</div>
          </div>
        </div>

        {/* Transition Effects */}
        <div className="demo-section">
          <h3>Transition Effects</h3>
          <div className="animation-grid">
            <div className="animation-card transition-colors">Color Transition</div>
            <div className="animation-card transition-transform">Transform Transition</div>
            <div className="animation-card transition-shadow">Shadow Transition</div>
            <div className="animation-card transition-scale">Scale Transition</div>
          </div>
        </div>

        {/* Interactive Toggle */}
        <div className="demo-section">
          <h3>Interactive Animations</h3>
          <button 
            className="btn-base btn-primary btn-md"
            onClick={() => setShowAnimations(!showAnimations)}
          >
            Toggle Animations
          </button>
          <div className={`toggle-container ${showAnimations ? 'show' : ''}`}>
            <div className="animation-card animate-fade-in">Toggle Animation 1</div>
            <div className="animation-card animate-slide-in-left">Toggle Animation 2</div>
            <div className="animation-card animate-bounce-in">Toggle Animation 3</div>
          </div>
        </div>

        {/* Loading States */}
        <div className="demo-section">
          <h3>Loading States</h3>
          <div className="loading-demo">
            <div className="loading-spinner animate-spin"></div>
            <div className="loading-text loading-dots">Loading</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimationDemo;
