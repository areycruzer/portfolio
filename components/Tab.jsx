import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import styles from '../styles/Tab.module.css';

const Tab = ({ icon, filename, path, externalLink }) => {
  const router = useRouter();

  // If it's an external link, use a regular anchor tag
  if (externalLink) {
    return (
      <a href={path} target="_blank" rel="noopener noreferrer">
        <div className={styles.tab}>
          <Image src={icon} alt={filename} height={18} width={18} />
          <p>{filename}</p>
        </div>
      </a>
    );
  }

  // Otherwise use Next.js Link for internal navigation
  return (
    <Link href={path}>
      <div
        className={`${styles.tab} ${router.pathname === path && styles.active}`}
      >
        <Image src={icon} alt={filename} height={18} width={18} />
        <p>{filename}</p>
      </div>
    </Link>
  );
};

export default Tab;
