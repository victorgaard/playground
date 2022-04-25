import Head from "next/head";
import styles from "../styles/Home.module.css";

export default function MyWallets() {
  return (
    <div>
      <Head>
        <title>My cards</title>
      </Head>

      <main className={styles.container}>
        <h1>Welcome to my cards</h1>
      </main>
    </div>
  );
}
