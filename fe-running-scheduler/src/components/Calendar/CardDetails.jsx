import {
  getTempoAsMinutesSecondsString,
  getSecondsAsHoursMinutesSecondsString,
} from "@/utils/processRunningDataHelper.js";
import { Icons } from "@/components";

const CardDetails = ({ data, hideSchedule }) => {
  const { distance, duration, tempo, avg_hr, effort, comments } = data;

  const baseCommentsClass = "text-wrap mt-0";
  const hideScheduleClass = hideSchedule ? "line-clamp-6" : "line-clamp-2";

  return (
    <div className="flex flex-col lg:flex-wrap lg:flex-row text-nowrap gap-1 my-0.5">
      {distance && (
        <p className="flex items-center gap-x-1">
          <Icons type="distance" />
          {parseFloat(distance).toFixed(1)} km
        </p>
      )}
      {duration && (
        <p className="flex items-center gap-x-1">
          <Icons type="time" />
          {getSecondsAsHoursMinutesSecondsString(duration)}
        </p>
      )}
      {tempo && (
        <p className="flex items-center gap-x-1">
          <Icons type="speed" />
          <span>{getTempoAsMinutesSecondsString(tempo)}/km</span>
        </p>
      )}
      {avg_hr && (
        <p className="flex items-center gap-x-1">
          <Icons type="heartRate" />
          {avg_hr}
        </p>
      )}
      {effort && (
        <p className="flex items-center gap-x-1">
          <Icons type="effort" />
          {effort}/10
        </p>
      )}
      {comments && (
        <span className={`${baseCommentsClass} ${hideScheduleClass}`}>
          {comments}
        </span>
      )}
    </div>
  );
};

export default CardDetails;
