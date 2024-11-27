import { CalendarBar, CalendarBody } from "@/components/Calendar";
import { Outlet } from "react-router-dom";
import {
  useCalendarLoading,
  useSaveNewSchedule,
  useCalendarViewToggles,
} from "@/lib/hooks";
import { Loading } from "@/components";

const CalendarView = () => {
  // Custom hook for toggling the notes and schedule in the calendar view
  const { notes, hideSchedule, toggleNotes, toggleSchedule } =
    useCalendarViewToggles();

  // Custom hook for loading the schedule and runs; handling the cycling through the calendars based on the information on the order of the calendars fetched by the RootLayout's calendarIndexLoader
  const {
    loading,
    schedule,
    runs,
    handleSetSchedule,
    handleSetRuns,
    cyclingProps,
  } = useCalendarLoading();

  // Custom hook for handling saving the newly created schedule
  useSaveNewSchedule(handleSetSchedule, handleSetRuns);

  return (
    <div className="min-w-min flex-grow">
      <>
        <CalendarBar
          title={runs?.meta?.title}
          runs={runs}
          handleSetRuns={handleSetRuns}
          cyclingProps={cyclingProps}
          toggleNotes={toggleNotes}
          toggleSchedule={toggleSchedule}
        />
        {loading && <Loading />}
        {!loading && schedule && (
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
            handleSetRuns,
            schedule,
            handleSetSchedule,
          }}
        />
      </>
    </div>
  );
};

export default CalendarView;
