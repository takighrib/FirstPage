// src/components/HeroSection.js
import React from 'react';
import './HeroSection.css';

const HeroSection = () => {
  return (
    <section className="hero-section">
      <nav className="navbar">
        <div className="nav-container">
          <div className="logo">
            <span className="logo-text">Atungs</span>
          </div>
          <div className="nav-links">
            <a href="#home">Home</a>
            <a href="#about">Who Are We</a>
            <a href="#portfolio">Portfolio</a>
            <a href="#services">Services</a>
          </div>
        </div>
      </nav>
      
      <div className="hero-content">
        <div className="hero-text">
          <p className="hero-tagline">Speedy development cycles without sacrificing quality.</p>
          <h1>We Build <span className="highlight">Efficency</span> and <span className="highlight-blue">Trust</span></h1>
          <p>Empowering businesses with high-performance websites—designed to launch quickly, scale easily, and make an impact from day one.</p>
          <button className="cta-button">Grow Now</button>
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