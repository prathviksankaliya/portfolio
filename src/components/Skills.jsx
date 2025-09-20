import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Tilt from 'react-parallax-tilt';
import { 
  FaReact, FaAndroid, FaApple, FaGitAlt, FaDocker,
  FaNodeJs, FaPython, FaJava, FaHtml5, FaCss3Alt,
  FaJsSquare, FaDatabase, FaAws, FaGithub, FaPaintBrush, FaCode
} from 'react-icons/fa';
import { 
  SiFlutter, SiKotlin, SiFirebase, SiXcode, SiAndroidstudio,
  SiTypescript, SiDart, SiSwift, SiReact, SiRedux, SiGraphql,
  SiMongodb, SiPostgresql, SiTailwindcss, SiNextdotjs, SiExpo,
  SiPostman, SiFigma, SiSketch
} from 'react-icons/si';
import './Skills.css';

const Skills = ({ skills }) => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const [activeCategory, setActiveCategory] = useState('all');

  // Technology data with logos - Mobile focused
  const technologies = {
    mobile: [
      { name: 'Swift', icon: SiSwift, color: '#FA7343', category: 'iOS' },
      { name: 'SwiftUI', icon: FaApple, color: '#000000', category: 'iOS' },
      { name: 'Xcode', icon: SiXcode, color: '#1575F9', category: 'iOS' },
      { name: 'Kotlin', icon: SiKotlin, color: '#7F52FF', category: 'Android' },
      { name: 'Android Studio', icon: SiAndroidstudio, color: '#3DDC84', category: 'Android' },
      { name: 'Java', icon: FaJava, color: '#007396', category: 'Android' },
      { name: 'Flutter', icon: SiFlutter, color: '#02569B', category: 'Cross-Platform' },
      { name: 'Dart', icon: SiDart, color: '#0175C2', category: 'Cross-Platform' },
    ],
    frontend: [
      { name: 'React', icon: SiReact, color: '#61DAFB' },
      { name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
      { name: 'JavaScript', icon: FaJsSquare, color: '#F7DF1E' },
      { name: 'HTML5', icon: FaHtml5, color: '#E34C26' },
      { name: 'CSS3', icon: FaCss3Alt, color: '#1572B6' },
      { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#06B6D4' },
      { name: 'Next.js', icon: SiNextdotjs, color: '#000000' },
      { name: 'Redux', icon: SiRedux, color: '#764ABC' },
    ],
    backend: [
      { name: 'Node.js', icon: FaNodeJs, color: '#339933' },
      { name: 'Firebase', icon: SiFirebase, color: '#FFCA28' },
      { name: 'MongoDB', icon: SiMongodb, color: '#47A248' },
      { name: 'PostgreSQL', icon: SiPostgresql, color: '#4169E1' },
      { name: 'GraphQL', icon: SiGraphql, color: '#E10098' },
      { name: 'Python', icon: FaPython, color: '#3776AB' },
      { name: 'Java', icon: FaJava, color: '#007396' },
    ],
    tools: [
      { name: 'Git', icon: FaGitAlt, color: '#F05032' },
      { name: 'GitHub', icon: FaGithub, color: '#181717' },
      { name: 'Docker', icon: FaDocker, color: '#2496ED' },
      { name: 'AWS', icon: FaAws, color: '#FF9900' },
      { name: 'VS Code', icon: FaCode, color: '#007ACC' },
      { name: 'Postman', icon: SiPostman, color: '#FF6C37' },
      { name: 'Figma', icon: SiFigma, color: '#F24E1E' },
      { name: 'Sketch', icon: SiSketch, color: '#F7B500' },
    ]
  };

  const categories = [
    { id: 'all', label: 'All Technologies' },
    { id: 'mobile', label: 'Mobile Development' },
    { id: 'frontend', label: 'Frontend' },
    { id: 'backend', label: 'Backend & Database' },
    { id: 'tools', label: 'Tools & Design' }
  ];

  const getFilteredTechnologies = () => {
    if (activeCategory === 'all') {
      return [...technologies.mobile, ...technologies.frontend, ...technologies.backend, ...technologies.tools];
    }
    return technologies[activeCategory] || [];
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
          {categories.map((category) => (
            <motion.button
              key={category.id}
              className={`category-btn ${activeCategory === category.id ? 'active' : ''}`}
              onClick={() => setActiveCategory(category.id)}
              whileHover={{ scale: activeCategory === category.id ? 1.05 : 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            >
              {category.label}
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
          {getFilteredTechnologies().map((tech, index) => (
            <Tilt key={`${tech.name}-${index}`} tiltMaxAngleX={10} tiltMaxAngleY={10}>
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
                  style={{ color: tech.color }}
                  whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  {React.createElement(tech.icon)}
                </motion.div>
                <h3 className="tech-name">{tech.name}</h3>
                {tech.category && (
                  <span className="tech-category">{tech.category}</span>
                )}
              </motion.div>
            </Tilt>
          ))}
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