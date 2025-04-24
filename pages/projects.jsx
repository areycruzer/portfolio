import { useState, useEffect } from 'react';
import ProjectCard from '../components/ProjectCard';
import { getProjects } from '../components/project';
import styles from '../styles/ProjectsPage.module.css';
import { motion } from 'framer-motion';

const ProjectsPage = ({ projects }) => {
  const [visibleProjects, setVisibleProjects] = useState([]);
  const [selectedTag, setSelectedTag] = useState('all');
  const [selectedLanguage, setSelectedLanguage] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Define common programming languages to filter by
  const programmingLanguages = ['all', 'javascript', 'typescript', 'python', 'java', 'c#', 'c++', 'go', 'php', 'ruby'];
  
  // Get all unique tags from projects (excluding languages)
  const allTags = ['all', ...new Set(projects.flatMap(project => 
    project.tags.filter(tag => !programmingLanguages.includes(tag.toLowerCase()))
  ))];
  
  // Get languages that actually exist in the projects
  const availableLanguages = ['all', ...new Set(projects.flatMap(project => 
    project.tags.filter(tag => programmingLanguages.includes(tag.toLowerCase()))
  ))];
  
  useEffect(() => {
    // Simulate loading for a smoother experience
    const timer = setTimeout(() => {
      setIsLoading(false);
      setVisibleProjects(projects);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [projects]);
  
  // Filter projects based on selected tag, language and search query
  useEffect(() => {
    let filtered = [...projects];
    
    // Filter by language
    if (selectedLanguage !== 'all') {
      filtered = filtered.filter(project => 
        project.tags.some(tag => tag.toLowerCase() === selectedLanguage.toLowerCase())
      );
    }
    
    // Filter by tag
    if (selectedTag !== 'all') {
      filtered = filtered.filter(project => project.tags.includes(selectedTag));
    }
    
    // Then filter by search query
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        project => 
          project.name.toLowerCase().includes(query) || 
          project.description.toLowerCase().includes(query) ||
          project.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }
    
    setVisibleProjects(filtered);
  }, [selectedTag, selectedLanguage, searchQuery, projects]);
  
  // Animation variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };
  
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={styles.pageContainer}
    >
      {/* Enhanced Header Section */}
      <section className={styles.headerContainer}>
        <motion.div 
          className={styles.headerContent}
          initial={{ y: -30, opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <h1 className={styles.heading}>My Projects</h1>
          <p className={styles.subheading}>Showcasing my technical expertise and creative solutions</p>
        </motion.div>
        
        <motion.div 
          className={styles.searchContainer}
          initial={{ y: 30, opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <div className={styles.searchInputWrapper}>
            <svg className={styles.searchIcon} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input 
              type="text" 
              placeholder="Search projects..." 
              className={styles.searchInput}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button 
                className={styles.clearButton}
                onClick={() => setSearchQuery('')}
                aria-label="Clear search"
              >
                ×
              </button>
            )}
          </div>
        </motion.div>
      </section>
      
      {/* Language Filters - New Section */}
      
      {/*<motion.div 
        initial={{ y: 20, opacity: 0 }} 
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className={styles.filterSection}
      >
        <h3 className={styles.filterHeading}>Filter by Language:</h3>
        <div className={styles.languageFilterContainer}>
          {availableLanguages.map((lang, index) => (
            <motion.button
              key={`lang-${lang}`}
              className={`${styles.filterButton} ${styles.languageButton} ${selectedLanguage === lang ? styles.activeLanguage : ''}`}
              onClick={() => setSelectedLanguage(lang)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index, duration: 0.3 }}
            >
              {lang}
            </motion.button>
          ))}
        </div>
      </motion.div>
      */}
      {/* Filter Tags */}
      {/*<motion.div 
        initial={{ y: 20, opacity: 0 }} 
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className={styles.filterSection}
      >
        <h3 className={styles.filterHeading}>Filter by Technology:</h3>
        <div className={styles.filterContainer}>
          {allTags.map((tag, index) => (
            <motion.button
              key={tag}
              className={`${styles.filterButton} ${selectedTag === tag ? styles.active : ''}`}
              onClick={() => setSelectedTag(tag)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index, duration: 0.3 }}
            >
              {tag}
            </motion.button>
          ))}
        </div>
      </motion.div>*/}
      
      {/* Reset Filters Button */}
      {/*<motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className={styles.resetFilterContainer}
      >
        <button 
          className={styles.resetFiltersButton}
          onClick={() => {
            setSelectedTag('all');
            setSelectedLanguage('all');
            setSearchQuery('');
          }}
        >
          Reset All Filters
        </button>
      </motion.div>*/}
    
      {/* Projects Container */}
      {isLoading ? (
        <div className={styles.loaderContainer}>
          <div className={styles.loader}></div>
        </div>
      ) : (
        <motion.div 
          className={styles.container}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {visibleProjects.length > 0 ? (
            visibleProjects.map((project) => (
              <motion.div
                key={project.id}
                className={styles.projectCardWrapper}
                variants={itemVariants}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))
          ) : (
            <motion.div 
              className={styles.noProjects}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              <h3>No projects found that match your criteria</h3>
              <div className={styles.noProjectsActions}>
                <button 
                  className={styles.resetButton}
                  onClick={() => {
                    setSelectedTag('all');
                    setSelectedLanguage('all');
                    setSearchQuery('');
                  }}
                >
                  Clear Filters
                </button>
              </div>
            </motion.div>
          )}
        </motion.div>
      )}
      
      {/* Footer Information */}
      <motion.div 
        className={styles.footerInfo}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        <p>Want to see more of my work? Check out my <a href="https://github.com/LSUDOKO" target="_blank" rel="noopener noreferrer">GitHub profile</a>.</p>
      </motion.div>
    </motion.div>
  );
};

export async function getStaticProps() {
  const projects = getProjects();

  return {
    props: { title: 'Projects', projects },
  };
}

export default ProjectsPage;
