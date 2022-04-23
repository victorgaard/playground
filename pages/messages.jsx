import Head from "next/head";
import styles from "../styles/Home.module.css";

export default function Messages() {
  return (
    <div>
      <Head>
        <title>Messages</title>
      </Head>

      <main className={styles.container}>
        <h1>Welcome to messages</h1>
      </main>
    </div>
  );
}
