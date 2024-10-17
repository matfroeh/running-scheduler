const SummaryCard = ({ week, weekNumber }) => {
  const totalDistance = Object.keys(week).reduce((acc, day) => {
    if (week[day].distance) {
      acc += week[day].distance;
    }
    return acc;
  }, 0);

  console.log(totalDistance);

  return (
    <div className="card card-compact border row-span-2 image-full bg-base-100 h-full w-full hover:border-teal-400 cursor-pointer">
      <div className="items-start justify-self-end text-white text-xs mt-1 mr-2"></div>
      <div className="card-body">
        <div className="card-title text-sm">{weekNumber}</div>
        <p>Total: <span className="inline-block">{totalDistance} km</span> </p>
      </div>
    </div>
  );
};

export default SummaryCard;
