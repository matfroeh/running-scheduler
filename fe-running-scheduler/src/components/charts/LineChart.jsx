import { Line } from "react-chartjs-2";
import "chart.js/auto";

const LineChart = ({ xLabel, yFunction, yLabel, yAxisReversed }) => {
  const data = {
    labels: xLabel,
    datasets: [
      {
        label: yLabel,
        data: yFunction,
        fill: false,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
        yAxisID: "y1",
      },
    ],
  };
  const options = {
    scales: {
      y1: {
        reverse: yAxisReversed,
        // min: Math.round(Math.min.apply(null, yFunction) * 1.1),
        // max: Math.round(Math.max.apply(null, yFunction) * 1.5),
        // stepSize: 10,
        ticks: {
          beginAtZero: true,
        },
      },
      x: {},
    },
  };

  return (
    <div className="w-full">
      <Line data={data} options={options} />
    </div>
  );
};

export default LineChart;
