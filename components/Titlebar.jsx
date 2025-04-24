import styles from '../styles/Titlebar.module.css';
import Chatbot from './Chatbot';

const Titlebar = () => {
  return (
    <section className={styles.titlebar}>
      {/* <Image
        src="/vscode_icon.svg"
        alt="VSCode Icon"
        height={15}
        width={15}
        className={styles.icon}
      /> */}
       <div className={styles.windowButtons}>
        <span className={styles.minimize}></span>
        <span className={styles.maximize}></span>
        <span className={styles.close}></span>
      </div>


      <p className={styles.title}><span className={styles.navCover}>Arpit - Visual Studio Code</span></p>
      <Chatbot />

    </section>
  );
};

export default Titlebar;
