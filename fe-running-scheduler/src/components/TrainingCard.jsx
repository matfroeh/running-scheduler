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
    <div className="card card-compact border image-full bg-base-100 h-28 w-full hover:border-teal-400 cursor-pointer">
      <div className="items-start justify-self-end text-white text-xs mt-1 mr-2">{formattedDate}</div>
      <div className="card-body">
        <div className="card-title text-sm mt-1">{type}</div>
        {distance ? <p>{distance} km</p> : null}
      </div>
    </div>
  );
};

export default TrainingCard;
