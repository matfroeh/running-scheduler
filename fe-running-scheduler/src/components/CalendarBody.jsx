import WeekDaysBar from "./WeekDaysBar";
import CalendarWeekRow from "./CalendarWeekRow";

const CalendarBody = ({ data }) => {
  if (Object.keys(data).length === 0) {
    data = "";
  }
  console.log(data);

  return (
    <div className="grid grid-cols-8 mx-4 gap-x-4 gap-y-2">
      {/* ToDo: what about displaying special days in the header? */}
      <WeekDaysBar />
      {data
        ? Object.entries(data).map(([week, data]) => {
            if (week === "title") return;
            return <CalendarWeekRow key={week} weekNumber={week} week={data} />;
          })
        : null}
    </div>
  );
};

export default CalendarBody;
