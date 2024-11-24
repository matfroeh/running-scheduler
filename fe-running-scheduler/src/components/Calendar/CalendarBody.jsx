import WeekDaysBar from "./WeekDaysBar";
import CalendarWeekRow from "./CalendarWeekRow";

const CalendarBody = ({ schedule, runs, notes, hideSchedule }) => {
  return (
    <div className="grid md:grid-cols-8 grid-cols-8 mx-4 gap-x-4 gap-y-1">
      <WeekDaysBar />
      {schedule
        ? Object.entries(schedule.weeks).map(([week, data]) => {
            return (
              <CalendarWeekRow
                key={week}
                weekNumber={week}
                week={data}
                runningDataWeek={runs.weeks[week]}
                notes={notes}
                hideSchedule={hideSchedule}
              />
            );
          })
        : null}
    </div>
  );
};

export default CalendarBody;
