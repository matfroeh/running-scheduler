import { getTempoAsMinutesSecondsString } from "@/utils/processRunningDataHelper.js";
import { calculateWeeklySummary } from "@/utils/calculateWeeklySummary.js";
import { Icons } from "@/components";

const SummaryCard = ({
  scheduleWeek,
  runningWeek,
  weekNumber,
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

  const cardClasses = `card card-compact mr-0.5 min-w-24 max-w-40 bg-gray-950 ring-1 ring-accent rounded-tr-none rounded-br-none h-full`;

  // Helper function to display values
  const renderValue = (value, suffix = "") =>
    value ? `${value}${suffix}` : "-";

  return (
    <div className={cardClasses}>
      <div className="flex flex-col justify-start overflow-clip">
        <div className="mx-4 mt-4 mb-2 flex flex-col gap-0 justify-start text-xs">
          <h2 className="card-title -mt-1 text-xs md:text-sm">{weekTitle}</h2>
          <div className="divide-y-4 divide-cyan-500">
            <p className="flex items-center text-nowrap gap-x-1 mb-2">
              <Icons type="goal" />
              {renderValue(totalDistancePlanned, " km")}
            </p>
            <p></p>
          </div>
          <div className="flex flex-col text-nowrap gap-1 pt-4">
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
