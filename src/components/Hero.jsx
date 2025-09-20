import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Typed from 'typed.js';
import { FaApple, FaGithub, FaMobileAlt, FaFileDownload } from 'react-icons/fa';
import { 
  SiFlutter, SiKotlin, SiSwift, SiAndroid, SiFirebase, SiDart, 
  SiXcode, SiAndroidstudio, SiGradle, SiCocoapods, SiSqlite
} from 'react-icons/si';
import './Hero.css';

const Hero = ({ profile }) => {
  const typedRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const typed = new Typed(typedRef.current, {
      strings: profile?.personal?.roles || ['Mobile Developer', 'iOS Specialist', 'Android Expert', 'Flutter Developer'],
      typeSpeed: 50,
      backSpeed: 30,
      loop: true,
      backDelay: 2000,
    });

    return () => typed.destroy();
  }, [profile]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
  };

  const floatAnimation = {
    y: [0, -20, 0],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  return (
    <div className="hero">
      <div className="hero-background">
        <div className="gradient-sphere sphere-1" />
        <div className="gradient-sphere sphere-2" />
        <div className="gradient-sphere sphere-3" />
      </div>

      <motion.div
        className="hero-container"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="hero-content">
          <motion.div className="hero-badge" variants={itemVariants}>
            <span className="badge-icon">📱</span>
            <span>{profile?.personal?.title || 'Mobile Developer'}</span>
          </motion.div>

          <motion.h1 className="hero-title" variants={itemVariants}>
            Hi, I'm <span className="gradient-text gradient-text-animated">{profile?.personal?.name}</span>
          </motion.h1>

          <motion.div className="hero-subtitle" variants={itemVariants}>
            <span>I'm a </span>
            <span className="typed-text" ref={typedRef}></span>
          </motion.div>

          <motion.p className="hero-description" variants={itemVariants}>
            {profile?.personal?.tagline}
          </motion.p>

          <motion.div className="hero-stats" variants={itemVariants}>
            {profile?.about?.stats?.map((stat, index) => (
              <motion.div
                key={index}
                className="stat-item"
                whileHover={!isMobile ? { scale: 1.05 } : {}}
                whileTap={{ scale: 0.95 }}
              >
                <span className="stat-value">{stat.value}{stat.suffix}</span>
                <span className="stat-label">{stat.label}</span>
              </motion.div>
            ))}
          </motion.div>

          <motion.div className="hero-buttons" variants={itemVariants}>
            <motion.a
              href={profile?.resume || '/resume.pdf'}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              whileHover={!isMobile ? { scale: 1.05 } : {}}
              whileTap={{ scale: 0.95 }}
            >
              <FaFileDownload /> Download Resume
            </motion.a>
            
            <motion.a
              href={profile?.social?.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
              whileHover={!isMobile ? { scale: 1.05 } : {}}
              whileTap={{ scale: 0.95 }}
            >
              <FaGithub /> GitHub Profile
            </motion.a>
          </motion.div>
        </div>

        {/* Three Orbital Rings Design */}
        <motion.div 
          className="hero-visual" 
          variants={itemVariants}
          animate={floatAnimation}
        >
          <motion.div 
            className="orbital-system"
            animate={{ 
              rotateZ: [0, 5, -5, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            {/* Central Mobile Icon */}
            <motion.div 
              className="central-core"
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <FaMobileAlt />
              <span>Mobile</span>
            </motion.div>

            {/* iOS Orbit - Inner Ring */}
            <motion.div 
              className="orbit-ring ios-orbit"
              animate={{ rotate: 360 }}
              transition={{
                duration: 25,
                repeat: Infinity,
                ease: 'linear',
              }}
            >
              <div className="orbit-path ios-path"></div>
              
              {/* Orbital Dots for iOS Ring */}
              <div className="orbital-dot dot-ios-1"></div>
              <div className="orbital-dot dot-ios-2"></div>
              <div className="orbital-dot dot-ios-3"></div>
              <motion.div 
                className="orbit-tech tech-1"
                animate={{ rotate: -360 }}
                transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
              >
                <div className="tech-icon ios-tech">
                  <SiSwift />
                  <span>Swift</span>
                </div>
              </motion.div>
              <motion.div 
                className="orbit-tech tech-2"
                animate={{ rotate: -360 }}
                transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
              >
                <div className="tech-icon ios-tech">
                  <SiXcode />
                  <span>Xcode</span>
                </div>
              </motion.div>
              <motion.div 
                className="orbit-tech tech-3"
                animate={{ rotate: -360 }}
                transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
              >
                <div className="tech-icon ios-tech">
                  <SiCocoapods />
                  <span>CocoaPods</span>
                </div>
              </motion.div>
              <motion.div 
                className="orbit-tech tech-4"
                animate={{ rotate: -360 }}
                transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
              >
                <div className="tech-icon ios-tech">
                  <FaApple />
                  <span>iOS</span>
                </div>
              </motion.div>
            </motion.div>

            {/* Android Orbit - Middle Ring */}
            <motion.div 
              className="orbit-ring android-orbit"
              animate={{ rotate: -360 }}
              transition={{
                duration: 30,
                repeat: Infinity,
                ease: 'linear',
              }}
            >
              <div className="orbit-path android-path"></div>
              
              {/* Orbital Dots for Android Ring */}
              <div className="orbital-dot dot-android-1"></div>
              <div className="orbital-dot dot-android-2"></div>
              <div className="orbital-dot dot-android-3"></div>
              <div className="orbital-dot dot-android-4"></div>
              <motion.div 
                className="orbit-tech tech-1"
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
              >
                <div className="tech-icon android-tech">
                  <SiKotlin />
                  <span>Kotlin</span>
                </div>
              </motion.div>
              <motion.div 
                className="orbit-tech tech-2"
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
              >
                <div className="tech-icon android-tech">
                  <SiAndroidstudio />
                  <span>Studio</span>
                </div>
              </motion.div>
              <motion.div 
                className="orbit-tech tech-3"
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
              >
                <div className="tech-icon android-tech">
                  <SiGradle />
                  <span>Gradle</span>
                </div>
              </motion.div>
              <motion.div 
                className="orbit-tech tech-4"
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
              >
                <div className="tech-icon android-tech">
                  <SiAndroid />
                  <span>Android</span>
                </div>
              </motion.div>
            </motion.div>

            {/* Flutter Orbit - Outer Ring */}
            <motion.div 
              className="orbit-ring flutter-orbit"
              animate={{ rotate: 360 }}
              transition={{
                duration: 35,
                repeat: Infinity,
                ease: 'linear',
              }}
            >
              <div className="orbit-path flutter-path"></div>
              
              {/* Orbital Dots for Flutter Ring */}
              <div className="orbital-dot dot-flutter-1"></div>
              <div className="orbital-dot dot-flutter-2"></div>
              <div className="orbital-dot dot-flutter-3"></div>
              <div className="orbital-dot dot-flutter-4"></div>
              <div className="orbital-dot dot-flutter-5"></div>
              <motion.div 
                className="orbit-tech tech-1"
                animate={{ rotate: -360 }}
                transition={{ duration: 35, repeat: Infinity, ease: 'linear' }}
              >
                <div className="tech-icon flutter-tech">
                  <SiFlutter />
                  <span>Flutter</span>
                </div>
              </motion.div>
              <motion.div 
                className="orbit-tech tech-2"
                animate={{ rotate: -360 }}
                transition={{ duration: 35, repeat: Infinity, ease: 'linear' }}
              >
                <div className="tech-icon flutter-tech">
                  <SiDart />
                  <span>Dart</span>
                </div>
              </motion.div>
              <motion.div 
                className="orbit-tech tech-3"
                animate={{ rotate: -360 }}
                transition={{ duration: 35, repeat: Infinity, ease: 'linear' }}
              >
                <div className="tech-icon flutter-tech">
                  <SiFirebase />
                  <span>Firebase</span>
                </div>
              </motion.div>
              <motion.div 
                className="orbit-tech tech-4"
                animate={{ rotate: -360 }}
                transition={{ duration: 35, repeat: Infinity, ease: 'linear' }}
              >
                <div className="tech-icon flutter-tech">
                  <SiSqlite />
                  <span>SQLite</span>
                </div>
              </motion.div>
            </motion.div>

            {/* Floating Particles */}
            <div className="floating-particles">
              <motion.div 
                className="particle"
                animate={{
                  y: [0, -30, 0],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
              <motion.div 
                className="particle"
                animate={{
                  y: [0, 30, 0],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 1,
                }}
              />
              <motion.div 
                className="particle"
                animate={{
                  x: [0, -30, 0],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 2,
                }}
              />
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.div
        className="scroll-indicator"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <span>Scroll to explore</span>
        <div className="mouse">
          <div className="wheel"></div>
        </div>
      </motion.div>
    </div>
  );
};

export default Hero;