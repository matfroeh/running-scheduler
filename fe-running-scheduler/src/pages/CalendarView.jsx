import { useState, useEffect } from "react";
import CalendarBar from "../components/Calendar/CalendarBar";
import CalendarBody from "../components/Calendar/CalendarBody";
import { Outlet, useActionData, useNavigate } from "react-router-dom";
import { processFormDataFromScheduler } from "../logic/processFormDataFromScheduler";
import { createTrainingSchedule } from "../data/schedules";
import { createRun } from "../data/runs";
import { toast } from "react-toastify";
import { useCalendarCycling } from "../lib/hooks/useCalendarCycling";

const CalendarView = () => {
  // State required to cycle through the training schedules and runs in the calendar view, uses loader data
  // We need to define in the hook a loading state so that the data is available when the operations are done (sorting, setting current index)
  const { cyclingProps, schedule, runs, setSchedule, setRuns, loading } =
    useCalendarCycling();

  // Form data from CreateTrainingBlock.jsx
  let createScheduleData = useActionData();

  // State passed to CalendarBar to show/hide notes
  const [notes, setNotes] = useState(false);
  const [hideSchedule, setHideSchedule] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (createScheduleData) {
      const { newSchedule, newRuns } =
        processFormDataFromScheduler(createScheduleData);

      const saveNewSchedule = async () => {
        try {
          const schedule = await createTrainingSchedule(newSchedule);
          const runs = await createRun(newRuns, schedule._id);

          setSchedule(schedule);
          setRuns(runs);
        } catch (error) {
          toast.error(`Error saving schedule: ${error.message}`);
        }
      };
      saveNewSchedule();
      navigate("/");
    }
    return () => {
      createScheduleData = null;
    }
  }, [createScheduleData]);

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
