import WeekDaysBar from "./WeekDaysBar";
import CalendarWeekRow from "./CalendarWeekRow";

const CalendarBody = ({ trainingData, runningData, activeCalendarId, notes, hideSchedule }) => {
  return (
    <div className="grid grid-cols-8 mx-4 gap-x-4 gap-y-1">
      <WeekDaysBar />
      {trainingData
        ? Object.entries(trainingData.weeks).map(([week, data]) => {
            return (
              <CalendarWeekRow
                key={week}
                weekNumber={week}
                week={data}
                runningDataWeek={runningData.weeks[week]}
                activeCalendarId={activeCalendarId}
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
