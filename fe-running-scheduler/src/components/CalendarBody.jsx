import WeekDaysBar from "./WeekDaysBar";
import CalendarWeekRow from "./CalendarWeekRow";

const CalendarBody = ({ trainingData, runningData }) => {
  if (Object.keys(trainingData).length === 0) {
    trainingData = "";
  }
  // console.log(data);

  return (
    <div className="grid grid-cols-8 mx-4 gap-x-4 gap-y-2">
      {/* ToDo: what about displaying special days in the header? */}
      <WeekDaysBar />
      {trainingData
        ? Object.entries(trainingData).map(([week, data]) => {
          // ToDo: (x) we should redo this, e.g. having a separate week property with only the weeks inside. We can rearrange title to sth. like metaData
          // ToDo: now everything is in meta, weeks are still in the main object
            if (week === "meta") return;
            // ToDo (x): this will be now quite delicate as we will use the trainingData also for creating the running cards
            // and we will pass as well the needed property (date I guess) from the runningData to the RunCard
            // ToDo: check if this might lead to issues
            return <CalendarWeekRow key={week} weekNumber={week} week={data} runningDataWeek={runningData[week]} />;
          })
        : null}
    </div>
  );
};

export default CalendarBody;
