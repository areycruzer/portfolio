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
          <div className={styles.overlay}>
            <div className={styles.tags}>
              {project.tags.map((tag, index) => (
                <span key={index} className={styles.tag}>{tag}</span>
              ))}
            </div>
          </div>
        </div>
      )}
      <div className={styles.content}>
        <div className={styles.header}>
          <h3 className={styles.title}>{project.name}</h3>
          <div className={styles.linkContainer}>
            {project.github && (
              <motion.a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.iconLink}
                aria-label="GitHub repository"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <GithubIcon className={styles.icon} />
              </motion.a>
            )}
            {project.demo && (
              <motion.a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.iconLink}
                aria-label="Live demo"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <LinkIcon className={styles.icon} />
              </motion.a>
            )}
          </div>
        </div>
        <p className={styles.description}>{project.description}</p>
        <div className={styles.technologies}>
          <h4 className={styles.techTitle}>Technologies Used:</h4>
          <div className={styles.techList}>
            {project.technologies && project.technologies.map((tech, index) => (
              <span key={index} className={styles.techItem}>{tech}</span>
            ))}
          </div>
        </div>
        <div className={styles.footer}>
          <motion.button
            className={styles.viewProjectBtn}
            whileHover={{ 
              scale: 1.02,
              boxShadow: '0 5px 15px rgba(155, 89, 182, 0.4)'
            }}
            whileTap={{ scale: 0.98 }}
            onClick={() => window.open(project.demo || project.github || '#', '_blank')}
          >
            View Project Details
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;