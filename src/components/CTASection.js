// src/components/CTASection.js
import React, { useState } from 'react';
import './CTASection.css';
import Modal from './Modal';
import faqsData from '../data/faqs.json';
import aboutData from '../data/about.json';

const CTASection = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    message: ''
  });
  
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showFaqModal, setShowFaqModal] = useState(false);
  const [showAboutModal, setShowAboutModal] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  
  // Load saved form data on component mount
  React.useEffect(() => {
    const savedData = localStorage.getItem('contactFormData');
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        if (!parsed.submitted) {
          setFormData({
            firstName: parsed.firstName || '',
            lastName: parsed.lastName || '',
            email: parsed.email || '',
            phone: parsed.phone || '',
            company: parsed.company || '',
            message: parsed.message || ''
          });
        }
      } catch (error) {
        console.error('Error loading saved form data:', error);
      }
    }
  }, []);
  
  // Save form data as user types
  const handleChangeWithSave = (e) => {
    const newFormData = {
      ...formData,
      [e.target.name]: e.target.value
    };
    setFormData(newFormData);
    
    // Auto-save to localStorage
    localStorage.setItem('contactFormData', JSON.stringify({
      ...newFormData,
      timestamp: new Date().toISOString(),
      submitted: false
    }));
  };

  const handleChange = handleChangeWithSave;

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Save form data to localStorage before sending
      localStorage.setItem('contactFormData', JSON.stringify({
        ...formData,
        timestamp: new Date().toISOString(),
        submitted: true
      }));
      
      const response = await fetch('https://cloud.brinis.pro/tools/email.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          phone: formData.phone,
          company: formData.company,
          message: formData.message,
          to: 'sales@gwings.tech'
        })
      });
      
      if (response.ok) {
        setShowSuccessModal(true);
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          company: '',
          message: ''
        });
      } else {
        throw new Error('Failed to send email');
      }
    } catch (error) {
      console.error('Error sending email:', error);
      alert('Failed to send message. Please try again.');
    }
  };

  return (
    <>
      <section id="contact" className="cta-section">
        <div className="cta-content">
          <div className="cta-left">
            <h2>Let's Build<br />Something<br />Together.</h2>
            <div className="contact-info">
              <div className="contact-item">
                <span className="contact-icon">✉</span>
                <a 
                  href="mailto:sales@gwings.tech?subject=Inquiry about Wings Services&body=Hi Wings Team,%0D%0A%0D%0AI'm interested in learning more about your web development services. Could we schedule a time to discuss my project?%0D%0A%0D%0ABest regards"
                  className="contact-link"
                >
                  sales@gwings.tech
                </a>
              </div>
              <div className="contact-item">
                <span className="contact-icon">💬</span>
                <a 
                  href="https://wa.me/21625420749?text=Hi%20Wings%20Team!%20I'm%20interested%20in%20your%20web%20development%20services.%20Could%20we%20discuss%20my%20project?"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-link"
                >
                  +216 25 420 749
                </a>
              </div>
            </div>
          </div>
          
          <div className="cta-right">
            <div className="form-header">
              <h3>Have an Idea? Let's Talk.</h3>
            </div>
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-row">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number (optional)"
                value={formData.phone}
                onChange={handleChange}
              />
              <input
                type="text"
                name="company"
                placeholder="Company"
                value={formData.company}
                onChange={handleChange}
              />
              <textarea
                name="message"
                placeholder="Message"
                rows="4"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
              <button type="submit" className="submit-btn">
                Get in touch
              </button>
            </form>
          </div>
        </div>
      </section>
      
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-left">
<h3 style={{ color: "rgba(255,255,255,0.7)", fontWeight: 400 }}>
  Your next <span style={{ color: "#fff" }}>project</span><br />
  starts here.<br />
  <span style={{ color: "#9EFF35", fontWeight: "bold" }}>Grow Now!</span>
</h3>

            <div className="footer-year">2025®</div>
          </div>
          <div className="footer-center">
            <div className="footer-column">
              <h4>Projects</h4>
              <ul>
                <li onClick={() => setShowAboutModal(true)}>Who Are We</li>
                <li onClick={() => setShowFaqModal(true)}>FAQs</li>
              </ul>
            </div>
            <div className="footer-column">
              <h4>Services</h4>
              <ul>
                <li>
                  <a 
                    href="mailto:sales@gwings.tech?subject=Inquiry about Wings Services&body=Hi Wings Team,%0D%0A%0D%0AI'm interested in learning more about your web development services. Could we schedule a time to discuss my project?%0D%0A%0D%0ABest regards"
                    className="footer-contact-link"
                  >
                    sales@gwings.tech
                  </a>
                </li>
                <li>
                  <a 
                    href="https://wa.me/21625420749?text=Hi%20Wings%20Team!%20I'm%20interested%20in%20your%20web%20development%20services.%20Could%20we%20discuss%20my%20project?"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-contact-link"
                  >
                    +216 25 420 749
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="footer-right">
            <div className="footer-logo">
              <img src="/assets/logo.svg" alt="Atungs" className="logo-img" />
              <span className="logo-text">Atungs</span>
            </div>
            <div className="footer-social">
              <a href="https://www.linkedin.com/company/gwings" className="social-link" target="_blank" rel="noopener noreferrer"><span>in</span></a>
              {/* Hidden until accounts are created */}
              {/* <a href="https://facebook.com/gwingstech" className="social-link" target="_blank" rel="noopener noreferrer"><span>f</span></a> */}
              {/* <a href="https://instagram.com/gwingstech" className="social-link" target="_blank" rel="noopener noreferrer"><span>ig</span></a> */}
              {/* <a href="https://twitter.com/gwingstech" className="social-link" target="_blank" rel="noopener noreferrer"><span>tw</span></a> */}
              {/* <a href="https://youtube.com/gwingstech" className="social-link" target="_blank" rel="noopener noreferrer"><span>yt</span></a> */}
            </div>
          </div>
        </div>
      </footer>
      
      {/* Success Modal */}
      {showSuccessModal && (
        <div className="success-modal-overlay" onClick={() => setShowSuccessModal(false)}>
          <div className="success-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="success-close-btn" onClick={() => setShowSuccessModal(false)}>×</button>
            
            <div className="success-animation">
              <div className="success-checkmark">
                <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                  <circle className="checkmark-circle" cx="26" cy="26" r="25" fill="none"/>
                  <path className="checkmark-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
                </svg>
              </div>
            </div>
            
            <div className="success-content">
              <h2 className="success-title">Message Sent Successfully!</h2>
              <p className="success-subtitle">Thank you for reaching out to Wings</p>
              
              <div className="success-details">
                <div className="success-item">
                  <span className="success-icon">⚡</span>
                  <span>We'll respond within 24 hours</span>
                </div>
                <div className="success-item">
                  <span className="success-icon">📧</span>
                  <span>Check your email for confirmation</span>
                </div>
                <div className="success-item">
                  <span className="success-icon">🚀</span>
                  <span>Let's build something amazing together</span>
                </div>
              </div>
              
              <div className="success-actions">
                <button 
                  className="success-btn primary" 
                  onClick={() => setShowSuccessModal(false)}
                >
                  Continue Exploring
                </button>
                <button 
                  className="success-btn secondary" 
                  onClick={() => {
                    setShowSuccessModal(false);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                >
                  Back to Top
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* FAQ Modal */}
      <Modal 
        isOpen={showFaqModal} 
        onClose={() => setShowFaqModal(false)}
        title="Frequently Asked Questions"
      >
        <div className="faq-content">
          {faqsData.map((faq, index) => (
            <div key={faq.id} className="faq-item">
              <button 
                className="faq-question"
                onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
              >
                {faq.question}
                <span className={`faq-icon ${openFaqIndex === index ? 'open' : ''}`}>+</span>
              </button>
              <div className={`faq-answer ${openFaqIndex === index ? 'open' : ''}`}>
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </Modal>
      
      {/* About Modal */}
      <Modal 
        isOpen={showAboutModal} 
        onClose={() => setShowAboutModal(false)}
        title={aboutData.title}
      >
        <div className="about-content">
          <p className="about-description">{aboutData.description}</p>
          
          <div className="about-mission">
            <p>{aboutData.mission}</p>
          </div>
          
          <div className="about-values">
            {aboutData.values.map((value, index) => (
              <div key={index} className="value-item">
                <div className="value-title">{value.title}</div>
                <div className="value-description">{value.description}</div>
              </div>
            ))}
          </div>
          
          <div className="about-stats">
            <div className="stat-item">
              <div className="stat-number">{aboutData.stats.projects}</div>
              <div className="stat-label">Projects</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">{aboutData.stats.countries}</div>
              <div className="stat-label">Countries</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">{aboutData.stats.rating}</div>
              <div className="stat-label">Rating</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">{aboutData.stats.experience}</div>
              <div className="stat-label">Experience</div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default CTASection;