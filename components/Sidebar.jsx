import Link from 'next/link';
import { useRouter } from 'next/router';
import FilesIcon from './icons/FilesIcon';
import GithubIcon from './icons/GithubIcon';
import TwitterIcon from './icons/TwitterIcon';
import MailIcon from './icons/MailIcon';
import AccountIcon from './icons/AccountIcon';
import SettingsIcon from './icons/SettingsIcon';
import WhatsAppIcon from './icons/WhatsappIcon';
import FacebookIcon from './icons/FacebookIcon';
import TikTokIcon from './icons/TiktokIcon';
import styles from '../styles/Sidebar.module.css';
import LinkedInIcon from './icons/LinkedInIcon';

const sidebarTopItems = [
  {
    Icon: FilesIcon,
    path: '/',
    label: 'Explorer',
  },
  {
    Icon: WhatsAppIcon,
    path: 'https://wa.me/918588077790',
    label: 'WhatsApp',
  },
  {
    Icon: TwitterIcon,
    path: 'https://x.com/reyswyam',
    label: 'Twitter',
  },
  {
    Icon: GithubIcon,
    path: 'https://github.com/areycruzer',
    label: 'GitHub',
  },
  {
    Icon: LinkedInIcon,
    path: 'https://www.linkedin.com/in/areyswyam',
    label: 'LinkedIn',
  },
  
  {
    Icon: MailIcon,
    path: 'mailto:swyam7@gmail.com',
    label: 'Email',
  },
];

const sidebarBottomItems = [
  {
    Icon: AccountIcon,
    path: '/about',
    label: 'Account',
  },
  {
    Icon: SettingsIcon,
    path: '/settings',
    label: 'Settings',
  },
];

const Sidebar = () => {
  const router = useRouter();

  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebarTop}>
        {sidebarTopItems.map(({ Icon, path, label }, index) => (
          <div key={index} className={styles.iconContainer}>
            <Link href={path} aria-label={label} title={label}>
              <div
                className={
                  router.pathname === path ? styles.active : undefined
                }
              >
                <Icon
                  fill={
                    router.pathname === path
                      ? 'rgb(225, 228, 232)'
                      : 'rgb(106, 115, 125)'
                  }
                  className={styles.icon}
                />
              </div>
            </Link>
          </div>
        ))}
      </div>
      <div className={styles.sidebarBottom}>
        {sidebarBottomItems.map(({ Icon, path, label }, index) => (
          <div key={index} className={styles.iconContainer}>
            <Link href={path} passHref aria-label={label} title={label}>
              <div
                className={
                  router.pathname === path ? styles.active : undefined
                }
              >
                <Icon
                  fill={
                    router.pathname === path
                      ? 'rgb(225, 228, 232)'
                      : 'rgb(106, 115, 125)'
                  }
                  className={styles.icon}
                />
              </div>
            </Link>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
