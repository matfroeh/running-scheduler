const TrainingCard = ({ data, openTrainingCard }) => {
  // if (Object.keys(data).length === 0) {
  //   data = "";
  // }
  const { date, type, distance, description } = data;

  let isToday = false;
  date &&
    (isToday =
      new Date(date).toISOString().slice(0, 10) ===
      new Date(Date.now()).toISOString().slice(0, 10));

  const formattedDate = new Intl.DateTimeFormat("en-UK", {
    month: "numeric",
    day: "numeric",
  }).format(Date.parse(date));

  return (
    <div
      className={
        isToday
          ? "ring-green-500 bg-gray-900 card card-compact rounded-br-none rounded-bl-none rounded-tr-none ring-2 w-full hover:ring-4 cursor-pointer"
          : "bg-gray-800 card card-compact rounded-br-none rounded-bl-none rounded-tr-none ring-2 w-full hover:ring-4 cursor-pointer"
      }
      onClick={openTrainingCard}
    >
      <div className="card-body justify-start gap-0 overflow-clip relative">
        <div className="absolute top-0 right-0 text-white text-xs mt-1 mr-2">
          {formattedDate}
        </div>
        <div className="flex flex-col mt-1">
          {type && <div className="card-title text-sm min-w-max">{type}</div>}
          <div className="flex flex-wrap gap-2">
            {distance && <div className="text-nowrap">{distance} km</div>}
            {description && (
              <div className="line-clamp-1">{description}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainingCard;
