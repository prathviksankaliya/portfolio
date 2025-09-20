import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaHome, FaUserCircle, FaLaptopCode, FaRocket, 
  FaGraduationCap, FaBriefcase, FaPaperPlane, FaBars, FaTimes
} from 'react-icons/fa';
import { BsSunFill, BsMoonStarsFill } from 'react-icons/bs';
import { useTheme } from '../context/ThemeContext';
import './Navbar.css';

const Navbar = ({ activeSection, profile }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme();

  const navItems = [
    { id: 'home', label: 'Home', icon: FaHome },
    { id: 'about', label: 'About', icon: FaUserCircle },
    { id: 'skills', label: 'Skills', icon: FaLaptopCode },
    { id: 'education', label: 'Education', icon: FaGraduationCap },
    { id: 'experience', label: 'Experience', icon: FaBriefcase },
    { id: 'projects', label: 'Projects', icon: FaRocket },
    { id: 'contact', label: 'Contact', icon: FaPaperPlane },
  ];

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        {/* Left Side - Name Only */}
        <motion.div 
          className="nav-logo"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => scrollToSection('home')}
        >
          <span className="logo-name">{profile?.personal?.name || 'Portfolio'}</span>
        </motion.div>

        {/* Right Side - All Navigation Items */}
        <div className="nav-right">
          <div className="nav-menu-desktop">
            {navItems.map((item) => (
              <motion.button
                key={item.id}
                className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
                onClick={() => scrollToSection(item.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <item.icon className="nav-icon" />
                <span className="nav-label">{item.label}</span>
              </motion.button>
            ))}
            
            {/* Theme Toggle */}
            <motion.button
              className="theme-toggle-nav"
              onClick={toggleTheme}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              <motion.div
                animate={{ rotate: isDarkMode ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {isDarkMode ? <BsMoonStarsFill /> : <BsSunFill />}
              </motion.div>
            </motion.button>
          </div>

          {/* Mobile Controls */}
          <div className="nav-mobile-controls">
            <motion.button
              className="theme-toggle-nav mobile"
              onClick={toggleTheme}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isDarkMode ? <BsMoonStarsFill /> : <BsSunFill />}
            </motion.button>
            
            <button
              className="nav-toggle"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="nav-menu-mobile"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
          >
            {navItems.map((item) => (
              <motion.button
                key={item.id}
                className={`nav-link-mobile ${activeSection === item.id ? 'active' : ''}`}
                onClick={() => scrollToSection(item.id)}
                whileHover={{ x: 10 }}
                whileTap={{ scale: 0.95 }}
              >
                <item.icon className="nav-icon" />
                <span>{item.label}</span>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;