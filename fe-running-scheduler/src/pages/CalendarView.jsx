import { useState, useEffect } from "react";
import CalendarBar from "../components/CalendarBar";
import CalendarBody from "../components/CalendarBody";
import { Outlet, useActionData, useLoaderData } from "react-router-dom";
import { processFormDataFromScheduler } from "../data/processFormDataFromScheduler";
import { createSchedule } from "../data/schedules";
import { createRun } from "../data/runs";
import getCalendars from "../data/getCurrentPreviousNextCalendars";
import { toast } from "react-toastify";

const CalendarView = () => {
  const data = useActionData();
  // wäre gut wenn wir beim loader gleich alles verabeiten könnten
  const { loadedSchedules, loadedRuns } = useLoaderData();
  // console.log("loadedSchedules", loadedSchedules);
  // console.log("loadedRuns", loadedRuns);

  const [trainingBlockData, setTrainingBlockData] = useState(
    localStorage.getItem("trainingBlockData")
      ? JSON.parse(localStorage.getItem("trainingBlockData"))
      : {}
  );
  const [runningData, setRunningData] = useState(
    localStorage.getItem("runningData")
      ? JSON.parse(localStorage.getItem("runningData"))
      : {}
  );
  const [calendarIndex, setCalendarIndex] = useState(0);
  const [cycleState, setCycleState] = useState("current");
  console.log("cycleState", cycleState);
  console.log("calendarIndex", calendarIndex);

  const [newScheduleFormSubmitted, setNewScheduleFormSubmitted] =
    useState(false);

  // it works fine:
  const scheduleCalendars = getCalendars(loadedSchedules);
  const runCalendars = getCalendars(loadedRuns);
  // console.log(runCalendars.previousCalendars[0].meta.title);
  // console.log(runCalendars.nextCalendars[1].meta.title);

  const showCurrentCalendar = () => {
    setTrainingBlockData(scheduleCalendars.currentCalendar);
    setRunningData(runCalendars.currentCalendar);
    setCalendarIndex(0);
    setCycleState("current");
  };

  // OK this works fine though I am quite sure that there is a more concise way to do this
  // How should I export this to a separate logic file?
  const showPreviousCalendar = () => {
    if (cycleState === "next" && calendarIndex > 0) {
      setTrainingBlockData(scheduleCalendars.nextCalendars[calendarIndex - 1]);
      setRunningData(runCalendars.nextCalendars[calendarIndex - 1]);
      setCalendarIndex((prev) => prev - 1);
      return;
    }
    if (cycleState === "next" && calendarIndex === 0) {
      showCurrentCalendar();
      return;
    }
    if (cycleState === "current") {
      setTrainingBlockData(scheduleCalendars.previousCalendars[0]);
      setRunningData(runCalendars.previousCalendars[0]);
      setCycleState("previous");
      return;
    }
    if (calendarIndex >= scheduleCalendars.previousCalendars.length - 1) {
      toast.info("End of previous schedules reached");
      return;
    }

    setTrainingBlockData(
      scheduleCalendars.previousCalendars[calendarIndex + 1]
    );
    setRunningData(runCalendars.previousCalendars[calendarIndex + 1]);
    setCycleState("previous");
    setCalendarIndex((prev) => prev + 1);
  };

  const showNextCalendar = () => {
    if (cycleState === "previous" && calendarIndex > 0) {
      setTrainingBlockData(
        scheduleCalendars.previousCalendars[calendarIndex - 1]
      );
      setRunningData(runCalendars.previousCalendars[calendarIndex - 1]);
      setCalendarIndex((prev) => prev - 1);
      return;
    }
    if (cycleState === "previous" && calendarIndex === 0) {
      showCurrentCalendar();
      return;
    }
    if (cycleState === "current") {
      setTrainingBlockData(scheduleCalendars.nextCalendars[0]);
      setRunningData(runCalendars.nextCalendars[0]);
      setCycleState("next");
      return;
    }
    if (calendarIndex >= scheduleCalendars.nextCalendars.length - 1) {
      toast.info("End of upcoming schedules reached");
      return;
    }

    setTrainingBlockData(scheduleCalendars.nextCalendars[calendarIndex + 1]);
    setRunningData(runCalendars.nextCalendars[calendarIndex + 1]);
    setCycleState("next");
    setCalendarIndex((prev) => prev + 1);
  };

  if (newScheduleFormSubmitted && data) {
    console.log("New Schedule Form Submitted");
  }

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

  // This works perfectly fine because as soon as the state changes this code line will run again
  // However we do not want this initially as the user should decide manually if he wants to keep
  // the created schedule or not
  localStorage.setItem("trainingBlockData", JSON.stringify(trainingBlockData));
  localStorage.setItem("runningData", JSON.stringify(runningData));

  // ToDo: now the DB needs to be implemented
  useEffect(() => {
    if (data) {
      const { trainingBlockJson, runDataTemplate } =
        processFormDataFromScheduler(data);
      setTrainingBlockData(trainingBlockJson);
      setRunningData(runDataTemplate);
    }
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
