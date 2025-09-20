import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Tilt from 'react-parallax-tilt';
import { FaApple, FaGooglePlay, FaGithub, FaStar, FaDownload, FaExpand, FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { getDemoProjectImage, getDemoPhoneImage } from '../utils/generateDemoImages';
import './Projects.css';

const Projects = ({ projects }) => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const [selectedProject, setSelectedProject] = useState(null);
  const [filter, setFilter] = useState('All');
  const [projectImages, setProjectImages] = useState({});
  const [fullscreenImage, setFullscreenImage] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

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

  const platforms = ['All', 'iOS', 'Android', 'Cross-Platform', 'Flutter'];
  
  const filteredProjects = filter === 'All' 
    ? projects?.projects || []
    : projects?.projects?.filter(p => p.category === filter || p.platform?.includes(filter)) || [];

  // Fullscreen image handlers
  const openFullscreenImage = (imageUrl, index) => {
    setFullscreenImage({ url: imageUrl, index });
    setCurrentImageIndex(index);
  };

  const closeFullscreenImage = () => {
    setFullscreenImage(null);
  };

  const navigateFullscreenImage = (direction) => {
    if (!selectedProject || !fullscreenImage) return;
    
    const images = selectedProject.screenshots || projectImages[selectedProject.id]?.screenshots || [];
    let newIndex = fullscreenImage.index;
    
    if (direction === 'prev') {
      newIndex = newIndex > 0 ? newIndex - 1 : images.length - 1;
    } else {
      newIndex = newIndex < images.length - 1 ? newIndex + 1 : 0;
    }
    
    setFullscreenImage({ url: images[newIndex], index: newIndex });
    setCurrentImageIndex(newIndex);
  };

  // Generate demo images for projects
  useEffect(() => {
    const images = {};
    projects?.projects?.forEach((project, index) => {
      images[project.id] = {
        main: getDemoProjectImage(project.title, index),
        phone: getDemoPhoneImage(project.title, index),
        screenshots: [
          getDemoPhoneImage(`${project.title} - Screen 1`, index),
          getDemoPhoneImage(`${project.title} - Screen 2`, index + 1),
          getDemoPhoneImage(`${project.title} - Screen 3`, index + 2),
          getDemoPhoneImage(`${project.title} - Screen 4`, index + 3),
          getDemoPhoneImage(`${project.title} - Screen 5`, index + 4),
        ]
      };
    });
    setProjectImages(images);
  }, [projects]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05, // Reduced from 0.1
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
    <div className="projects" ref={ref}>
      <motion.div
        className="projects-container"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
      >
        <motion.div className="section-header" variants={itemVariants}>
          <span className="section-subtitle">My Portfolio</span>
          <h2 className="section-title">Personal Projects</h2>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div className="filter-buttons" variants={itemVariants}>
          {platforms.map((platform) => (
            <motion.button
              key={platform}
              className={`filter-btn ${filter === platform ? 'active' : ''}`}
              onClick={() => setFilter(platform)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {platform}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div className="projects-grid" variants={containerVariants}>
          {filteredProjects.map((project, index) => (
            <Tilt 
              key={project.id} 
              tiltMaxAngleX={5} 
              tiltMaxAngleY={5}
              perspective={1000}
              glareEnable={false} // Disabled glare for performance
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
                  <div className="modal-images-container">
                    <div className="modal-images">
                      {(selectedProject.screenshots || projectImages[selectedProject.id]?.screenshots)?.map((img, i) => (
                        <div 
                          key={i} 
                          className="modal-image-slide"
                          onClick={() => openFullscreenImage(img, i)}
                        >
                          <img src={img} alt={`Screenshot ${i + 1}`} />
                        </div>
                      ))}
                    </div>
                    {(selectedProject.screenshots || projectImages[selectedProject.id]?.screenshots)?.length > 1 && (
                      <div className="image-indicators">
                        {(selectedProject.screenshots || projectImages[selectedProject.id]?.screenshots)?.map((_, i) => (
                          <span 
                            key={i} 
                            className="indicator-dot"
                            onClick={() => {
                              const container = document.querySelector('.modal-images');
                              const slideWidth = container.querySelector('.modal-image-slide').offsetWidth;
                              container.scrollTo({ left: slideWidth * i, behavior: 'smooth' });
                            }}
                          />
                        ))}
                      </div>
                    )}
                  </div>

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

      {/* Fullscreen Image Viewer */}
      <AnimatePresence>
        {fullscreenImage && (
          <motion.div
            className="image-viewer-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeFullscreenImage}
          >
            <div className="image-viewer-container" onClick={(e) => e.stopPropagation()}>
              <button 
                className="image-viewer-close" 
                onClick={closeFullscreenImage}
              >
                <FaTimes />
              </button>
              
              {(selectedProject?.screenshots || projectImages[selectedProject?.id]?.screenshots)?.length > 1 && (
                <>
                  <button 
                    className="image-viewer-nav image-viewer-prev"
                    onClick={() => navigateFullscreenImage('prev')}
                  >
                    <FaChevronLeft />
                  </button>
                  
                  <button 
                    className="image-viewer-nav image-viewer-next"
                    onClick={() => navigateFullscreenImage('next')}
                  >
                    <FaChevronRight />
                  </button>
                </>
              )}
              
              <motion.img
                key={fullscreenImage.url}
                src={fullscreenImage.url}
                alt={`Screenshot ${fullscreenImage.index + 1}`}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.2 }}
              />
              
              <div className="image-viewer-caption">
                {fullscreenImage.index + 1} / {(selectedProject?.screenshots || projectImages[selectedProject?.id]?.screenshots)?.length || 0}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Projects;