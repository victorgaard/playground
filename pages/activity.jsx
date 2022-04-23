import Head from "next/head";
import styles from "../styles/Home.module.css";

export default function Activity() {
  return (
    <div>
      <Head>
        <title>Activity</title>
      </Head>

      <main className={styles.container}>
        <h1>Welcome to activity</h1>
      </main>
    </div>
  );
}
