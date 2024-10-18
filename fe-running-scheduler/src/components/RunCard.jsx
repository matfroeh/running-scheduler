const RunCard = ({ data }) => {
  const { date } = data;

  const formattedDate = new Intl.DateTimeFormat("en-UK", {
    month: "numeric",
    day: "numeric",
  }).format(Date.parse(date));
  return (
    // <div className="card card-compact bg-base-100 h-24 w-full hover:border-2 border-teal-400 cursor-pointer">
    <div className="card card-compact bg-base-100 h-28 w-full hover:border-teal-400 cursor-pointer">

      <div className="items-end flex justify-end text-white opacity-10 text-xs mt-1 mr-2">
        {formattedDate}
      </div>
      <div className="card-body">
        <div className="card-title text-sm mt-1">
          {/* <p>+ Upload .gpx</p> */}
        </div>
      </div>
    </div>
  );
};

export default RunCard;
