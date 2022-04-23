import Head from "next/head";
import styles from "../styles/Home.module.css";

export default function Settings() {
  return (
    <div>
      <Head>
        <title>Settings</title>
      </Head>

      <main className={styles.container}>
        <h1>Welcome to settings</h1>
      </main>
    </div>
  );
}
