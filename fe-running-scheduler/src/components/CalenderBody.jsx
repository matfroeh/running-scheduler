const CalenderBody = () => {
  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const weekDaysBar = daysOfWeek.map((day) => {
    return (
      <div key={day} className="text-left">
        {day}
      </div>
    );
  });

  const data = {
    "block-07-2024-09-2024": {
      week1: {
        plan: {
          "2024-07-01": {
            type: "10k race",
            distance: 10,
            unit: "km",
            description: "Goal Pace 4:45/km.",
          },
          "2024-07-03": {
            type: "easy run",
            distance: 6,
            unit: "km",
            description: "none",
          },
        },

        run: {
          "2024-07-01": {
            type: "easy run",
            distance: 10,
            unit: "km",
            duration: "47:00",
            tempo: "4:45 min/km",
            effort: 7,
            avg_hr: 155,
            comments: "All good.",
            equipment: "Brooks Hyperion",
          },
          "2024-07-03": {
            type: "10k race",
            distance: 6,
            unit: "km",
            duration: "36:00",
            tempo: "6:00 min/km",
            effort: 3,
            avg_hr: 132,
            comments: "Easy recovery run.",
            equipment: "Saucony Guide 16",
          },
        },
      },
      week2: {
        plan: {},
        run: {},
      },
    },
  };

  return (
    <div className="grid grid-cols-8 mx-4 gap-2">
      {weekDaysBar}
      <div className="text-center">Summary</div>
      <div className="col-span-8 border border-base-300"></div>
      <div className="card card-compact image-full bg-base-100 w-32 hover:border-2 border-teal-400 cursor-pointer">
        <figure className=""></figure>
        <div className="card-body">
          <div className="card-title text-sm">Easy Run</div>
          <p>10 km</p>
        </div>
      </div>
      <div className="card card-compact image-full bg-base-100 w-32 hover:border-2 border-teal-400 cursor-pointer">
        <figure className=""></figure>
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

export default CalenderBody;
