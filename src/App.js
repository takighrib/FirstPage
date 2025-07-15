// src/App.js
import React from 'react';
import './App.css';
import HeroSection from './components/HeroSection';
import ProjectsSection from './components/ProjectsSection';
import ServicesSection from './components/ServicesSection';
import CTASection from './components/CTASection';
import ProcessSection from './components/ProcessSection';

function App() {
  return (
    <div className="App">
      <HeroSection />
      <ProcessSection />

      <ProjectsSection />
            <ServicesSection />

      <CTASection />
    </div>
  );
}

export default App;