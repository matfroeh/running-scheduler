const CalendarBody = ( {data} ) => {
  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const weekDaysBar = daysOfWeek.map((day) => {
    return (
      <div key={day} className="text-left">
        {day}
      </div>
    );
  });

  

  return (
    <div className="grid grid-cols-8 mx-4 gap-2">
      {weekDaysBar}
      <div className="text-center">Summary</div>
      <div className="col-span-8 border border-base-300"></div>
      <div className="card card-compact image-full bg-base-100 w-32 hover:border-2 border-teal-400 cursor-pointer">
        <div className="card-body">
          <div className="card-title text-sm">Easy Run</div>
          <p>10 km</p>
        </div>
      </div>
      <div className="card card-compact image-full bg-base-100 w-32 hover:border-2 border-teal-400 cursor-pointer">
        <div className="card-body">
          <div className="card-title text-sm">Easy Run</div>
          <p>10 km</p>
        </div>
      </div>
      <div className="col-span-5"></div>
      <div className="card card-compact image-full bg-base-100 w-32">
        <div className="card-body">
          <p>Distance:</p>
          <p>10 km / 50 km</p>
          <p>Avg. HR: 135</p>
          <p>Weighted Effort: 5</p>
        </div>
      </div>
    </div>
  );
};

export default CalendarBody;
