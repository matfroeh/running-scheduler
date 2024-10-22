import WeekDaysBar from "./WeekDaysBar";
import CalendarWeekRow from "./CalendarWeekRow";

const CalendarBody = ({ trainingData, runningData, activeCalendarId }) => {
  // if (Object.keys(trainingData).length === 0) {
  //   trainingData = "";
  // }


  return (
    <div className="grid grid-cols-8 mx-4 gap-x-4 gap-y-1">
      <WeekDaysBar />
      {trainingData
        ? Object.entries(trainingData.weeks).map(([week, data]) => {
            if (week === "meta") return;
            // ToDo (x): this will be now quite delicate as we will use the trainingData also for creating the running cards
            // and we will pass as well the needed property (date I guess) from the runningData to the RunCard
            // ToDo: check if this might lead to issues
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
