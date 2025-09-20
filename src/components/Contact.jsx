import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaGithub, FaLinkedin, FaPaperPlane, FaGooglePlay, FaCheckCircle, FaExclamationCircle, FaMediumM } from 'react-icons/fa';
import emailjs from '@emailjs/browser';
import './Contact.css';

const Contact = ({ profile }) => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' or 'error'
  const formRef = useRef();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    // EmailJS configuration
    // You'll need to sign up at https://www.emailjs.com/ and get these values
    const SERVICE_ID = 'service_portfolio'; // Replace with your EmailJS service ID
    const TEMPLATE_ID = 'template_portfolio'; // Replace with your EmailJS template ID
    const PUBLIC_KEY = 'YOUR_PUBLIC_KEY'; // Replace with your EmailJS public key
    
    // Prepare template parameters
    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      subject: formData.subject,
      message: formData.message,
      to_email: 'prathviksankaliya@gmail.com',
    };
    
    try {
      // If EmailJS is not configured, fall back to mailto
      if (PUBLIC_KEY === 'YOUR_PUBLIC_KEY') {
        // Fallback to mailto
        const mailtoLink = `mailto:prathviksankaliya@gmail.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(`From: ${formData.name} (${formData.email})\n\n${formData.message}`)}`;
        window.location.href = mailtoLink;
        
        setTimeout(() => {
          setFormData({ name: '', email: '', subject: '', message: '' });
          setIsSubmitting(false);
          setSubmitStatus('success');
        }, 1000);
      } else {
        // Send email using EmailJS
        await emailjs.send(
          SERVICE_ID,
          TEMPLATE_ID,
          templateParams,
          PUBLIC_KEY
        );
        
        setFormData({ name: '', email: '', subject: '', message: '' });
        setSubmitStatus('success');
        
        // Hide success message after 5 seconds
        setTimeout(() => {
          setSubmitStatus(null);
        }, 5000);
      }
    } catch (error) {
      console.error('Failed to send email:', error);
      setSubmitStatus('error');
      
      // Hide error message after 5 seconds
      setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, // Reduced from 0.2
        duration: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 }, // Reduced from 50
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.3, // Fixed duration instead of spring
        ease: 'easeOut',
      },
    },
  };

  return (
    <div className="contact" ref={ref}>
      <motion.div
        className="contact-container"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
      >
        <motion.div className="section-header" variants={itemVariants}>
          <span className="section-subtitle">Get In Touch</span>
          <h2 className="section-title">Let's Connect</h2>
        </motion.div>

        <div className="contact-content">
          <motion.div className="contact-info" variants={itemVariants}>
            <h3>Want to chat about mobile development?</h3>
            <p>I'm always excited to discuss new technologies, share knowledge, and connect with fellow developers!</p>

            <div className="contact-details">
              {profile?.personal?.email && (
                <motion.a
                  href={`mailto:${profile.personal.email}`}
                  className="contact-item"
                  whileHover={{ x: 5, transition: { duration: 0.2 } }}
                >
                  <FaEnvelope />
                  <span>{profile.personal.email}</span>
                </motion.a>
              )}
              
              {profile?.personal?.phone && (
                <motion.a
                  href={`tel:${profile.personal.phone}`}
                  className="contact-item"
                  whileHover={{ x: 5, transition: { duration: 0.2 } }}
                >
                  <FaPhone />
                  <span>{profile.personal.phone}</span>
                </motion.a>
              )}
              
              {profile?.personal?.location && (
                <motion.div
                  className="contact-item"
                  whileHover={{ x: 5, transition: { duration: 0.2 } }}
                >
                  <FaMapMarkerAlt />
                  <span>{profile.personal.location}</span>
                </motion.div>
              )}
            </div>

            <div className="social-section">
              <h4>Follow my journey</h4>
              <div className="social-links">
                {profile?.social?.github && (
                  <motion.a
                    href={profile.social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link"
                    whileHover={{ y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    title="GitHub"
                  >
                    <FaGithub />
                  </motion.a>
                )}
                {profile?.social?.linkedin && (
                  <motion.a
                    href={profile.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link"
                    whileHover={{ y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    title="LinkedIn"
                  >
                    <FaLinkedin />
                  </motion.a>
                )}
                {profile?.social?.medium && (
                  <motion.a
                    href={profile.social.medium}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link"
                    whileHover={{ y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    title="Medium"
                  >
                    <FaMediumM />
                  </motion.a>
                )}
              </div>
            </div>

            {profile?.social?.playstore && (
              <div className="app-stores">
                <h4>Check out my published apps</h4>
                <div className="store-links">
                  <motion.a
                    href={profile.social.playstore}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="store-link"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaGooglePlay />
                    <div>
                      <span className="store-small">View on</span>
                      <span className="store-large">Google Play</span>
                    </div>
                  </motion.a>
                </div>
              </div>
            )}
          </motion.div>

          <motion.div className="contact-form-wrapper" variants={itemVariants}>
            <form ref={formRef} className="contact-form" onSubmit={handleSubmit}>
              <h3>Send me a message</h3>
              
              {/* Success/Error Messages */}
              {submitStatus === 'success' && (
                <motion.div 
                  className="form-message success"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                >
                  <FaCheckCircle />
                  <span>Message sent successfully! I'll get back to you soon.</span>
                </motion.div>
              )}
              
              {submitStatus === 'error' && (
                <motion.div 
                  className="form-message error"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                >
                  <FaExclamationCircle />
                  <span>Failed to send message. Please try again or email directly.</span>
                </motion.div>
              )}
              <div className="form-group">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                <motion.div
                  className="input-line"
                  initial={{ scaleX: 0 }}
                  whileFocus={{ scaleX: 1 }}
                />
              </div>

              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <motion.div
                  className="input-line"
                  initial={{ scaleX: 0 }}
                  whileFocus={{ scaleX: 1 }}
                />
              </div>

              <div className="form-group">
                <input
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
                <motion.div
                  className="input-line"
                  initial={{ scaleX: 0 }}
                  whileFocus={{ scaleX: 1 }}
                />
              </div>

              <div className="form-group">
                <textarea
                  name="message"
                  placeholder="Your Message"
                  rows="6"
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
                <motion.div
                  className="input-line"
                  initial={{ scaleX: 0 }}
                  whileFocus={{ scaleX: 1 }}
                />
              </div>

              <motion.button
                type="submit"
                className="submit-btn"
                disabled={isSubmitting}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isSubmitting ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  >
                    ⏳
                  </motion.div>
                ) : (
                  <>
                    <FaPaperPlane /> Send Message
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>

        {/* Animated Background - Simplified for performance */}
        <div className="contact-bg">
          <div className="bg-circle circle-1" />
          <div className="bg-circle circle-2" />
        </div>
      </motion.div>
    </div>
  );
};

export default Contact;