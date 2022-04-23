import Head from "next/head";
import styles from "../styles/Home.module.css";

export default function Analytics() {
  return (
    <div>
      <Head>
        <title>Analytics</title>
      </Head>

      <main className={styles.container}>
        <h1>Welcome to analytics</h1>
      </main>
    </div>
  );
}
