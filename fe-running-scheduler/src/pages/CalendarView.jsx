import { useState, useEffect } from "react";
import { CalendarBar, CalendarBody } from "@/components/Calendar";
import { Outlet, useOutletContext, useParams } from "react-router-dom";
import { useCalendarCycling, useSaveNewSchedule } from "@/lib/hooks";
import { getTrainingScheduleById } from "../data/schedules";
import { getRunsById } from "../data/runs";

const CalendarView = () => {
  const { calendarIndexList } = useOutletContext();
  // console.log("CalendarView currentCalendarId", currentCalendarId);
  const { calendarId } = useParams();
  // console.log("CalendarView useParams", calendarId);
  
const [loading, setLoading] = useState(true);
  // State required to cycle through the training schedules and runs in the calendar view, uses loader data
  // const { cyclingProps, schedule, runs, setSchedule, setRuns, loading } =
  //   useCalendarCycling();

  const { cyclingProps } = useCalendarCycling();

  const [schedule, setSchedule] = useState(null);
  const [runs, setRuns] = useState(null);

  useEffect(() => {
    // const id = calendarId ? calendarId : currentCalendarId;
    async function fetchData() {
      const schedule = await getTrainingScheduleById(calendarId);
      const runs = await getRunsById(calendarId);
      // console.log("CalendarView schedule", schedule);
      setSchedule(schedule);
      setRuns(runs);
    }
    fetchData();
    setLoading(false);
  }, [calendarId]);

  // State passed to CalendarBar and CalendarBody to show/hide notes and schedule
  const [notes, setNotes] = useState(false);
  const [hideSchedule, setHideSchedule] = useState(false);

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
