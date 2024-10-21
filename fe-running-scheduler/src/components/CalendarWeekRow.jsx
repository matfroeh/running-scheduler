import TrainingCard from "./TrainingCard";
import SummaryCard from "./SummaryCard";
import RunCard from "./RunCard";

const CalendarWeekRow = ({ week, weekNumber, runningDataWeek }) => {
  if (Object.keys(week).length === 0) {
    week = "";
  }

  return (
    <>
      {week
        ? Object.entries(week.days).map(([day, data]) => {
            return <TrainingCard key={day} data={data} />;
          })
        : null}
      <SummaryCard week={week} weekNumber={weekNumber} />
      {runningDataWeek
        ? Object.entries(runningDataWeek.days).map(([day, data]) => {
            return <RunCard key={day} data={data} />;
          })
        : null}
      <div className="col-span-8 border-y-8 border-base-300"></div>
    </>
  );
};

export default CalendarWeekRow;
