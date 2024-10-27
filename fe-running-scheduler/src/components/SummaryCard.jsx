import { getTempoAsMinutesSecondsString } from "../data/processRunningDataHelper.js";
import { calculateWeeklySummary } from "../data/calculateWeeklySummary.js";

const SummaryCard = ({ scheduleWeek, runningWeek, weekNumber, show }) => {
  const weekTitle = `Week ${weekNumber.match(/\d+$/)[0]}`;
  const {
    totalDistancePlanned,
    totalDistanceRun,
    avg_hr,
    avgEffort,
    totalTimeFormatted,
    avgPace,
  } = calculateWeeklySummary(scheduleWeek, runningWeek);

  return (
    <div
      className={
        show
          ? "card card-compact bg-gray-950 ring-1 ring-cyan-500 rounded-tr-none rounded-br-none row-span-2 h-full w-full hover:ring-2 cursor-pointer"
          : "card card-compact bg-gray-950 ring-1 ring-cyan-500 rounded-tr-none rounded-br-none row-span-1 h-full w-full hover:ring-2 cursor-pointer"
      }
    >
      <div className="items-start justify-self-end text-white"></div>
      <div className="card-body">
        <div className="card-title text-sm">{weekTitle ? weekTitle : ""}</div>
        <div className="flex flex-col justify-center h-full divide-y-2 divide-cyan-500">
          <div className="pb-2">
            Planned:{" "}
            <div className="inline-block">
              {totalDistancePlanned ? totalDistancePlanned + " km" : ""}
            </div>
          </div>
          <div className="w-full flex flex-col pt-4">
            <div className="inline-block">
              Performed:{" "}
              {totalDistanceRun ? Math.round(totalDistanceRun) + " km" : ""}
            </div>
            <div className="inline-block">
              Time: {totalDistanceRun ? totalTimeFormatted : ""}{" "}
            </div>
            <div className="inline-block">
              Pace:{" "}
              {totalDistanceRun
                ? getTempoAsMinutesSecondsString(avgPace) + " min/km"
                : ""}
            </div>
            <div className="inline-block">
              HR: {avg_hr ? Math.round(avg_hr) + " bpm" : ""}
            </div>
            <div className="inline-block">
              Effort: {avgEffort ? Math.round(avgEffort) + "/10" : ""}{" "}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryCard;

// const totalDistancePlanned = Object.keys(scheduleWeek.days).reduce(
//   (acc, day) => {
//     if (scheduleWeek.days[day].distance) {
//       acc += parseFloat(scheduleWeek.days[day].distance);
//     }
//     return Math.round(parseFloat(acc));
//   },
//   0
// );

// const totalDistanceRun = Object.keys(runningWeek.days).reduce((acc, day) => {
//   if (runningWeek.days[day].distance) {
//     acc += parseFloat(runningWeek.days[day].distance);
//   }
//   return parseFloat(acc);
// }, 0);

// const totalTime = Object.keys(runningWeek.days).reduce((acc, day) => {
//   if (runningWeek.days[day].duration > 0) {
//     acc += parseInt(runningWeek.days[day].duration);
//   }
//   return acc;
// }, 0);

// const getAvgHr = () => {
//   let avg_hr = Object.keys(runningWeek.days).reduce(
//     (acc, day) => {
//       if (parseInt(runningWeek.days[day].avg_hr)) {
//         acc.days += 1;
//         acc.hr += parseInt(runningWeek.days[day].avg_hr);
//       }
//       return acc;
//     },
//     { days: 0, hr: 0 }
//   );
//   if (avg_hr.days > 0) {
//     return avg_hr.hr / avg_hr.days;
//   }
//   return 0;
// };

// const getEffort = () => {
//   let totalEffort = Object.keys(runningWeek.days).reduce(
//     (acc, day) => {
//       if (runningWeek.days[day].effort) {
//         acc.days += 1;
//         acc.effort += parseInt(runningWeek.days[day].effort);
//       }
//       return acc;
//     },
//     { days: 0, effort: 0 }
//   );
//   if (totalEffort.days > 0)
//     return totalEffort.effort / totalEffort.days;
// };

// const totalTimeFormatted = getSecondsAsHoursMinutesSecondsString(totalTime);
// const avgPace = parseFloat(totalTime / 60 / totalDistanceRun).toFixed(2);
// const avg_hr = getAvgHr();
// const avgEffort = getEffort();
// console.log(totalDistanceRun, totalTime);
