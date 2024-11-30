const WeekDaysBar = () => {
  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const weekDaysBar = daysOfWeek.map((day) => (
    <div key={day} className="text-left text-xs md:text-sm ml-3">
      {day}
    </div>
  ));

  return (
    <>
      {weekDaysBar}
    </>
  );
};

export default WeekDaysBar;
