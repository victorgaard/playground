import Chart from "chart.js/auto";
import Head from "next/head";
import Card from "../components/Card";
import LineChart from "../components/LineChart";
import BarChart from "../components/BarChart";
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
          <LineChart
            title="Sales"
            unit="143.25€"
            rgbaColor={[26, 167, 45]}
            dataValue={[0, 0.4, 0.2, 0.3, 0.7, 0.4, 0.6, 0.9]}
            growth="+2.1%"
          />
          <LineChart
            title="Royalties"
            unit="502.91€"
            rgbaColor={[253, 203, 1]}
            dataValue={[0, 0.2, 0.2, 0.5, 0.5, 0.9, 0.4, 1]}
            growth="-14.4%"
          />
          <LineChart
            title="Tickets"
            unit="2,580"
            rgbaColor={[133, 1, 253]}
            dataValue={[0, 0.6, 0.5, 0.5, 0.5, 0.2, 0.6, 1]}
            growth="+5.7%"
          />
        </section>

        <section className={styles.containerAlt}>
          <BarChart
            title="Sales Report"
            date="Jan-Jul 2022"
            dataValue1={[0.1, 0.4, 0.2, 0.3, 0.7, 0.4, 0.6, 0.3, 0.4]}
            dataValue2={[0.07, 0.3, 0.15, 0.2, 0.5, 0.3, 0.8, 0.2, 0.4]}
          />
          <BarChart
            title="Tickets Report"
            date="Jan-Jul 2022"
            dataValue1={[0.1, 0.4, 0.2, 0.3, 0.7, 0.4, 0.6, 0.3, 0.4]}
            dataValue2={[0.07, 0.3, 0.15, 0.2, 0.5, 0.3, 0.8, 0.2, 0.4]}
          />
        </section>

        <section className={styles.container}>
          <Card />
        </section>
      </main>
    </div>
  );
}
