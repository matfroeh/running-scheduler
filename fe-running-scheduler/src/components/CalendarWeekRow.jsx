import TrainingCard from "./TrainingCard";
import SummaryCard from "./SummaryCard";
import RunCard from "./RunCard";

const CalendarWeekRow = ({ week, weekNumber }) => {
  if (Object.keys(week).length === 0) {
    week = "";
  }
  // console.log("Calendar Week Row:", week);
  

  return (
    <>
      {week
        ? Object.entries(week).map(([day, data]) => {
            return <TrainingCard key={day} data={data} />;
          })
        : null}
      <SummaryCard week={week} weekNumber={weekNumber} />
      {week
        ? Object.entries(week).map(([day, data]) => {
            return <RunCard key={day} data={data} />;
          })
        : null}
    </>
  );
};

export default CalendarWeekRow;
