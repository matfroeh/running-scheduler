import { Line } from "react-chartjs-2";
import "chart.js/auto";

// adjusted for displaying the time-velocity diagram in the run details modals
const LineChartTimeVelocity = ({
  xLabel,
  yFunction,
  yLabel,
  yAxisReversed,
  color,
}) => {
  const data = {
    labels: xLabel,
    datasets: [
      {
        label: yLabel,
        data: yFunction,
        fill: false,
        // backgroundColor: "rgba(75,192,192,0.2)",
        backgroundColor: color,
        borderColor: color,
        // borderColor: "rgba(75,192,192,1)",
        yAxisID: "y1",
        borderWidth: 2,
        pointRadius: 0,
      },
    ],
  };
  const options = {
    scales: {
      y1: {
        reverse: yAxisReversed,
        // min: 3,
        max: 10,
        // stepSize: 0.5,
        ticks: {
          beginAtZero: true,
        },
      },
      x: {},
    },
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <Line data={data} options={options} />
    </div>
  );
};

export default LineChartTimeVelocity;
