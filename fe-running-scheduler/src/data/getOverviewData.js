import { calculateSummariesForOverview } from './calculateSummariesForOverview';

  // Creates an array of objects with the title, start date and array of weeks containing the summaries of each week
export const getOverviewData = (runs) => {
    let summariesArray = [];
    for (const block of runs) {
      summariesArray.push(
        {
          title: block.meta.title,
          startDate: block.meta.startDate,
          endDate: block.meta.endDate,
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