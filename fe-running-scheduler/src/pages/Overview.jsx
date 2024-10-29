import { calculateSummariesForOverview } from "../data/calculateSummariesForOverview";
import { useLoaderData } from "react-router-dom";

const Overview = () => {
  // Arrays of the schedule and the running part of the training blocks
  const { loadedRuns } = useLoaderData();

  // console.log(loadedRuns);

  // Creates an array of objects with the title, start date and array of weeks containing the summaries of each week
  const getOverviewData = (runs) => {
    let summariesArray = [];
    for (const block of runs) {
      summariesArray.push(
        {
          title: block.meta.title,
          startDate: block.meta.startDate,
          weeks: [],
        },
      );
      Object.entries(block.weeks).map(([, data]) => {
        // console.log(week);
        summariesArray[summariesArray.length - 1].weeks.
        push(calculateSummariesForOverview(data));
      });
    }
    console.log(summariesArray);
    return summariesArray;
  };

  getOverviewData(loadedRuns);

  return <div>Overview</div>;
};

export default Overview;
