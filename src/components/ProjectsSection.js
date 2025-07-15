// src/components/ProjectsSection.js
import React, { useRef, useEffect } from 'react';
import './ProjectsSection.css';

const ProjectsSection = () => {
  const scrollContainerRef = useRef(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const projects = [
    {
      id: 1,
      title: "Toufoubox",
      description: "Android/AR/Application/Games",
      date: "Dec 2022",
      image: "/api/placeholder/300/200",
      category: "Mobile Apps /AR-VR/ Web..."
    },
    {
      id: 2,
      title: "Musée Bardo UP",
      description: "AR app for Bardo Museum",
      date: "Sep 2019",
      image: "/api/placeholder/300/200",
      category: "Oculus Quest"
    },
    {
      id: 3,
      title: "Teleport Project",
      description: "Teleport based Hand Tracking Gesture Recognition.",
      date: "Aug 2020",
      image: "/api/placeholder/300/200",
      category: "Mobile App"
    }
  ];

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleMouseDown = (e) => {
      isDragging.current = true;
      startX.current = e.pageX - container.offsetLeft;
      scrollLeft.current = container.scrollLeft;
      container.style.cursor = 'grabbing';
    };

    const handleMouseMove = (e) => {
      if (!isDragging.current) return;
      e.preventDefault();
      const x = e.pageX - container.offsetLeft;
      const walk = (x - startX.current) * 2;
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
    };
  }, []);

  return (
    <section className="projects-section">
      <div className="projects-header">
        <h2>Our Projects</h2>
        <button className="see-portfolio">See Full Portfolio →</button>
      </div>
      
      <div 
        className="projects-container" 
        ref={scrollContainerRef}
      >
        <div className="projects-track">
          {projects.map((project, index) => (
            <div key={project.id} className="project-card" style={{
              animationDelay: `${index * 0.1}s`
            }}>
              <div className="project-image">
                <img 
                  src={`./assets/projects/${project.id}.jpg`}
                  alt={project.title}
                  className="project-img"
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
              <div className="project-content">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <span className="project-category">{project.category}</span>
                <button className="discover-btn">Discover</button>
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