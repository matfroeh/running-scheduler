import { Line } from "react-chartjs-2";
import "chart.js/auto";
import {
getAllWeeksXAxis,
getAllWeeklyPace,
getAllWeeklyHeartRate,
} from "../../data/getOverviewData.js";

const LineChartAllWeeksPaceHeartRate = ({ overviewData }) => {

  const data = {
    labels: getAllWeeksXAxis(overviewData),
    datasets: [
      {
        label: "Weekly Pace (min/km)",
        data: getAllWeeklyPace(overviewData),
        fill: false,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
        yAxisID: "y1",
      },
      {
        label: "Weekly Heart Beat (bpm)",
        data: getAllWeeklyHeartRate(overviewData),
        fill: false,
        borderColor: "#742774",
        yAxisID: "y2",
      },
    ],
  };
  const options = {
    scales: {
      y1: {
        // min: Math.round(Math.min.apply(null, getAllWeeklyPace(overviewData))),
        // max: Math.round(Math.max.apply(null, getAllWeeklyPace(overviewData)) * 1.05),
        stepSize: 10,
        ticks: {
          beginAtZero: true,
        },
      },
      y2: {
        // min: Math.round(Math.min.apply(null, getAllWeeklyHeartRate(overviewData))),
        // max: Math.round(Math.max.apply(null, getAllWeeklyHeartRate(overviewData)) * 1.1),
        stepSize: 30,
        position: "right",
        ticks: {
          beginAtZero: true,
        },
      },
      x: {},
    },
  };

  return (
    <div className="w-full">
      <Line id={overviewData.title} data={data} options={options} />{" "}
    </div>
  );
};

export default LineChartAllWeeksPaceHeartRate;
