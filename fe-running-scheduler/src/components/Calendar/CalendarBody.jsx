import WeekDaysBar from "./WeekDaysBar";
import CalendarWeekRow from "./CalendarWeekRow";

const CalendarBody = ({ schedule, runs, notes, hideSchedule }) => {
  return (
    <div className="grid grid-cols-8 gap-2">
      <WeekDaysBar />
      <div className="text-center">Summary</div>
      <div className="col-span-8 border border-base-300"></div>

      {schedule
        ? Object.entries(schedule.weeks).map(([weekNumber, data]) => {
            return (
              <CalendarWeekRow
                key={weekNumber}
                weekNumber={weekNumber}
                scheduleDataWeek={data}
                runningDataWeek={runs.weeks[weekNumber]}
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
