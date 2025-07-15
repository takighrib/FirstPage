// src/components/CTASection.js
import React, { useState } from 'react';
import './CTASection.css';

const CTASection = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
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
        alert('Message sent successfully!');
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
                <span>sales@gwings.tech</span>
              </div>
              <div className="contact-item">
                <span className="contact-icon">📞</span>
                <span>+216 25 420 749</span>
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
                <li>Who Are We</li>
                <li>FAQs</li>
              </ul>
            </div>
            <div className="footer-column">
              <h4>Services</h4>
              <ul>
                <li>sales@gwings.tech</li>
                <li>+216 25 420 749</li>
              </ul>
            </div>
          </div>
          <div className="footer-right">
            <div className="footer-logo">
              <img src="/assets/logo.svg" alt="Atungs" className="logo-img" />
              <span className="logo-text">Atungs</span>
            </div>
            <div className="footer-social">
              <a href="https://linkedin.com" className="social-link" target="_blank" rel="noopener noreferrer"><span>in</span></a>
              <a href="https://facebook.com" className="social-link" target="_blank" rel="noopener noreferrer"><span>f</span></a>
              <a href="https://instagram.com" className="social-link" target="_blank" rel="noopener noreferrer"><span>ig</span></a>
              <a href="https://twitter.com" className="social-link" target="_blank" rel="noopener noreferrer"><span>tw</span></a>
              <a href="https://youtube.com" className="social-link" target="_blank" rel="noopener noreferrer"><span>yt</span></a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default CTASection;