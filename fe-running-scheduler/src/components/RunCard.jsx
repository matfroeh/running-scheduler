import {
  getTempoAsMinutesSecondsString,
  getSecondsAsHoursMinutesSecondsString,
} from "../data/processRunningDataHelper.js";

const RunCard = ({ data, openRunCard }) => {
  // if (Object.keys(data).length === 0) {
  //   data = "";
  // }
  const { date, name, distance, duration, tempo, avg_hr, comments, effort } = data;

  let isToday = false;
  date &&
    (isToday =
      new Date(date).toISOString().slice(0, 10) ===
      new Date(Date.now()).toISOString().slice(0, 10));

  // const formattedDate = new Intl.DateTimeFormat("en-UK", {
  //   month: "numeric",
  //   day: "numeric",
  // }).format(Date.parse(date));
  return (
    // <div className="card card-compact bg-base-100 h-24 w-full hover:border-2 border-teal-400 cursor-pointer">
    <div
      className={
        isToday
          ? "bg-gray-900 card card-compact rounded-tr-none rounded-br-none rounded-tl-none ring-2 ring-green-500 h-36 w-full hover:ring-4 cursor-pointer"
          : "bg-gray-900 card card-compact rounded-tr-none rounded-br-none rounded-tl-none ring-2 h-36 w-full hover:ring-4 cursor-pointer"
      }
      onClick={openRunCard}
    >
      {/* <div className="items-end flex justify-end text-white text-xs mt-1 mr-2">
        {formattedDate}
      </div> */}
      <div className="card-body flex  flex-col">
        <div className="card-title flex-auto text-sm">{name}</div>
        <div className="flex flex-col justify-between flex-auto text-xs">
          {distance && <span>{parseFloat(distance).toFixed(1)} km</span>}
          {duration && (
            <span>Time: {getSecondsAsHoursMinutesSecondsString(duration)}</span>
          )}
          {tempo && <span>Pace: {getTempoAsMinutesSecondsString(tempo)} min/km</span>}
          {avg_hr && <span>HR: {avg_hr} bpm</span>}
          {/* {comments && <span className="line-clamp-2">{comments}</span>} */}
          {effort && <span >Effort: {effort}/10</span>}
        </div>
      </div>
    </div>
    // </div>
  );
};

export default RunCard;
