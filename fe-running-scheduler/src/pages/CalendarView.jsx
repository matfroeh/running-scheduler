import { useState, useEffect } from "react";
import CalendarBar from "../components/Calendar/CalendarBar";
import CalendarBody from "../components/Calendar/CalendarBody";
import {
  Outlet,
  useActionData,
  useLoaderData,
  useNavigate,
} from "react-router-dom";
import { processFormDataFromScheduler } from "../logic/processFormDataFromScheduler";
import { createTrainingSchedule } from "../data/schedules";
import { createRun } from "../data/runs";
import { toast } from "react-toastify";
import {
  showCurrentCalendar as showCurrent,
  showPreviousCalendar as showPrevious,
  showNextCalendar as showNext,
} from "../logic/calendarCycling";

const CalendarView = () => {
  let data = useActionData();
  const { scheduleCalendars, runCalendars } = useLoaderData();
  const [trainingBlockData, setTrainingBlockData] = useState(
    scheduleCalendars.currentCalendar
  );
  const [runningData, setRunningData] = useState(runCalendars.currentCalendar);

  const [calendarIndex, setCalendarIndex] = useState(0);
  const [cycleState, setCycleState] = useState("current");

  const [newScheduleFormSubmitted, setNewScheduleFormSubmitted] =
    useState(false);

  const [notes, setNotes] = useState(false);
  const [hideSchedule, setHideSchedule] = useState(false);

  const navigate = useNavigate();

  let activeCalendarId = runningData?._id;

  const params = {
    cycleState,
    calendarIndex,
    setTrainingBlockData,
    setRunningData,
    setCalendarIndex,
    scheduleCalendars,
    runCalendars,
    setCycleState,
    toast,
  };
  const showCurrentCalendar = () => {
    showCurrent(params);
  };
  const showPreviousCalendar = () => {
    showPrevious(params);
  };
  const showNextCalendar = () => {
    showNext(params);
  };

  const saveNewSchedule = async () => {
    try {
      const schedule = await createTrainingSchedule(trainingBlockData);
      const run = await createRun(runningData, schedule._id);
      setNewScheduleFormSubmitted(false);
      setTrainingBlockData(schedule);
      setRunningData(run);
      navigate(`/auth/calendar/${schedule._id}`);
    } catch (error) {
      toast.error(`Error saving schedule: ${error.message}`);
    }
  };

  useEffect(() => {
    if (data) {
      const { trainingBlockJson, runDataTemplate } =
        processFormDataFromScheduler(data);
      setTrainingBlockData(trainingBlockJson);
      setRunningData(runDataTemplate);
      setNewScheduleFormSubmitted(true);
    }
    // navigate(`/auth/calendar/${activeCalendarId}`);
  }, [data]);

  return (
    <div className="min-w-min flex-grow">
      <CalendarBar
        title={trainingBlockData?.meta?.title}
        runningData={runningData}
        setRunningData={setRunningData}
        newScheduleFormSubmitted={newScheduleFormSubmitted}
        saveNewSchedule={saveNewSchedule}
        showCurrentCalendar={showCurrentCalendar}
        showPreviousCalendar={showPreviousCalendar}
        showNextCalendar={showNextCalendar}
        setNewScheduleFormSubmitted={setNewScheduleFormSubmitted}
        notes={notes}
        setNotes={setNotes}
        setHideSchedule={setHideSchedule}
      />

      <CalendarBody
        trainingData={trainingBlockData}
        runningData={runningData}
        activeCalendarId={activeCalendarId}
        notes={notes}
        hideSchedule={hideSchedule}
      />

      <Outlet
        context={{
          setNewScheduleFormSubmitted,
          newScheduleFormSubmitted,
          runningData,
          setRunningData,
          trainingBlockData,
          setTrainingBlockData,
        }}
      />
    </div>
  );
};

export default CalendarView;
