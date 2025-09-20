import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  FaCode, FaMobileAlt, FaRocket, FaLightbulb, 
  FaTrophy, FaUsers, FaCoffee, FaBriefcase,
  FaProjectDiagram, FaTools, FaGitAlt, FaDownload,
  FaHandshake, FaBug
} from 'react-icons/fa';
import './About.css';

const About = ({ profile }) => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  const getStatIcon = (iconType, index) => {
    switch(iconType) {
      case 'experience': return <FaBriefcase />;
      case 'apps': return <FaMobileAlt />;
      case 'projects': return <FaProjectDiagram />;
      case 'tech': return <FaTools />;
      default:
        const icons = [<FaCode />, <FaMobileAlt />, <FaUsers />, <FaCoffee />];
        return icons[index] || <FaCode />;
    }
  };

  const getJourneyIcon = (label) => {
    if (label.includes('Code')) return <FaGitAlt />;
    if (label.includes('Download')) return <FaDownload />;
    if (label.includes('Team')) return <FaHandshake />;
    if (label.includes('Problem')) return <FaBug />;
    return <FaCode />;
  };

  return (
    <div className="about" ref={ref}>
      <motion.div
        className="about-container"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
      >
        <motion.div className="section-header" variants={itemVariants}>
          <span className="section-subtitle">Get To Know Me</span>
          <h2 className="section-title">About Me</h2>
        </motion.div>

        <div className="about-content">
          {/* Left Side - Only Description */}
          <motion.div className="about-text" variants={itemVariants}>
            <p className="about-description">
              {profile?.about?.description}
            </p>
          </motion.div>

          {/* Right Side - Highlights and Stats Cards Only */}
          <motion.div className="about-cards" variants={itemVariants}>
            {/* Highlights Cards */}
            <div className="highlights-grid">
              {profile?.about?.highlights?.map((highlight, index) => (
                <motion.div
                  key={index}
                  className="highlight-card"
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <span className="highlight-icon">
                    {index === 0 && <FaCode />}
                    {index === 1 && <FaLightbulb />}
                    {index === 2 && <FaRocket />}
                    {index === 3 && <FaTrophy />}
                  </span>
                  <span className="highlight-text">{highlight}</span>
                </motion.div>
              ))}
            </div>

            {/* Primary Stats Grid */}
            <div className="stats-grid">
              {profile?.about?.stats?.map((stat, index) => (
                <motion.div
                  key={index}
                  className="stat-card-simple"
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <div className="stat-icon-simple">
                    {getStatIcon(stat.icon, index)}
                  </div>
                  <div className="stat-content-simple">
                    <span className="stat-value">{stat.value}{stat.suffix}</span>
                    <span className="stat-label">{stat.label}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default About;