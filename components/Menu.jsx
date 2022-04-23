import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import menuOptions from "./util/menuOptions";
import styles from "../styles/Menu.module.css";

function Menu({ setPage }) {
  const [active, setActive] = useState(1);
  return (
    <section className={styles.container}>
      <div className={styles.logo}>
        <Image src="/logo.svg" width={22} height={22} />
        <p>Playground</p>
      </div>
      <div className={styles.menuWrapper}>
        <div>
          {menuOptions.top.map(menuItem => (
            <Link key={menuItem.id} href={menuItem.link}>
              <a
                href
                className={
                  active === menuItem.id
                    ? `${styles.menuItem} ${styles.active}`
                    : styles.menuItem
                }
                onClick={() => {
                  setActive(menuItem.id);
                  setPage(menuItem.title);
                }}
              >
                <Image src={menuItem.icon} width={22} height={22} />
                {menuItem.title}
              </a>
            </Link>
          ))}
        </div>

        <div>
          {menuOptions.bottom.map(menuItem => (
            <Link key={menuItem.id} href={menuItem.link}>
              <a className={styles.menuItem} href>
                <Image src={menuItem.icon} width={22} height={22} />
                {menuItem.title}
              </a>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Menu;
