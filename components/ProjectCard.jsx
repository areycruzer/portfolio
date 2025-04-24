import React from 'react';
import Image from 'next/image';
import styles from '../styles/ProjectCard.module.css';
import { motion } from 'framer-motion';
import GithubIcon from './icons/GithubIcon';
import LinkIcon from './icons/LinkIcon';

const ProjectCard = ({ project }) => {
  return (
    <motion.div 
      className={styles.card}
      whileHover={{ y: -5, boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3)' }}
      transition={{ duration: 0.3 }}
    >
      {project.image && (
        <div className={styles.imageContainer}>
          <Image 
            src={project.image} 
            alt={project.name} 
            width={400} 
            height={200}
            objectFit="cover"
            className={styles.image}
            loading="lazy"
          />
          <div className={styles.overlay}></div>
        </div>
      )}
      <div className={styles.content}>
        <div className={styles.header}>
          <h3 className={styles.title}>{project.name}</h3>
        </div>
        <p className={styles.description}>{project.description}</p>
        
        <div className={styles.linkButtons}>
          {project.code && (
            <motion.a
              href={project.code}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.linkButton}
              aria-label="Source Code"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <GithubIcon className={styles.buttonIcon} />
              <span>Code</span>
            </motion.a>
          )}
          {project.demo && (
            <motion.a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.linkButton}
              aria-label="Live Demo"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <LinkIcon className={styles.buttonIcon} />
              <span>Demo</span>
            </motion.a>
          )}
          {project.demos && (
            <motion.a
              href={project.demos}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.linkButton}
              aria-label="Demo Video"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <LinkIcon className={styles.buttonIcon} />
              <span>Preview</span>
            </motion.a>
          )}
        </div>
        
        <div className={styles.technologies}>
          <h4 className={styles.techTitle}>Technologies Used:</h4>
          <div className={styles.techList}>
            {project.technologies && project.technologies.map((tech, index) => (
              <span key={index} className={styles.techItem}>{tech}</span>
            ))}
            {!project.technologies && project.tags && project.tags.map((tag, index) => (
              <span key={index} className={styles.techItem}>{tag}</span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;