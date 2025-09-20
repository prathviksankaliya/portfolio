import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaGraduationCap, FaAward, FaCertificate, FaExternalLinkAlt, FaMapMarkerAlt, FaCalendarAlt } from 'react-icons/fa';
import './Education.css';

const Education = ({ education }) => {
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
    hidden: { y: 50, opacity: 0 },
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
    <div className="education" ref={ref}>
      <motion.div
        className="education-container"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
      >
        <motion.div className="section-header" variants={itemVariants}>
          <span className="section-subtitle">Academic Background</span>
          <h2 className="section-title">Education & Certifications</h2>
        </motion.div>

        {/* Education Section */}
        <div className="education-content">
          <motion.div className="education-degrees" variants={itemVariants}>
            <h3 className="subsection-title">
              <FaGraduationCap /> Education
            </h3>
            {education?.education?.map((edu) => (
              <motion.div
                key={edu.id}
                className="degree-card"
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
              >
                <div className="degree-header">
                  <div className="degree-icon">
                    <FaGraduationCap />
                  </div>
                  <div className="degree-info">
                    <h4 className="degree-title">{edu.degree}</h4>
                    <h5 className="institution-name">{edu.institution}</h5>
                    <div className="degree-meta">
                      <span className="degree-duration">
                        <FaCalendarAlt /> {edu.duration}
                      </span>
                      <span className="degree-location">
                        <FaMapMarkerAlt /> {edu.location}
                      </span>
                      {edu.gpa && (
                        <span className="degree-gpa">
                          <FaAward /> GPA: {edu.gpa}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {edu.achievements && edu.achievements.length > 0 && (
                  <div className="degree-achievements">
                    <h6>Key Achievements:</h6>
                    <ul>
                      {edu.achievements.map((achievement, index) => (
                        <li key={index}>{achievement}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {edu.coursework && edu.coursework.length > 0 && (
                  <div className="degree-coursework">
                    <h6>Relevant Coursework:</h6>
                    <div className="coursework-tags">
                      {edu.coursework.map((course, index) => (
                        <span key={index} className="course-tag">
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>

          {/* Certifications Section */}
          {education?.certifications && education.certifications.length > 0 && (
            <motion.div className="education-certifications" variants={itemVariants}>
              <h3 className="subsection-title">
                <FaCertificate /> Professional Certifications
              </h3>
              <div className="certifications-grid">
                {education.certifications.map((cert) => (
                  <motion.div
                    key={cert.id}
                    className="certification-card"
                    variants={itemVariants}
                    whileHover={{ y: -5 }}
                  >
                    <div className="cert-icon">
                      <FaCertificate />
                    </div>
                    <h4 className="cert-name">{cert.name}</h4>
                    <p className="cert-issuer">{cert.issuer}</p>
                    <div className="cert-meta">
                      {cert.credentialId && (
                        <span className="cert-id">ID: {cert.credentialId}</span>
                      )}
                    </div>
                    {cert.url && (
                      <a
                        href={cert.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="cert-link"
                      >
                        View Certificate <FaExternalLinkAlt />
                      </a>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </div>

        {/* Background Elements */}
        <div className="education-bg-elements">
          <div className="bg-element element-1" />
          <div className="bg-element element-2" />
        </div>
      </motion.div>
    </div>
  );
};

export default Education;