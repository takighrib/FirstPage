// src/components/HeroSection.js
import React from 'react';
import './HeroSection.css';

const HeroSection = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  
  const scrollToSection = (e, sectionId) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <section id="home" className="hero-section">
      <nav className="navbar">
        <div className="nav-container">
          <div className="logo">
            <img src="/assets/logo.svg" alt="Atungs" className="logo-img" />
            <span className="logo-text">Atungs</span>
          </div>
          <div className="nav-links">
            <a href="#home" onClick={(e) => scrollToSection(e, 'home')}>Home</a>
            <a href="#process" onClick={(e) => scrollToSection(e, 'process')}>Process</a>
            <a href="#projects" onClick={(e) => scrollToSection(e, 'projects')}>Portfolio</a>
            <a href="#services" onClick={(e) => scrollToSection(e, 'services')}>Services</a>
          </div>
          <button 
            className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            ☰
          </button>
        </div>
      </nav>
      
      <div className={`mobile-nav ${mobileMenuOpen ? 'open' : ''}`}>
        <a href="#home" onClick={(e) => scrollToSection(e, 'home')}>Home</a>
        <a href="#process" onClick={(e) => scrollToSection(e, 'process')}>Process</a>
        <a href="#projects" onClick={(e) => scrollToSection(e, 'projects')}>Portfolio</a>
        <a href="#services" onClick={(e) => scrollToSection(e, 'services')}>Services</a>
      </div>
      
      <div className="hero-content">
        <div className="hero-text">
          <p className="hero-tagline">Speedy development cycles without sacrificing quality.</p>
          <h1>We Build <span className="highlight">Efficiency</span> and <span className="highlight-blue">Trust</span></h1>
          <p>Empowering businesses with high-performance websites—designed to launch quickly, scale easily, and make an impact from day one.</p>
          <button 
            className="cta-button"
            onClick={() => {
              const contactSection = document.getElementById('contact');
              if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            Grow Now
          </button>
        </div>
        
        <div className="hero-stats">
          <div className="stats-container">
            <div className="stat-item">
              <h3>35+</h3>
              <p>from landing pages to complex apps</p>
            </div>
            <div className="stat-item">
              <h3>5+ Countries</h3>
              <p>Served across Europe and North Africa</p>
            </div>
            <div className="stat-item">
              <h3>4.9★</h3>
              <p>average rating from clients & collaborators</p>
            </div>
          </div>
          
          <div className="hero-image">
            <div className="dashboard-mockup">
              <div className="dashboard-header"></div>
              <div className="dashboard-content">
                <div className="chart-area">
                  <div className="chart-bars">
                    <div className="bar" style={{height: '60%'}}></div>
                    <div className="bar" style={{height: '80%'}}></div>
                    <div className="bar" style={{height: '40%'}}></div>
                    <div className="bar" style={{height: '90%'}}></div>
                  </div>
                </div>
                <div className="pie-chart">
                  <div className="pie-segment pie-1"></div>
                  <div className="pie-segment pie-2"></div>
                  <div className="pie-segment pie-3"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;