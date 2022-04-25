import { useState } from "react";
import Menu from "./Menu";
import Navbar from "./Navbar";
import styles from "../styles/Layout.module.css";

function Layout({ children }) {
  const [darkMode, setDarkMode] = useState(false);
  const [page, setPage] = useState("Dashboard");

  return (
    <div
      className={
        darkMode ? `${styles.container} ${styles.dark}` : styles.container
      }
    >
      <Menu setPage={setPage} />
      <div className={styles.wrapper}>
        <div className={styles.subcontainer}>
          <Navbar darkMode={darkMode} setDarkMode={setDarkMode} page={page} />
          {children}
        </div>
      </div>
    </div>
  );
}

export default Layout;
