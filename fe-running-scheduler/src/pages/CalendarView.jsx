import { useState, useEffect } from "react";
import CalendarBar from "../components/CalendarBar";
import CalendarBody from "../components/CalendarBody";
import { Outlet, useActionData, useLoaderData } from "react-router-dom";
import { processFormDataFromScheduler } from "../data/processFormDataFromScheduler";
import { createSchedule } from "../data/schedules";
import { createRun } from "../data/runs";
import getCalendars from "../data/getCurrentPreviousNextCalendars";
import { toast } from "react-toastify";
import {
  showCurrentCalendar as showCurrent,
  showPreviousCalendar as showPrevious,
  showNextCalendar as showNext,
} from "../logic/calendarCycling";

const CalendarView = () => {
  // ToDo: this needs to be exported to backend, but later
  const data = useActionData();

  // looks goods!
  const { loadedSchedules, loadedRuns } = useLoaderData();
  const scheduleCalendars = getCalendars(loadedSchedules);
  const runCalendars = getCalendars(loadedRuns);
  // wäre gut wenn wir beim loader gleich alles verabeiten könnten
  // console.log("loadedSchedules", loadedSchedules);
  // console.log("loadedRuns", loadedRuns);

  const [trainingBlockData, setTrainingBlockData] = useState(
    scheduleCalendars.currentCalendar
  );
  const [runningData, setRunningData] = useState(runCalendars.currentCalendar);
  const [calendarIndex, setCalendarIndex] = useState(0);
  const [cycleState, setCycleState] = useState("current");
  const [newScheduleFormSubmitted, setNewScheduleFormSubmitted] =
    useState(false);

    if (newScheduleFormSubmitted && data) {
      console.log("New Schedule Form Submitted");
    }

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

  // ToDo: some responsiveness that tells user that it will be discarded if he clicks somewhere else
  const saveNewSchedule = async () => {
    try {
      const schedule = await createSchedule(trainingBlockData);
      console.log(schedule);
      const run = await createRun(runningData);
      console.log(run);
      setNewScheduleFormSubmitted(false);
    } catch (error) {
      console.error(error);
    }
  };

  // ToDo: do the same with the DB?
  // This works perfectly fine because as soon as the state changes this code line will run again
  // However we do not want this initially as the user should decide manually if he wants to keep
  // the created schedule or not
  // localStorage.setItem("trainingBlockData", JSON.stringify(trainingBlockData));
  // localStorage.setItem("runningData", JSON.stringify(runningData));

  // ToDo: now the DB needs to be implemented
  // Sets the newly created schedule as the currently showed calendar
  useEffect(() => {
    if (data) {
      const { trainingBlockJson, runDataTemplate } =
        processFormDataFromScheduler(data);
      setTrainingBlockData(trainingBlockJson);
      setRunningData(runDataTemplate);
    }
    // The schedule is by then saved in the DB, but the calendars including the new schedule are not loaded yet
  }, [data]);

  return (
    <>
      <CalendarBar
        title={trainingBlockData.meta?.title}
        runningData={runningData}
        setRunningData={setRunningData}
        newScheduleFormSubmitted={newScheduleFormSubmitted}
        saveNewSchedule={saveNewSchedule}
        showCurrentCalendar={showCurrentCalendar}
        showPreviousCalendar={showPreviousCalendar}
        showNextCalendar={showNextCalendar}
      />
      <CalendarBody
        trainingData={trainingBlockData}
        runningData={runningData}
      />
      <Outlet context={{ setNewScheduleFormSubmitted }} />
    </>
  );
};

export default CalendarView;

// if (data) {
//   for (const key in data) {
//     console.log(key, data[key]);
//   }
//   const calculatedData = processFormDataFromScheduler(data);
//   for (const key in calculatedData) {
//     console.log(key, calculatedData[key]);
//   }
// }
// let trainingBlockData = {};

// if (data) {
//   trainingBlockData = processFormDataFromScheduler(data);
//   // for (const key in trainingBlockData) {
//   //   console.log(key, trainingBlockData[key]);
//   // }
// }
