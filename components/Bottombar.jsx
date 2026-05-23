import Link from 'next/link'; // Import Link for internal routing
import ErrorIcon from './icons/ErrorIcon';
import WarningIcon from './icons/WarningIcon';
import BellIcon from './icons/BellIcon';
import CheckIcon from './icons/CheckIcon';
import NextjsIcon from './icons/NextjsIcon';
import SourceControlIcon from './icons/SourceControlIcon';
import styles from '../styles/Bottombar.module.css';

const Bottombar = () => {
  return (
    <footer className={styles.bottomBar}>
      <div className={styles.container}>
        <a
          href="https://github.com/areycruzer"
          target="_blank"
          rel="noreferrer noopener"
          className={styles.section}
          aria-label="GitHub Repository"
          title="GitHub Repository"
        >
          <SourceControlIcon className={styles.icon} />
          <p>main</p>
        </a>
        <div className={styles.section} aria-label="Problems: 0 Errors, 0 Warnings" title="Problems" role="group">
          <ErrorIcon className={styles.icon} />
          <WarningIcon className={styles.icon} />
        </div>
      </div>
      <div className={styles.container}>
        <div className={styles.section} aria-label="Powered by Next.js" title="Framework" role="group">
          <NextjsIcon className={styles.icon} />
          <p>Powered by Next.js</p>
        </div>
        <div className={styles.section} aria-label="Prettier" title="Code Formatter" role="group">
          <CheckIcon className={styles.icon} />
          <p>Prettier</p>
        </div>
        <div className={styles.section}>
          <Link href="/" aria-label="Notifications" title="Notifications">
            <BellIcon />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Bottombar;
