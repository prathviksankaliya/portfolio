import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaBriefcase, FaCalendar, FaMapMarkerAlt } from 'react-icons/fa';
import './Experience.css';

const Experience = ({ experience }) => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

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
    <div className="experience" ref={ref}>
      <motion.div
        className="experience-container"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
      >
        <motion.div className="section-header" variants={itemVariants}>
          <span className="section-subtitle">Professional Journey</span>
          <h2 className="section-title">Work Experience</h2>
        </motion.div>

        <div className="experience-content">
          {experience?.experiences?.map((exp) => (
            <motion.div
              key={exp.id}
              className="experience-card"
              variants={itemVariants}
              whileHover={{ 
                scale: 1.01,
                transition: { duration: 0.2 }
              }}
            >
              <div className="experience-header">
                <div className="experience-icon">
                  <FaBriefcase />
                </div>
                <div className="experience-info">
                  <h4 className="experience-title">{exp.position}</h4>
                  <h5 className="company-name">{exp.company}</h5>
                  <div className="experience-meta">
                    <span className="experience-duration">
                      <FaCalendar /> {exp.duration}
                    </span>
                    <span className="experience-location">
                      <FaMapMarkerAlt /> {exp.location}
                    </span>
                  </div>
                </div>
              </div>

              <p className="experience-description">{exp.description}</p>

              {exp.responsibilities && exp.responsibilities.length > 0 && (
                <div className="experience-achievements">
                  <h6>Key Achievements:</h6>
                  <ul>
                    {exp.responsibilities.map((resp, index) => (
                      <li key={index}>{resp}</li>
                    ))}
                  </ul>
                </div>
              )}

              {exp.technologies && exp.technologies.length > 0 && (
                <div className="experience-technologies">
                  <h6>Technologies Used:</h6>
                  <div className="technology-tags">
                    {exp.technologies.map((tech, index) => (
                      <span key={index} className="tech-tag">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Background Elements */}
        <div className="experience-bg-elements">
          <div className="bg-element element-1" />
          <div className="bg-element element-2" />
        </div>
      </motion.div>
    </div>
  );
};

export default Experience;