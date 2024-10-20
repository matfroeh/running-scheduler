const SummaryCard = ({ week, weekNumber }) => {
  const totalDistance = Object.keys(week.days).reduce((acc, day) => {
    if (week.days[day].distance) {
      acc += week.days[day].distance;
    }
    return acc;
  }, 0);

  const weekTitle = `Week ${weekNumber.match(/\d+$/)[0]}`;

  return (
    <div
      className="card card-compact ring-1 ring-cyan-500 rounded-tr-none rounded-br-none row-span-2 
    image-full bg-base-100 h-full w-full hover:ring-2 cursor-pointer"
    >
      <div className="items-start justify-self-end text-white text-xs mt-1 mr-2"></div>
      <div className="card-body">
        <div className="card-title text-sm">{weekTitle ? weekTitle : ""}</div>
        <p>
          Total:{" "}
          <span className="inline-block">
            {totalDistance ? totalDistance : ""} km
          </span>{" "}
        </p>
      </div>
    </div>
  );
};

export default SummaryCard;
