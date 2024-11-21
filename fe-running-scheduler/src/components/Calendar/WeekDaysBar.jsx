const WeekDaysBar = () => {
  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const weekDaysBar = daysOfWeek.map((day) => (
    <div key={day} className="text-left">
      {day}
    </div>
  ));

  return (
    <>
      {weekDaysBar}
      <div className="text-center">Summary</div>
      <div className="col-span-8 border border-base-300"></div>
    </>
  );
};

export default WeekDaysBar;
