const RunCard = ({ data, openRunCard }) => {
  // if (Object.keys(data).length === 0) {
  //   data = "";
  // }
  const { date, name, distance, duration, tempo } = data;

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
          ? "card card-compact rounded-tr-none rounded-br-none rounded-tl-none ring-2 ring-green-500  bg-base-100 h-36 w-full hover:ring-4 cursor-pointer"
          : "card card-compact rounded-tr-none rounded-br-none rounded-tl-none ring-2 bg-base-100 h-36 w-full hover:ring-4 cursor-pointer"
      }
      onClick={openRunCard}
    >
      {/* <div className="items-end flex justify-end text-white text-xs mt-1 mr-2">
        {formattedDate}
      </div> */}
      <div className="card-body flex  flex-col">
        <div className="card-title flex-auto text-sm">{name}</div>
        <div className="flex flex-col justify-between flex-auto text-xs">
          {name && (
            <>
              <span>{parseFloat(distance).toFixed(2)} km</span>
              <span>{parseFloat(duration).toFixed(2)} mm:ss</span>
              <span>{parseFloat(tempo).toFixed(2)} min/km</span>
              {/* <span>{speed} km/h</span> */}
            </>
          )}
        </div>
      </div>
    </div>
    // </div>
  );
};

export default RunCard;
