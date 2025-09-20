import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Tilt from 'react-parallax-tilt';
import { FaApple, FaGooglePlay, FaGithub, FaStar, FaExpand, FaTimes } from 'react-icons/fa';
import { getDemoProjectImage, getDemoPhoneImage } from '../utils/generateDemoImages';
import './Projects.css';

const Projects = ({ projects }) => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const [selectedProject, setSelectedProject] = useState(null);
  const [projectImages, setProjectImages] = useState({});

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedProject]);

  const filteredProjects = projects?.projects || [];

  // Generate demo images for projects
  useEffect(() => {
    const images = {};
    projects?.projects?.forEach((project, index) => {
      images[project.id] = {
        main: getDemoProjectImage(project.title, index),
        phone: getDemoPhoneImage(project.title, index)
      };
    });
    setProjectImages(images);
  }, [projects]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        duration: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: 'easeOut',
      },
    },
  };

  return (
    <div className="projects" ref={ref}>
      <motion.div
        className="projects-container"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
      >
        <motion.div className="section-header" variants={itemVariants}>
          <span className="section-subtitle">My Portfolio</span>
          <h2 className="section-title">Projects</h2>
        </motion.div>

        {/* Projects Grid */}
        <motion.div className="projects-grid" variants={containerVariants}>
          {filteredProjects.map((project, index) => (
            <Tilt 
              key={project.id} 
              tiltMaxAngleX={5} 
              tiltMaxAngleY={5}
              perspective={1000}
              glareEnable={false}
              transitionSpeed={2000}
            >
              <motion.div
                className="project-card"
                variants={itemVariants}
                whileHover={{ 
                  y: -5,
                  transition: {
                    duration: 0.2,
                    ease: "easeOut"
                  }
                }}
                onClick={() => setSelectedProject(project)}
              >
                <div className="project-image">
                  <img 
                    src={project.image || projectImages[project.id]?.main} 
                    alt={project.title} 
                  />
                  <div className="project-overlay">
                    <motion.button
                      className="view-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedProject(project);
                      }}
                      whileHover={{ scale: 1.2, rotate: 180 }}
                      whileTap={{ scale: 0.9 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <FaExpand />
                    </motion.button>
                  </div>
                  {project.featured && (
                    <div className="featured-badge">
                      <FaStar /> Personal Favorite
                    </div>
                  )}
                </div>

                <div className="project-content">
                  <div className="project-header">
                    <h3>{project.title}</h3>
                    <div className="project-platforms">
                      {project.platform?.map((p, i) => (
                        <span key={i} className="platform-tag">{p}</span>
                      ))}
                    </div>
                  </div>

                  <p className="project-description">{project.description}</p>

                  <div className="project-tech">
                    {project.technologies?.slice(0, 3).map((tech, i) => (
                      <span key={i} className="tech-tag">{tech}</span>
                    ))}
                    {project.technologies?.length > 3 && (
                      <span className="tech-tag">+{project.technologies.length - 3}</span>
                    )}
                  </div>

                  <div className="project-links">
                    {project.appStoreUrl && (
                      <motion.a
                        href={project.appStoreUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-link"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <FaApple />
                      </motion.a>
                    )}
                    {project.playStoreUrl && (
                      <motion.a
                        href={project.playStoreUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-link"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <FaGooglePlay />
                      </motion.a>
                    )}
                    {project.githubUrl && (
                      <motion.a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-link"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <FaGithub />
                      </motion.a>
                    )}
                  </div>
                </div>
              </motion.div>
            </Tilt>
          ))}
        </motion.div>
      </motion.div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="project-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              className="project-modal"
              initial={{ scale: 0.5, opacity: 0, y: 100 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.5, opacity: 0, y: 100 }}
              transition={{ 
                type: "spring", 
                stiffness: 300,
                damping: 25
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="modal-close"
                onClick={() => setSelectedProject(null)}
              >
                <FaTimes />
              </button>

              <div className="modal-content">
                <div className="modal-header">
                  <h2>{selectedProject.title}</h2>
                </div>

                <div className="modal-body">
                  <div className="modal-info">
                    <h3>About This Project</h3>
                    <p>{selectedProject.longDescription || selectedProject.description}</p>

                    {selectedProject.features && (
                      <>
                        <h3>Key Features</h3>
                        <ul className="features-list">
                          {selectedProject.features.map((feature, i) => (
                            <li key={i}>{feature}</li>
                          ))}
                        </ul>
                      </>
                    )}

                    <h3>Technologies Used</h3>
                    <div className="modal-tech">
                      {selectedProject.technologies?.map((tech, i) => (
                        <span key={i} className="tech-tag">{tech}</span>
                      ))}
                    </div>

                    <div className="modal-links">
                      {selectedProject.appStoreUrl && (
                        <a
                          href={selectedProject.appStoreUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="modal-link app-store"
                        >
                          <FaApple /> App Store
                        </a>
                      )}
                      {selectedProject.playStoreUrl && (
                        <a
                          href={selectedProject.playStoreUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="modal-link play-store"
                        >
                          <FaGooglePlay /> Google Play
                        </a>
                      )}
                      {selectedProject.githubUrl && (
                        <a
                          href={selectedProject.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="modal-link github"
                        >
                          <FaGithub /> Source Code
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Projects;