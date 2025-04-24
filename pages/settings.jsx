import ThemeInfo from '../components/ThemeInfo';
import styles from '../styles/SettingsPage.module.css';

const SettingsPage = () => {
  return (
    <>
      <h2>Manage Themes</h2>
      <div className={styles.container}>
        <ThemeInfo
          name="GitHub Dark"
          icon="/github-dark.png"
          publisher="GitHub"
          theme="github-dark"
        />
        <ThemeInfo
          name="Dracula"
          icon="/dracula.png"
          publisher="Dracula Theme"
          theme="dracula"
        />
        <ThemeInfo
          name="Nord"
          icon="/nord.png"
          publisher="Arctic Ice Studio"
          theme="nord"
        />
        <ThemeInfo
          name="Night Owl"
          icon="/night-owl.png"
          publisher="Sarah Drasner"
          theme="night-owl"
        />
        <ThemeInfo
          name="One Dark Pro"
          icon="/one-dark-pro.svg"
          publisher="binaryify"
          theme="one-dark-pro"
        />
        <ThemeInfo
          name="Tokyo Night"
          icon="/tokyo-night.svg"
          publisher="enkia"
          theme="tokyo-night"
        />
        <ThemeInfo
          name="Monokai Pro"
          icon="/monokai-pro.svg"
          publisher="monokai"
          theme="monokai-pro"
        />
        <ThemeInfo
          name="Material Ocean"
          icon="/material-ocean.svg"
          publisher="Material Theme"
          theme="material-ocean"
        />
        <ThemeInfo
          name="Palenight"
          icon="/palenight.svg"
          publisher="whizkydee"
          theme="palenight"
        />
        <ThemeInfo
          name="Gruvbox Dark"
          icon="/gruvbox-dark.svg"
          publisher="jdinhlife"
          theme="gruvbox-dark"
        />
      </div>
    </>
  );
};

export async function getStaticProps() {
  return {
    props: { title: 'Settings' },
  };
}

export default SettingsPage;
