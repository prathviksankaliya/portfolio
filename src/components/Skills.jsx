import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Tilt from 'react-parallax-tilt';
import * as FaIcons from 'react-icons/fa';
import * as SiIcons from 'react-icons/si';
import skillsData from '../data/skills.json';
import './Skills.css';

const Skills = ({ skills }) => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const [activeCategory, setActiveCategory] = useState('All');

  // Icon mapping function
  const getIconComponent = (iconName) => {
    // Check if it's a Font Awesome icon (starts with Fa)
    if (iconName && iconName.startsWith('Fa')) {
      return FaIcons[iconName] || FaIcons.FaCode;
    }
    // Check if it's a Simple Icons icon (starts with Si)
    if (iconName && iconName.startsWith('Si')) {
      return SiIcons[iconName] || FaIcons.FaCode;
    }
    // Default fallback icon
    return FaIcons.FaCode;
  };

  // Filter skills based on active category
  const getFilteredSkills = () => {
    if (activeCategory === 'All') {
      return skillsData.skills || [];
    }
    return (skillsData.skills || []).filter(skill => skill.category === activeCategory);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
      },
    },
  };

  return (
    <div className="skills" ref={ref}>
      <motion.div
        className="skills-container"
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
      >
        <motion.div className="section-header" variants={itemVariants}>
          <span className="section-subtitle">Technical Stack</span>
          <h2 className="section-title">Skills & Technologies</h2>
        </motion.div>

        {/* Category Filter */}
        <motion.div className="category-filter" variants={itemVariants}>
          {skillsData.categories.map((category) => (
            <motion.button
              key={category}
              className={`category-btn ${activeCategory === category ? 'active' : ''}`}
              onClick={() => setActiveCategory(category)}
              whileHover={{ scale: activeCategory === category ? 1.05 : 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Technology Cards Grid */}
        <motion.div
          className="tech-cards-grid"
          variants={containerVariants}
          key={activeCategory}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          {getFilteredSkills().map((skill, index) => {
            const IconComponent = getIconComponent(skill.icon);
            return (
              <Tilt key={`${skill.name}-${index}`} tiltMaxAngleX={10} tiltMaxAngleY={10}>
                <motion.div
                  className="tech-card"
                  variants={itemVariants}
                  whileHover={{ 
                    y: -5,
                    transition: { duration: 0.2 }
                  }}
                >
                  <motion.div 
                    className="tech-icon-wrapper"
                    style={{ color: skill.color }}
                    whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    {React.createElement(IconComponent)}
                  </motion.div>
                  <h3 className="tech-name">{skill.name}</h3>
                  <span className="tech-category">{skill.category}</span>
                </motion.div>
              </Tilt>
            );
          })}
        </motion.div>

        {/* Background Elements - Static */}
        <div className="skills-bg-elements">
          <div className="bg-element element-1" />
          <div className="bg-element element-2" />
        </div>
      </motion.div>
    </div>
  );
};

export default Skills;