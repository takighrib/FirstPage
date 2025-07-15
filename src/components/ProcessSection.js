// src/components/ProcessSection.js
import React from 'react';
import './ProcessSection.css';

const ProcessSection = () => {
  const processSteps = [
    {
      step: '1',
      title: 'Discover & Define',
      description: 'We align goals, user needs, and project scope.',
      icon: '📊'
    },
    {
      step: '2',
      title: 'UX UI & Prototype',
      description: 'Crafting intuitive, modern interfaces with user flows.',
      icon: '🎨'
    },
    {
      step: '3',
      title: 'Develop & Test',
      description: 'Full-stack builds with clean, scalable code.',
      icon: '💻'
    },
    {
      step: '4',
      title: 'Launch & Support',
      description: 'Deploying your product with ongoing support for growth.',
      icon: '🚀'
    }
  ];

  return (
    <section id="process" className="process-section">
      <div className="process-container">
        <div className="process-left">
          <h2>A Clean, Agile <span className="highlight">Process</span> to<br />Bring Your Vision to Life</h2>
        </div>
        
        <div className="process-right">
          <div className="process-steps">
            {processSteps.map((step, index) => (
              <div key={index} className="process-step" style={{
                animationDelay: `${index * 0.2}s`
              }}>
                <div className="step-header">
                  <div className="process-icon-main">{step.icon}</div>
                </div>
                <h4>{step.title}</h4>
                <p>{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;