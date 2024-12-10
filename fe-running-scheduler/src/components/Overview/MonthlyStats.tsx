import { RunningCalendar } from "@/types";
import { runDataCollector, getSummaryFromRunDataArray } from "@/lib";

const MonthlyStats = ({
  runningCalendarList,
}: {
  runningCalendarList: RunningCalendar[];
}) => {
  const today = new Date();
  const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
  const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);
  console.log("firstDay", firstDay);
  console.log("lastDay", lastDay);

  const runDataThisMonth = runDataCollector(
    firstDay,
    lastDay,
    runningCalendarList
  );

  console.log("runDataThisMonth", runDataThisMonth);

  const summaryThisMonth = getSummaryFromRunDataArray(runDataThisMonth);

  console.log("summaryThisMonth", summaryThisMonth);

  return (
    <div>
      <h2>Monthly Stats</h2>
      <p>Total Distance: {summaryThisMonth.totalDistance}</p>
      <p>Total Time: {summaryThisMonth.totalTime}</p>
      <p>Weekly Distance: {summaryThisMonth.weeklyDistance}</p>
      <p>Weekly Time: {summaryThisMonth.weeklyTime}</p>
      <p>Avg Tempo: {summaryThisMonth.avgTempo}</p>
      <p>Avg HR: {summaryThisMonth.avg_hr}</p>
      <p>Avg Effort: {summaryThisMonth.avgEffort}</p>
      <p>Number of Weeks: {summaryThisMonth.numberOfWeeks}</p>
    </div>
  );
};

export default MonthlyStats;
