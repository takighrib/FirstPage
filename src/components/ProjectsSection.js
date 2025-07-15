// src/components/ProjectsSection.js
import React, { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProjectsSection.css';
import projectsData from '../data/projects.json';

const ProjectsSection = () => {
  const scrollContainerRef = useRef(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const navigate = useNavigate();

  const [projects] = useState(projectsData);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    // Set up intersection observer for scroll hint animation
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            container.classList.add('scroll-hint-animation');
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(container);

    const handleMouseDown = (e) => {
      // Allow dragging on container and cards but not on interactive elements
      if (e.target.tagName === 'BUTTON' || e.target.tagName === 'A') return;
      
      isDragging.current = true;
      startX.current = e.pageX - container.offsetLeft;
      scrollLeft.current = container.scrollLeft;
      container.style.cursor = 'grabbing';
    };

    const handleMouseMove = (e) => {
      if (!isDragging.current) return;
      e.preventDefault();
      const x = e.pageX - container.offsetLeft;
      const walk = (x - startX.current) * 1.5;
      container.scrollLeft = scrollLeft.current - walk;
    };

    const handleMouseUp = () => {
      isDragging.current = false;
      container.style.cursor = 'grab';
    };

    container.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      container.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      observer.disconnect();
    };
  }, []);

  return (
    <section id="projects" className="projects-section">
      <div className="projects-header">
        <h2>Our Projects</h2>
        <button className="see-portfolio">See Full Portfolio →</button>
      </div>
      <br/>
      
      <div 
        className="projects-container" 
        ref={scrollContainerRef}
      >
        <div className="projects-track">
          {projects.map((project, index) => (
            <div key={project.id} className="project-card" style={{
              animationDelay: `${index * 0.1}s`
            }}>
              {project.image ? (
                <div className="project-image">
                  <img 
                    src={project.image}
                    alt={project.title}
                    className="project-img"
                    draggable={false}
                    onDragStart={(e) => e.preventDefault()}
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div className="project-placeholder" style={{display: 'none'}}>
                    <div className="placeholder-icon"></div>
                  </div>
                  <div className="project-date">{project.date}</div>
                </div>
              ) : (
                <div className="project-image">
                  <div className="project-placeholder">
                    <div className="placeholder-icon"></div>
                  </div>
                  <div className="project-date">{project.date}</div>
                </div>
              )}
              <div className="project-content">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <span className="project-category">{project.category}</span>
                <button 
                  className="discover-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/project/${project.id}`);
                  }}
                >
                  Discover
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="scroll-indicator">
        <div className="scroll-hint">← Scroll to explore more projects →</div>
      </div>
    </section>
  );
};

export default ProjectsSection;