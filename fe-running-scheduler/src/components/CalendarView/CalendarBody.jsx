import { useRef } from "react";
import CalendarWeekRow from "./CalendarWeekRow";
import { ButtonScrollTop, ButtonScrollToRef } from "../generic";
import { findDayObjectByDate } from "@/lib/utils";
const CalendarBody = ({ schedule, runs, notes, hideSchedule }) => {
  const weekRef = useRef(null);

  const calendarContainsTodaysDate = () => {
    const today = new Date();
    const calendarStartDate = new Date(schedule.meta.startDate);
    const calendarEndDate = new Date(schedule.meta.endDate);
    return today >= calendarStartDate && today <= calendarEndDate;
  };

  const currentWeek = () => {
    if (calendarContainsTodaysDate()) {
      return findDayObjectByDate(new Date().toISOString(), schedule)[0];
    } else return null;
  };

  const week = currentWeek();
  // console.log("week", week);

  return (
    <div className="grid grid-cols-4 md:grid-cols-8 gap-y-2 gap-x-0.5 md:gap-2">
      {/* <WeekDaysBar /> */}
      {/* <div className="text-center">Summary</div> */}
      <div className="col-span-4 md:col-span-8 border-y border-base-300"></div>

      {schedule
        ? Object.entries(schedule.weeks).map(([weekNumber, data]) => {
            return (
              <CalendarWeekRow
                key={weekNumber}
                weekNumber={weekNumber}
                scheduleDataWeek={data}
                runningDataWeek={runs.weeks[weekNumber]}
                notes={notes}
                hideSchedule={hideSchedule}
                forwardRef={weekNumber === week ? weekRef : null}
              />
            );
          })
        : null}
      {calendarContainsTodaysDate() && (
        <ButtonScrollToRef
          forwardRef={weekRef}
          blockOption="end"
          className="top-28 z-50 right-6"
        />
      )}
      <ButtonScrollTop className="right-6" yScrollValue={1200} />
    </div>
  );
};

export default CalendarBody;
