import { useRef } from "react";
import CalendarWeekRow from "./CalendarWeekRow";
import { ButtonScrollTop, ButtonScrollToRef } from "../generic";
import { weekNumberOfToday } from "@/lib/utils";

const CalendarBody = ({ schedule, runs, notes, hideSchedule }) => {
  // Ref for the week of today forwarded to the CalendarWeekRow component for fast scrolling to today
  const weekRef = useRef(null);

  // Finds in which week of the calendar the date of today is for use as a scroll useRef target
  // returns: "week#" if today is in the calendar or null
  const weekObjectContainingToday = weekNumberOfToday(schedule);

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
                forwardRef={
                  weekNumber === weekObjectContainingToday ? weekRef : null
                }
              />
            );
          })
        : null}
      {weekObjectContainingToday && (
        <ButtonScrollToRef
          forwardRef={weekRef}
          blockOption="end"
          className="top-40 z-50 right-6"
        />
      )}
      <ButtonScrollTop className="right-6" yScrollValue={1200} />
    </div>
  );
};

export default CalendarBody;
