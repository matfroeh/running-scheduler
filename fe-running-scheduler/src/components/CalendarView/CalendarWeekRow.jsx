import TrainingCard from "./TrainingCard";
import SummaryCard from "./SummaryCard";
import RunCard from "./RunCard";
import { useNavigate } from "react-router";

const daysOfWeekMap = {
  day1: "Mon",
  day2: "Tue",
  day3: "Wed",
  day4: "Thu",
  day5: "Fri",
  day6: "Sat",
  day0: "Sun",
};

const CalendarWeekRow = ({
  scheduleDataWeek,
  weekNumber,
  runningDataWeek,
  notes,
  hideSchedule,
  forwardRef,
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
      <div className="ml-0.5 md:hidden">
        <div className="text-left text-xs md:text-sm ml-3 mb-0.5">Summary</div>
        <div>
          <SummaryCard
            scheduleWeek={scheduleDataWeek}
            runningWeek={runningDataWeek}
            weekNumber={weekNumber}
            hideSchedule={hideSchedule}
          />
        </div>
      </div>
      {Object.entries(scheduleDataWeek.days).map(([day, data]) => {
        return (
          <div key={day} className="flex flex-col justify-start">
            <div
              key={daysOfWeekMap[day]}
              className="text-left text-xs md:text-sm ml-3 mb-0.5"
            >
              {daysOfWeekMap[day]}
            </div>
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
                  className="border-y-4 ml-2 border-base-200"
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
      <div className="hidden md:block mr-0.5">
        <div className="text-left text-xs md:text-sm ml-3 mb-0.5">Summary</div>
        <div>
          <SummaryCard
            scheduleWeek={scheduleDataWeek}
            runningWeek={runningDataWeek}
            weekNumber={weekNumber}
            hideSchedule={hideSchedule}
          />
        </div>
      </div>
      <div
        key={`${weekNumber}, weekSpacer`}
        ref={forwardRef}
        className="col-span-4 md:col-span-8 border-y-8 md:border-y-2 border-base-300"
      ></div>
    </>
  );
};

export default CalendarWeekRow;
