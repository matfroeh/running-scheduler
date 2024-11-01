import TrainingCard from "./TrainingCard";
import SummaryCard from "./SummaryCard";
import RunCard from "./RunCard";
import { useNavigate } from "react-router-dom";

const CalendarWeekRow = ({
  week,
  weekNumber,
  runningDataWeek,
  activeCalendarId,
  notes,
}) => {
  const navigate = useNavigate();

  const openRunCard = (data, weekNumber, day) => {
    navigate(`/${activeCalendarId}/runs/${weekNumber}/${day}/${data._id}`);
  };
  const openTrainingCard = (data, weekNumber, day) => {
    navigate(`/${activeCalendarId}/schedule/${weekNumber}/${day}/${data._id}`);
  };

  const show = true;

  return (
    <>
      {show &&
        Object.entries(week.days).map(([day, data]) => {
          return (
            <TrainingCard
              key={day}
              data={data}
              openTrainingCard={() => openTrainingCard(data, weekNumber, day)}
            />
          );
        })}
      {show && (
        <SummaryCard
          scheduleWeek={week}
          runningWeek={runningDataWeek}
          weekNumber={weekNumber}
          show={show}
        />
      )}
      {Object.entries(runningDataWeek.days).map(([day, data]) => {
        return (
          <RunCard
            key={day}
            data={data}
            openRunCard={() => openRunCard(data, weekNumber, day)}
            notes={notes}
          />
        );
      })}
      {!show && (
        <SummaryCard
          scheduleWeek={week}
          runningWeek={runningDataWeek}
          weekNumber={weekNumber}
          show={show}
        />
      )}

      <div className="col-span-8 border-y-8 border-base-300"></div>
    </>
  );
};

export default CalendarWeekRow;
