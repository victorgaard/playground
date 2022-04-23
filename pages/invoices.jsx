import Head from "next/head";
import styles from "../styles/Home.module.css";

export default function Invoices() {
  return (
    <div>
      <Head>
        <title>Invoices</title>
      </Head>

      <main className={styles.container}>
        <h1>Welcome to invoices</h1>
      </main>
    </div>
  );
}
