const TrainingCard = ({ data }) => {
  if (Object.keys(data).length === 0) {
    data = "";
  }
  const { date, type, distance } = data;

  // console.log("Training Card:", date, type, distance);

  const formattedDate = new Intl.DateTimeFormat("en-UK", {
    month: "numeric",
    day: "numeric",
  }).format(Date.parse(date));

  return (
    <div
      className="card card-compact rounded-br-none rounded-bl-none rounded-tr-none 
    ring-2 image-full bg-base-100 h-20 overflow-hidden w-full hover:ring-4 cursor-pointer"
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
