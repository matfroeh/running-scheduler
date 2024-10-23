import WeekDaysBar from "./WeekDaysBar";
import CalendarWeekRow from "./CalendarWeekRow";

const CalendarBody = ({ trainingData, runningData, activeCalendarId }) => {
  // Remember to not uncomment this
  // console.log("keys", Object.keys(trainingData).length);
  // if (Object.keys(trainingData).length === 0) {    
  //   trainingData = false;
  // }

  return (
    <div className="grid grid-cols-8 mx-4 gap-x-4 gap-y-1">
      <WeekDaysBar />
      {trainingData
        ? Object.entries(trainingData.weeks).map(([week, data]) => {
            if (week === "meta") return;

            return (
              <CalendarWeekRow
                key={week}
                weekNumber={week}
                week={data}
                runningDataWeek={runningData.weeks[week]}
                activeCalendarId={activeCalendarId}
              />
            );
          })
        : null}
    </div>
  );
};

export default CalendarBody;
