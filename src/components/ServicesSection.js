// src/components/ServicesSection.js
import React from 'react';
import './ServicesSection.css';

const ServicesSection = () => {
  const services = [
    {
      icon: '🎨',
      title: 'UI/UX Design',
      description: 'Crafting intuitive, modern interfaces that elevate user experience.'
    },
    {
      icon: '💻',
      title: 'Web Development',
      description: 'From landing pages to scalable web apps we code clean, fast, and reliable.'
    },
    {
      icon: '📱',
      title: 'Strategy & Prototyping',
      description: 'Transforming ideas into functional prototypes aligned with business goals.'
    },
    {
      icon: '🚀',
      title: 'Launch & Optimization',
      description: 'Deploying your product with continuous support and performance tuning.'
    }
  ];

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
      icon: '⚙️'
    },
    {
      step: '4',
      title: 'Launch & Support',
      description: 'Deploying your product with ongoing support for growth.',
      icon: '🚀'
    }
  ];

  return (
    <section className="services-section">
      <div className="services-header">
        <h2>Services</h2>
        <p>Design. Build. Launch. Grow.</p>
      </div>
      
      <div className="services-container">
        <div className="services-grid">
          {services.map((service, index) => (
            <div key={index} className="service-card" style={{
              animationDelay: `${index * 0.1}s`
            }}>
              <div className="service-icon">{service.icon}</div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;