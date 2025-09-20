import { useState, useEffect } from 'react';

// Import all JSON data files
import profileData from '../data/profile.json';
import skillsData from '../data/skills.json';
import experienceData from '../data/experience.json';
import projectsData from '../data/projects.json';
import educationData from '../data/education.json';

const useContentData = () => {
  const [data, setData] = useState({
    profile: profileData,
    skills: skillsData,
    experience: experienceData,
    projects: projectsData,
    education: educationData,
    loading: false,
    error: null
  });

  // This hook can be extended to fetch data from an API in the future
  // For now, it simply returns the imported JSON data
  useEffect(() => {
    // Simulate async data loading if needed
    setData(prevData => ({
      ...prevData,
      loading: false
    }));
  }, []);

  // Function to update specific sections of data
  const updateData = (section, newData) => {
    setData(prevData => ({
      ...prevData,
      [section]: newData
    }));
  };

  return { data, updateData };
};

export default useContentData;