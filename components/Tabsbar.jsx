import Tab from './Tab';
import styles from '../styles/Tabsbar.module.css';

const Tabsbar = () => {
  return (
    <div className={styles.tabs}>
      <Tab icon="/react_icon.svg" filename="home.jsx" path="/" />
      <Tab icon="/html_icon.svg" filename="about.html" path="/about" />
      
      <Tab icon="/js_icon.svg" filename="projects.js" path="/projects" />
      
    </div>
  );
};

export default Tabsbar;
