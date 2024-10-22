const SummaryCard = ({ scheduleWeek, runningWeek, weekNumber }) => {
  const totalDistancePlanned = Object.keys(scheduleWeek.days).reduce(
    (acc, day) => {
      if (scheduleWeek.days[day].distance) {
        acc += scheduleWeek.days[day].distance;
      }
      return Math.round(parseFloat(acc));
    },
    0
  );

  const totalDistanceRun = Object.keys(runningWeek.days).reduce((acc, day) => {
    if (runningWeek.days[day].distance) {
      acc += runningWeek.days[day].distance;
    }
    return Math.round(parseFloat(acc));
  }, 0);

  const weekTitle = `Week ${weekNumber.match(/\d+$/)[0]}`;

  return (
    <div
      className="card card-compact ring-1 ring-cyan-500 rounded-tr-none rounded-br-none row-span-2 
    image-full bg-base-100 h-full w-full hover:ring-2 cursor-pointer"
    >
      <div className="items-start justify-self-end text-white"></div>
      <div className="card-body">
        <div className="card-title text-sm">{weekTitle ? weekTitle : ""}</div>
        <div className="flex flex-col justify-center h-full divide-y-2 divide-cyan-500">
          <div>
            Planned:{" "}
            <span className="inline-block">
              {totalDistancePlanned ? totalDistancePlanned : ""} km
            </span>{" "}
          </div>
          <div>
            Run:{" "}
            <span className="inline-block">
              {totalDistanceRun ? totalDistanceRun : ""} km
            </span>{" "}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryCard;
