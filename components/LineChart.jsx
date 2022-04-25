import { useEffect, useRef, useState } from "react";
import { Line } from "react-chartjs-2";
import styles from "../styles/LineChart.module.css";

function LineChart({ title, unit, rgbaColor, dataValue, growth }) {
  const lineRef = useRef();
  const [gradientColor, setGradientColor] = useState("");
  const [dataValues, setDataValues] = useState([]);
  const [borderColor, setBorderColor] = useState("");

  useEffect(() => {
    const gradientFill = lineRef.current.ctx.createLinearGradient(0, 0, 0, 150);
    gradientFill.addColorStop(0, `rgba(${rgbaColor},0.7)`);
    gradientFill.addColorStop(0.2, `rgba(${rgbaColor},0.5)`);
    gradientFill.addColorStop(0.45, `rgba(${rgbaColor},0.1)`);

    setGradientColor(gradientFill);
    setDataValues(dataValue);
    setBorderColor(`rgba(${rgbaColor},1`);
  }, []);

  const data = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        data: dataValues,
        backgroundColor: gradientColor,
        borderColor,
        fill: "start",
        tension: 0.3,
        borderWidth: 2
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
    <div className={styles.graphCard}>
      <div className={styles.graphInfo}>
        <p>{title}</p>
        <h1>{unit}</h1>
        <div className={styles.graphMetrics}>
          <h3
            className={growth.includes("+") ? styles.positive : styles.negative}
          >
            {growth}
          </h3>
          &nbsp;
          <p>than last month</p>
        </div>
      </div>
      <Line
        ref={lineRef}
        className={styles.graph}
        data={data}
        width={350}
        height={80}
        options={options}
      />
    </div>
  );
}

export default LineChart;
