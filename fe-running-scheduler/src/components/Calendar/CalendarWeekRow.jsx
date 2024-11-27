import TrainingCard from "./TrainingCard";
import SummaryCard from "./SummaryCard";
import RunCard from "./RunCard";
import { useNavigate } from "react-router-dom";

const CalendarWeekRow = ({
  scheduleDataWeek,
  weekNumber,
  runningDataWeek,
  notes,
  hideSchedule,
}) => {
  const navigate = useNavigate();

  const openRunCard = (id, weekNumber, day) => {
    navigate(`runs/${weekNumber}/${day}/${id}`);
  };
  const openTrainingCard = (id, weekNumber, day) => {
    navigate(`schedule/${weekNumber}/${day}/${id}`);
  };

  return (
    <>
      {!hideSchedule &&
        Object.entries(scheduleDataWeek.days).map(([day, data]) => {
          return (
            <TrainingCard
              key={day}
              data={data}
              openTrainingCard={() => openTrainingCard(data._id, weekNumber, day)}
            />
          );
        })}
      {!hideSchedule && (
        <SummaryCard
          scheduleWeek={scheduleDataWeek}
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
            openRunCard={() => openRunCard(data._id, weekNumber, day)}
            notes={notes}
            hideSchedule={hideSchedule}
          />
        );
      })}
      {hideSchedule && (
        <SummaryCard
          scheduleWeek={scheduleDataWeek}
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
