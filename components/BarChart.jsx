import { Bar } from "react-chartjs-2";
import styles from "../styles/BarChart.module.css";

function BarChart({ title, date, dataValue1, dataValue2 }) {
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
          pointStyle: "circle",
          font: {
            family: "Manrope"
          }
        }
      },
      tooltip: {
        padding: 12,
        bodyFont: {
          family: "Manrope"
        },
        titleFont: {
          family: "Manrope"
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
        display: true,
        grid: { lineWidth: 0, borderWidth: 0 },
        ticks: {
          font: {
            family: "Manrope"
          }
        }
      },
      yAxis: {
        display: true,
        max: 1,
        grid: { borderWidth: 0, color: "#e8ecf5" },
        ticks: {
          font: {
            family: "Manrope"
          }
        }
      }
    }
  };

  return (
    <div className={styles.barChart}>
      <div className={styles.container}>
        <h1>{title}</h1>
        <p>{date}</p>
      </div>
      <Bar data={data} options={options} />
    </div>
  );
}

export default BarChart;
