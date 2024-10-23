import TrainingCard from "./TrainingCard";
import SummaryCard from "./SummaryCard";
import RunCard from "./RunCard";
import { useNavigate } from "react-router-dom";

const CalendarWeekRow = ({
  week,
  weekNumber,
  runningDataWeek,
  activeCalendarId,
}) => {
  // if (Object.keys(week).length === 0) {
  //   week = "";
  // }
  const navigate = useNavigate();

  const openRunCard = (data, weekNumber, day) => {
    navigate(`/${activeCalendarId}/runs/${weekNumber}/${day}/${data._id}`);
  };

  const openTrainingCard = (data, weekNumber, day) => {
    navigate(`/${activeCalendarId}/schedule/${weekNumber}/${day}/${data._id}`);
  };

  return (
    <>
      {week
        ? Object.entries(week.days).map(([day, data]) => {
            return (
              <TrainingCard
                key={day}
                data={data}
                openTrainingCard={() => openTrainingCard(data, weekNumber, day)}
              />
            );
          })
        : null}
      <SummaryCard
        scheduleWeek={week}
        runningWeek={runningDataWeek}
        weekNumber={weekNumber}
      />
      {runningDataWeek
        ? Object.entries(runningDataWeek.days).map(([day, data]) => {
            return (
              <RunCard
                key={day}
                data={data}
                openRunCard={() => openRunCard(data, weekNumber, day)}
              />
            );
          })
        : null}
      <div className="col-span-8 border-y-8 border-base-300"></div>
    </>
  );
};

export default CalendarWeekRow;
