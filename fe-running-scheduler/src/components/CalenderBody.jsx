const Calender = () => {
  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const weekDaysBar = daysOfWeek.map((day) => {
    return (
      <div key={day} className="text-left">
        {day}
      </div>
    );
  });

  return (
    <div className="grid grid-cols-8 mx-4">
      {weekDaysBar}
      <div className="text-center">Summary</div>
    </div>
  );
};

export default Calender;
