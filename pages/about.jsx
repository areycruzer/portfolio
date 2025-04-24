import Image from 'next/image';
import styles from '../styles/About.module.css';
import brain from '../public/brain.jpg';
import { useEffect, useState } from 'react';

export default function AboutMe() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const [typedText, setTypedText] = useState('');
  const [visibleSkills, setVisibleSkills] = useState([]);
  
  // Text to be typed in the terminal
  const terminalText = `> Hello, I'm Arpit Singh
> A passionate developer focused on creating innovative solutions
> Let me tell you about my journey...`;
  
  useEffect(() => {
    setIsLoaded(true);
    
    // Terminal typing effect
    let i = 0;
    const typing = setInterval(() => {
      setTypedText(terminalText.substring(0, i));
      i++;
      if (i > terminalText.length) clearInterval(typing);
    }, 40);
    
    // Animate skills progressively
    const skillsTimeout = setTimeout(() => {
      const skillIds = ['js', 'react', 'aws', 'node', 'golang', 'css', 'db', 'git'];
      let delay = 0;
      
      skillIds.forEach((id, index) => {
        setTimeout(() => {
          setVisibleSkills(prev => [...prev, id]);
        }, delay);
        delay += 200;
      });
    }, 1000);
    
    return () => {
      clearInterval(typing);
      clearTimeout(skillsTimeout);
    };
  }, []);

  return (
    <div className={`${styles.about} ${isLoaded ? styles.loaded : ''}`}>
      <div className={styles.container}>
        <div className={styles.profileHeader}>
          <h1 className={styles.mainTitle}>About <span className={styles.highlight}>Me</span></h1>
          <div className={styles.underline}></div>
        </div>
        
        {/* VS Code-like Tabs */}
        <div className={styles.tabsContainer}>
          <div 
            className={`${styles.tab} ${activeTab === 'profile' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            <span className={styles.tabIcon}></span> Profile
          </div>
          <div 
            className={`${styles.tab} ${activeTab === 'skills' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('skills')}
          >
            <span className={styles.tabIcon}></span> Skills
          </div>
          <div 
            className={`${styles.tab} ${activeTab === 'terminal' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('terminal')}
          >
            <span className={styles.tabIcon}></span> Terminal
          </div>
        </div>
        
        {/* Profile Tab Content */}
        <div className={`${styles.tabContent} ${activeTab === 'profile' ? styles.activeContent : ''}`}>
          <div className={styles.grid}>
            <div className={styles.imageContainer}>
              <div className={styles.imageWrapper}>
                <Image
                  src={brain}
                  alt="About Me"
                  width={200}
                  height={200}
                  priority
                  className={styles.myImage}
                />
                <div className={styles.imageGlow}></div>
                <div className={styles.status}>
                  <span className={styles.statusDot}></span> Available for Work
                </div>
              </div>
              <div className={styles.personalInfoCard}>
                <h3 className={styles.cardTitle}>Personal Info</h3>
                <ul className={styles.list}>
                  <li className={styles.listItem}>
                    <i className={`${styles.icon} bi bi-person`}></i>
                    <span><strong className={styles.strong}>Name: </strong>
                      <span className={styles.value}>Arpit Singh</span></span>
                  </li>
                  <li className={styles.listItem}>
                    <i className={`${styles.icon} bi bi-flag`}></i>
                    <span><strong className={styles.strong}>Nationality: </strong>
                      <span className={styles.value}>Indian</span></span>
                  </li>
                  <li className={styles.listItem}>
                    <i className={`${styles.icon} bi bi-building`}></i>
                    <span><strong className={styles.strong}>College: </strong>
                      <span className={styles.value}>National Institute of Technology Hamirpur</span></span>
                  </li>
                  <li className={styles.listItem}>
                    <i className={`${styles.icon} bi bi-calendar`}></i>
                    <span><strong className={styles.strong}>Graduation: </strong>
                      <span className={styles.value}>2028</span></span>
                  </li>
                  <li className={styles.listItem}>
                    <i className={`${styles.icon} bi bi-briefcase`}></i>
                    <span><strong className={styles.strong}>Availability: </strong>
                      <span className={styles.value}>Freelance, Remote, & Hybrid</span></span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className={styles.bioContainer}>
              <div className={styles.bioCard}>
                <h3 className={styles.cardTitle}>Mobile App & Web Developer</h3>
                <div className={styles.paragraph}>
                  Innovative and deadline-driven Developer researching and developing solutions that meet client satisfaction using the easiest, yet effective approach possible. I make the whole concept of developing, a whole vibe - A Normal Life is Boring.
                </div>
                
                <div className={styles.tagContainer}>
                  <span className={styles.tag}>Web Dev</span>
                  <span className={styles.tag}>Mobile Apps</span>
                  <span className={styles.tag}>React</span>
                  <span className={styles.tag}>Next.js</span>
                  <span className={styles.tag}>Node</span>
                  <span className={styles.tag}>AWS</span>
                  <span className={styles.tag}>Firebase</span>
                  <span className={styles.tag}>MongoDB</span>
                  <span className={styles.tag}>Express</span>
                  <span className={styles.tag}>scala</span>
                  <span className={styles.tag}>Docker</span>
                  <span className={styles.tag}>Golang</span>
                  <span className={styles.tag}>Blockchain</span>
                </div>
                
                <div className={styles.buttonContainer}>
                  <a href="/resume" className={styles.button}>
                    <span className={styles.buttonIcon}>📄</span>
                    Experience
                  </a>
                  <a href="mailto:adoranto737@gmail.com" className={styles.button}>
                    <span className={styles.buttonIcon}>✉️</span>
                    Contact Me
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Skills Tab Content */}
        <div className={`${styles.tabContent} ${activeTab === 'skills' ? styles.activeContent : ''}`}>
          <div className={styles.skillsSection}>
            <h3 className={styles.sectionTitle}>Technical Skills</h3>
            <div className={styles.underline}></div>
            
            <div className={styles.skillsGrid}>
              <div id="js" className={`${styles.skill} ${visibleSkills.includes('js') ? styles.visibleSkill : ''}`}>
                <div className={styles.skillHeader}>
                  <span className={styles.skillName}>JavaScript & TypeScript</span>
                  <span className={styles.skillPercent}>89%</span>
                </div>
                <div className={styles.progressBar}>
                  <div className={styles.progress} style={{ width: '89%' }}></div>
                </div>
              </div>
              
              <div id="react" className={`${styles.skill} ${visibleSkills.includes('react') ? styles.visibleSkill : ''}`}>
                <div className={styles.skillHeader}>
                  <span className={styles.skillName}>ReactJS, NextJS & React Native</span>
                  <span className={styles.skillPercent}>85%</span>
                </div>
                <div className={styles.progressBar}>
                  <div className={styles.progress} style={{ width: '85%' }}></div>
                </div>
              </div>
              
              <div id="aws" className={`${styles.skill} ${visibleSkills.includes('aws') ? styles.visibleSkill : ''}`}>
                <div className={styles.skillHeader}>
                  <span className={styles.skillName}>AWS and Docker</span>
                  <span className={styles.skillPercent}>82%</span>
                </div>
                <div className={styles.progressBar}>
                  <div className={styles.progress} style={{ width: '82%' }}></div>
                </div>
              </div>
              
              <div id="node" className={`${styles.skill} ${visibleSkills.includes('node') ? styles.visibleSkill : ''}`}>
                <div className={styles.skillHeader}>
                  <span className={styles.skillName}>Websockets, ExpressJS & NodeJS</span>
                  <span className={styles.skillPercent}>88%</span>
                </div>
                <div className={styles.progressBar}>
                  <div className={styles.progress} style={{ width: '88%' }}></div>
                </div>
              </div>
              
              <div id="golang" className={`${styles.skill} ${visibleSkills.includes('golang') ? styles.visibleSkill : ''}`}>
                <div className={styles.skillHeader}>
                  <span className={styles.skillName}>Golang</span>
                  <span className={styles.skillPercent}>60%</span>
                </div>
                <div className={styles.progressBar}>
                  <div className={styles.progress} style={{ width: '60%' }}></div>
                </div>
              </div>
              
              <div id="css" className={`${styles.skill} ${visibleSkills.includes('css') ? styles.visibleSkill : ''}`}>
                <div className={styles.skillHeader}>
                  <span className={styles.skillName}>CSS and Tailwind</span>
                  <span className={styles.skillPercent}>95%</span>
                </div>
                <div className={styles.progressBar}>
                  <div className={styles.progress} style={{ width: '95%' }}></div>
                </div>
              </div>
              
              <div id="db" className={`${styles.skill} ${visibleSkills.includes('db') ? styles.visibleSkill : ''}`}>
                <div className={styles.skillHeader}>
                  <span className={styles.skillName}>Firebase, MongoDB and Redis</span>
                  <span className={styles.skillPercent}>85%</span>
                </div>
                <div className={styles.progressBar}>
                  <div className={styles.progress} style={{ width: '85%' }}></div>
                </div>
              </div>
              
              <div id="git" className={`${styles.skill} ${visibleSkills.includes('git') ? styles.visibleSkill : ''}`}>
                <div className={styles.skillHeader}>
                  <span className={styles.skillName}>Git & Postman</span>
                  <span className={styles.skillPercent}>85%</span>
                </div>
                <div className={styles.progressBar}>
                  <div className={styles.progress} style={{ width: '85%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Terminal Tab Content */}
        <div className={`${styles.tabContent} ${activeTab === 'terminal' ? styles.activeContent : ''}`}>
          <div className={styles.terminal}>
            <div className={styles.terminalHeader}>
              <div className={styles.terminalControls}>
                <span className={styles.terminalControl} style={{ backgroundColor: '#ff5f56' }}></span>
                <span className={styles.terminalControl} style={{ backgroundColor: '#ffbd2e' }}></span>
                <span className={styles.terminalControl} style={{ backgroundColor: '#27c93f' }}></span>
              </div>
              <div className={styles.terminalTitle}>arpit-portfolio ~ about-me</div>
            </div>
            <div className={styles.terminalBody}>
              {typedText.split('\n').map((line, i) => (
                <div key={i} className={styles.terminalLine}>
                  {line}
                </div>
              ))}
              <div className={styles.terminalCursor}></div>
            </div>
            <div className={styles.terminalActions}>
              <a href="/projects" className={styles.terminalButton}>
                View Projects
              </a>
              <a href="/github" className={styles.terminalButton}>
                Check GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Fetch static props if needed for SSR or static generation
export async function getStaticProps() {
  return {
    props: { title: 'About' },
  };
}
