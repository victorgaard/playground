import Head from "next/head";
import Card from "../components/Card";
import GraphCard from "../components/GraphCard";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Playground - Dashboard</title>
        <meta name="description" content="Playground - Dashboard" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.wrapper}>
        <section className={styles.container}>
          <GraphCard
            title="Sales"
            unit="143.25€"
            rgbaColor={[26, 167, 45]}
            dataValue={[0, 0.4, 0.2, 0.3, 0.7, 0.4, 0.6, 0.9]}
            growth="+2.1%"
          />
          <GraphCard
            title="Royalties"
            unit="502.91€"
            rgbaColor={[253, 203, 1]}
            dataValue={[0, 0.2, 0.2, 0.5, 0.5, 0.9, 0.4, 1]}
            growth="-14.4%"
          />
          <GraphCard
            title="Tickets"
            unit="2,580"
            rgbaColor={[133, 1, 253]}
            dataValue={[0, 0.6, 0.5, 0.5, 0.5, 0.2, 0.6, 1]}
            growth="+5.7%"
          />
        </section>

        <section className={styles.container}>
          <Card />
        </section>
      </main>
    </div>
  );
}
