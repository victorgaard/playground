import { Bar } from "react-chartjs-2";
import styles from "../styles/BarChart.module.css";

function BarChart({ title, dataValue1, dataValue2 }) {
  const data = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "Brutto",
        borderRadius: 30,
        data: dataValue1,
        backgroundColor: "#5DCBDE",
        barThickness: 10
      },
      {
        label: "Netto",
        borderRadius: 30,
        data: dataValue2,
        backgroundColor: "#0177fd",
        barThickness: 10
      }
    ]
  };

  const options = {
    plugins: {
      legend: {
        position: "bottom",
        align: "end",
        labels: {
          boxWidth: 8,
          usePointStyle: true,
          pointStyle: "circle"
        }
      }
    },
    elements: {
      bar: {
        barPercentage: 0.3,
        cetagoryPercentage: 1
      }
    },
    scales: {
      xAxis: {
        display: true
      },
      yAxis: {
        display: true,
        max: 1
      }
    }
  };

  return (
    <div className={styles.barChart}>
      <h1>{title}</h1>
      <Bar data={data} options={options} />
    </div>
  );
}

export default BarChart;
