import TrainingCard from "./TrainingCard";
import SummaryCard from "./SummaryCard";
import RunCard from "./RunCard";
import { useNavigate } from "react-router-dom";

const CalendarWeekRow = ({
  week,
  weekNumber,
  runningDataWeek,
  notes,
  hideSchedule,
}) => {
  const navigate = useNavigate();

  const openRunCard = (data, weekNumber, day) => {
    navigate(`runs/${weekNumber}/${day}/${data._id}`);
  };
  const openTrainingCard = (data, weekNumber, day) => {
    navigate(`schedule/${weekNumber}/${day}/${data._id}`);
  };

  return (
    <>
      {!hideSchedule &&
        Object.entries(week.days).map(([day, data]) => {
          return (
            <TrainingCard
              key={day}
              data={data}
              openTrainingCard={() => openTrainingCard(data, weekNumber, day)}
            />
          );
        })}
      {!hideSchedule && (
        <SummaryCard
          scheduleWeek={week}
          runningWeek={runningDataWeek}
          weekNumber={weekNumber}
          hideSchedule={hideSchedule}
        />
      )}
      {Object.entries(runningDataWeek.days).map(([day, data]) => {
        return (
          <RunCard
            key={day}
            data={data}
            openRunCard={() => openRunCard(data, weekNumber, day)}
            notes={notes}
            hideSchedule={hideSchedule}
          />
        );
      })}
      {hideSchedule && (
        <SummaryCard
          scheduleWeek={week}
          runningWeek={runningDataWeek}
          weekNumber={weekNumber}
          hideSchedule={hideSchedule}
        />
      )}

      <div className="col-span-8 border-y-8 border-base-300"></div>
    </>
  );
};

export default CalendarWeekRow;
