import styles from "../styles/Navbar.module.css";

function Navbar({ page, setDarkMode, darkMode }) {
  return (
    <nav className={styles.container}>
      <h1 className={styles.title}>{page}</h1>
      <div className={styles.subcontainer}>
        <p>Search</p>
        <p>Avatar</p>
        <button
          className={styles.button}
          type="button"
          onClick={() => setDarkMode(!darkMode)}
        >
          Toggle theme
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
