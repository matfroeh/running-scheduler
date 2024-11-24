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

  const cardClasses = `card card-compact min-w-28 max-w-44 bg-gray-950 ring-1 ring-accent rounded-tr-none rounded-br-none 
                      ${hideSchedule ? "row-span-1" : "row-span-2"} 
                      h-full hover:ring-2 cursor-pointer`;

  // Helper function to safely display values or fallback
  const renderValue = (value, suffix = "") =>
    value ? `${value}${suffix}` : "-";

  return (
    <div className={cardClasses}>
      <div className="card-body text-nowrap overflow-clip">
        <h2 className="card-title -mt-1 text-sm">{weekTitle}</h2>
        <div className="divide-y-4 divide-cyan-500 -mt-1">
          <p className="flex items-center gap-x-1 mb-1">
            <Icons type="goal" />
            {renderValue(totalDistancePlanned, " km")}
          </p>
          <p></p>
        </div>

        <div className="flex flex-col pt-4 space-y-2 ">
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
            {renderValue(getTempoAsMinutesSecondsString(avgPace), " /km")}
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
  );
};

export default SummaryCard;