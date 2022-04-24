import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";
import Head from "next/head";
import Card from "../components/Card";
import styles from "../styles/Home.module.css";

export default function Home() {
  const data = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        data: [0, 0.4, 0.2, 0.3, 0.7, 0.4, 0.6, 0.9]
      }
    ]
  };

  const options = {
    plugins: {
      legend: {
        display: false
      }
    },
    elements: {
      line: {
        tension: 0.4,
        borderWidth: 2,
        borderColor: "#0177FB",
        fill: "start",
        backgroundColor: "rgba(1, 119, 251, 0.3)"
      },
      point: {
        radius: 0,
        hitRadius: 0
      }
    },
    scales: {
      xAxis: {
        display: false
      },
      yAxis: {
        display: false
      }
    }
  };

  return (
    <div>
      <Head>
        <title>Playground - Dashboard</title>
        <meta name="description" content="Playground - Dashboard" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.container}>
        <Card />
        <div className={styles.graphCard}>
          <div className={styles.graphInfo}>
            <p>Sales netto</p>
            <h1>306.20€</h1>
            <div className={styles.graphMetrics}>
              <h3>+1.3%</h3>&nbsp;
              <p>than last month</p>
            </div>
          </div>
          <Line
            className={styles.graph}
            data={data}
            width={70}
            height={20}
            options={options}
          />
        </div>
      </main>
    </div>
  );
}
