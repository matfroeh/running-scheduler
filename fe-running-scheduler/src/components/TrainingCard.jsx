const TrainingCard = ({ data, openTrainingCard }) => {
  // if (Object.keys(data).length === 0) {
  //   data = "";
  // }
  const { date, type, distance } = data;

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
          ? "card card-compact rounded-br-none rounded-bl-none rounded-tr-none ring-2 ring-green-500  h-20 overflow-hidden w-full hover:ring-4 cursor-pointer"
          : "card card-compact rounded-br-none rounded-bl-none rounded-tr-none ring-2 h-20 overflow-hidden w-full hover:ring-4 cursor-pointer"
      }
      onClick={openTrainingCard}
    >
      <div className="items-start justify-self-end text-white text-xs mt-1 mr-2">
        {formattedDate}
      </div>
      <div className="card-body">
        <div className="card-title text-sm mt-1">{type}</div>
        {distance ? <p>{distance} km</p> : null}
      </div>
    </div>
  );
};

export default TrainingCard;
