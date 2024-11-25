import { useState } from "react";
import { CalendarBar, CalendarBody } from "@/components/Calendar";
import { Outlet } from "react-router-dom";
import { useCalendarLoading, useSaveNewSchedule } from "@/lib/hooks";

const CalendarView = () => {
  // State passed to CalendarBar and CalendarBody to show/hide notes and schedule
  const [notes, setNotes] = useState(false);
  const [hideSchedule, setHideSchedule] = useState(false);

  // Custom hook for loading the schedule and runs; handling the cycling through the calendars based on the information on the order of the calendars fetched by the RootLayout's calendarIndexLoader
  const { loading, schedule, runs, setSchedule, setRuns, cyclingProps } =
    useCalendarLoading();

  // Custom hook for handling saving the newly created schedule
  useSaveNewSchedule(setSchedule, setRuns);

  return (
    <div className="min-w-min flex-grow">
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
        {!loading && (
          <CalendarBody
            schedule={schedule}
            runs={runs}
            notes={notes}
            hideSchedule={hideSchedule}
          />
        )}
        <Outlet
          context={{
            runs,
            setRuns,
            schedule,
            setSchedule,
          }}
        />
      </>
    </div>
  );
};

export default CalendarView;
