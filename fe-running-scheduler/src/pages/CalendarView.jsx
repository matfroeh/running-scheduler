import { useState } from "react";
import { CalendarBar, CalendarBody } from "@/components/Calendar";
import { Outlet } from "react-router-dom";
import { useCalendarCycling, useSaveNewSchedule } from "@/lib/hooks";

const CalendarView = () => {
  // State required to cycle through the training schedules and runs in the calendar view, uses loader data
  const { cyclingProps, schedule, runs, setSchedule, setRuns, loading } =
    useCalendarCycling();

  // State passed to CalendarBar and CalendarBody to show/hide notes and schedule
  const [notes, setNotes] = useState(false);
  const [hideSchedule, setHideSchedule] = useState(false);

  // Custom hook for handling saving the newly created schedule
  useSaveNewSchedule(setSchedule, setRuns);

  return (
    <div className="min-w-min flex-grow">
      {!loading && (
        <>
          <CalendarBar
            title={runs?.meta?.title}
            runs={runs}
            setRuns={setRuns}
            cyclingProps={cyclingProps}
            notes={notes}
            setNotes={setNotes}
            setHideSchedule={setHideSchedule}
          />

          <CalendarBody
            schedule={schedule}
            runs={runs}
            notes={notes}
            hideSchedule={hideSchedule}
          />

          <Outlet
            context={{
              runs,
              setRuns,
              schedule,
              setSchedule,
            }}
          />
        </>
      )}
    </div>
  );
};

export default CalendarView;
