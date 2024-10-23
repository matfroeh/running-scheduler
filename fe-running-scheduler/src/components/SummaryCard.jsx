const SummaryCard = ({ scheduleWeek, runningWeek, weekNumber }) => {
  const totalDistancePlanned = Object.keys(scheduleWeek.days).reduce(
    (acc, day) => {
      if (scheduleWeek.days[day].distance) {
        acc += parseFloat(scheduleWeek.days[day].distance);
      }
      return Math.round(parseFloat(acc));
    },
    0
  );

  const totalDistanceRun = Object.keys(runningWeek.days).reduce((acc, day) => {
    if (runningWeek.days[day].distance) {
      acc += parseFloat(runningWeek.days[day].distance);
    }
    return Math.round(parseFloat(acc));
  }, 0);

  const weekTitle = `Week ${weekNumber.match(/\d+$/)[0]}`;

  return (
    <div
      className="card card-compact bg-gray-800 ring-1 ring-cyan-500 rounded-tr-none rounded-br-none row-span-2 
    h-full w-full hover:ring-2 cursor-pointer"
    >
      {/* <div
      className="card card-compact ring-1 ring-cyan-500 rounded-tr-none rounded-br-none row-span-2 
    image-full bg-base-100 h-full w-full hover:ring-2 cursor-pointer"
    > */}

      <div className="items-start justify-self-end text-white"></div>
      <div className="card-body">
        <div className="card-title text-sm">{weekTitle ? weekTitle : ""}</div>
        <div className="flex flex-col justify-center h-full divide-y-2 divide-cyan-500">
          <div>
            Planned:{" "}
            <div className="inline-block">
              {totalDistancePlanned ? totalDistancePlanned + " km" : ""}
            </div>
          </div>
          <div className="w-full flex flex-col">
            <div className="inline-block">
              Run: {totalDistanceRun ? totalDistanceRun + " km" : ""}
            </div>
            <div className="inline-block">Time:</div>
            <div className="inline-block">Pace:</div>
            <div className="inline-block">HR:</div>
            <div className="inline-block">Effort:</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryCard;
