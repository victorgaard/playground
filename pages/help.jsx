import Head from "next/head";
import styles from "../styles/Home.module.css";

export default function Help() {
  return (
    <div>
      <Head>
        <title>Help</title>
      </Head>

      <main className={styles.container}>
        <h1>Welcome to help</h1>
      </main>
    </div>
  );
}
