// src/components/ProjectDetail.js
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import projectsData from '../data/projects.json';
import './ProjectDetail.css';

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = projectsData.find(p => p.id === parseInt(id));

  if (!project) {
    return (
      <div className="project-detail-container">
        <div className="project-not-found">
          <h1>Project Not Found</h1>
          <button onClick={() => navigate('/')} className="back-btn">
            ← Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="project-detail-container">
      <nav className="project-nav">
        <div className="nav-container">
          <button onClick={() => navigate('/')} className="back-btn">
            ← Back to Portfolio
          </button>
          <div className="logo">
            <img src="/assets/logo.svg" alt="Atungs" className="logo-img" />
            <span className="logo-text">Atungs</span>
          </div>
        </div>
      </nav>

      <div className="project-detail-content">
        <div className="project-hero">
          <div className="project-hero-content">
            <div className="project-meta">
              <span className="project-category">{project.category}</span>
              <span className="project-date">{project.date}</span>
            </div>
            <h1 className="project-title">{project.title}</h1>
            <p className="project-description">{project.description}</p>
            
            <div className="project-technologies">
              {project.technologies.map((tech, index) => (
                <span key={index} className="tech-tag">{tech}</span>
              ))}
            </div>

          
          </div>

          {project.image && project.image !== '' && project.image !== '#' && (
            <div className="project-image-container">
              <img 
                src={project.image} 
                alt={project.title} 
                className="project-main-image"
                onError={(e) => {
                  e.target.parentElement.style.display = 'none';
                }}
              />
            </div>
          )}
        </div>

        <div className="project-content">
          <div className="content-section">
            <h2>About This Project</h2>
            <p className="project-full-description">{project.fullDescription}</p>
          </div>

          <div className="content-section">
            <h2>Business Impact</h2>
            <p style={{fontSize: '1.2rem', fontWeight: '600', color: 'var(--primary-blue)', marginBottom: '16px'}}>{project.businessValue || 'This project delivers measurable business value through innovative technology solutions that drive growth, efficiency, and competitive advantage for our clients.'}</p>
          </div>

          <div className="content-section">
            <h2>Technologies Used</h2>
            <div className="tech-grid">
              {project.technologies.map((tech, index) => (
                <div key={index} className="tech-item">
                  <span className="tech-name">{tech}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="project-footer">
          <div className="footer-content">
            <h3>Interested in Similar Work?</h3>
            <p>Let's discuss how we can bring your ideas to life with cutting-edge technology.</p>
            <button 
              onClick={() => {
                navigate('/');
                setTimeout(() => {
                  const contactSection = document.getElementById('contact');
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }, 100);
              }} 
              className="contact-btn"
            >
              Get In Touch
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;