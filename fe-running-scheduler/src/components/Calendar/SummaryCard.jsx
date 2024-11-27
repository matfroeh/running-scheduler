import { getTempoAsMinutesSecondsString } from "@/utils/processRunningDataHelper.js";
import { calculateWeeklySummary } from "@/utils/calculateWeeklySummary.js";
import { Icons } from "@/components";

const SummaryCard = ({
  scheduleWeek,
  runningWeek,
  weekNumber,
  hideSchedule,
}) => {
  const weekTitle = `Week ${weekNumber.match(/\d+$/)[0]}`;
  const {
    totalDistancePlanned = 0,
    totalDistanceRun = 0,
    avg_hr = null,
    avgEffort = null,
    totalTimeFormatted = "",
    avgPace = null,
  } = calculateWeeklySummary(scheduleWeek, runningWeek);

  // const cardClasses = `card card-compact mt-0.5 mr-0.5 min-w-28 max-w-44 bg-gray-950 ring-1 ring-accent rounded-tr-none rounded-br-none
  //                     ${hideSchedule ? "row-span-1" : "row-span-2"}
  //                     h-full`;
  const cardClasses = `card card-compact mt-0.5 mr-0.5 max-w-44 bg-gray-950 ring-1 ring-accent rounded-tr-none rounded-br-none h-full`;

  // Helper function to display values or fallback
  const renderValue = (value, suffix = "") =>
    value ? `${value}${suffix}` : "-";

  return (
    <div className={cardClasses}>
      {/* <div className="card-body text-nowrap overflow-clip"> */}
      <div className="flex flex-col justify-start overflow-clip">
        <div className="mx-2 mt-3 mb-1 flex flex-col gap-0 justify-start text-xs">
          <h2 className="card-title -mt-1 text-xs md:text-sm">{weekTitle}</h2>
          <div className="divide-y-4 divide-cyan-500">
            <p className="flex items-center gap-x-1 mb-2">
              <Icons type="goal" />
              {renderValue(totalDistancePlanned, " km")}
            </p>
            <p></p>
          </div>

          {/* <div className="flex flex-col pt-4 space-y-2 "> */}
          <div className="flex flex-col justify text-nowrap gap-1 pt-4">
            <p className="flex items-center gap-x-1">
              <Icons type="distance" />
              {renderValue(Math.round(totalDistanceRun), " km")}
            </p>
            <p className="flex items-center gap-x-1">
              <Icons type="time" />
              {renderValue(totalTimeFormatted)}
            </p>
            <p className="flex items-center gap-x-1">
              <Icons type="speed" />
              {renderValue(getTempoAsMinutesSecondsString(avgPace), "/km")}
            </p>
            <p className="flex items-center gap-x-1">
              <Icons type="heartRate" />
              {renderValue(Math.round(avg_hr))}
            </p>
            <p className="flex items-center gap-x-1">
              <Icons type="effort" />
              {renderValue(Math.round(avgEffort), "/10")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryCard;
