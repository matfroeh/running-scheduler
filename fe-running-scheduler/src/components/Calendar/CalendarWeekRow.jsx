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

  const runDataByDay = (day) => {
    return runningDataWeek.days[day];
  };

  return (
    <>
      {Object.entries(scheduleDataWeek.days).map(([day, data]) => {
        return (
          <div key={day} className="flex flex-col justify-between">
            {!hideSchedule && (
              <>
                <TrainingCard
                  key={data._id}
                  data={data}
                  openTrainingCard={() =>
                    openTrainingCard(data._id, weekNumber, day)
                  }
                />
                <div
                  key={`${weekNumber}, daySpacer`}
                  className="border-y-4 border-base-200"
                ></div>
              </>
            )}
            <RunCard
              key={runDataByDay(day)._id}
              data={runDataByDay(day)}
              openRunCard={() =>
                openRunCard(runDataByDay(day)._id, weekNumber, day)
              }
              notes={notes}
              hideSchedule={hideSchedule}
            />
          </div>
        );
      })}
      <div>
        <SummaryCard
          scheduleWeek={scheduleDataWeek}
          runningWeek={runningDataWeek}
          weekNumber={weekNumber}
          hideSchedule={hideSchedule}
        />
      </div>
      <div
        key={`${weekNumber}, weekSpacer`}
        className="col-span-8 border border-base-300"
      ></div>
      {/* {!hideSchedule &&
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
      )} */}
    </>
  );
};

export default CalendarWeekRow;
