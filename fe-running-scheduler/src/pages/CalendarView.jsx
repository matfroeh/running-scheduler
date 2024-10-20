import { useState, useEffect } from "react";
import CalendarBar from "../components/CalendarBar";
import CalendarBody from "../components/CalendarBody";
import { Outlet, useActionData, useLoaderData } from "react-router-dom";
import { processFormDataFromScheduler } from "../data/processFormDataFromScheduler";
import { createSchedule } from "../data/schedules";
import { createRun } from "../data/runs";
import getCalendars from "../data/getCurrentPreviousNextCalendars";

const CalendarView = () => {
  const data = useActionData();
  const { loadedSchedules, loadedRuns } = useLoaderData();
  console.log("loadedSchedules", loadedSchedules);
  console.log("loadedRuns", loadedRuns);

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

  const [newScheduleFormSubmitted, setNewScheduleFormSubmitted] =
    useState(false);

  // it works fine:
  const scheduleCalendars = getCalendars(loadedSchedules);
  console.log(scheduleCalendars.currentCalendar.meta.title);
  const runCalendars = getCalendars(loadedRuns);
  console.log(runCalendars.currentCalendar.meta.title);

  const showCurrentCalendar = () => {
    setTrainingBlockData(scheduleCalendars.currentCalendar);
    setRunningData(runCalendars.currentCalendar);
  };

  // ToDo: implement the logic for cycling through the arrays
  const showPreviousCalendar = () => {
    setTrainingBlockData(scheduleCalendars.previousCalendars[0]);
    setRunningData(runCalendars.previousCalendars[0]);
  };
  const showNextCalendar = () => {
    setTrainingBlockData(scheduleCalendars.nextCalendars[0]);
    setRunningData(runCalendars.nextCalendars[0]);
  };

  // console.log(data);

  // const testDataFromAPI = async () => {
  //   try {
  //     const data = await getAllSchedules();
  //     console.log(data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // testDataFromAPI(); // working fine

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

  // ToDO: some button appearing on the calendarBar to save the newly created schedule
  // this will trigger the action to save the data to the DB
  // and only then will useEffect load the data FROM the DB
  useEffect(() => {
    if (data) {
      const { trainingBlockJson, runDataTemplate } =
        processFormDataFromScheduler(data);
      setTrainingBlockData(trainingBlockJson);
      setRunningData(runDataTemplate);
    }
  }, [data]);

  // ToDo: right now when using localstorage the data needs to be cleared manually when setting up a new scheudle
  // well we should give them an ID
  // useEffect(() => {
  //   if (Object.keys(runningData).length === 0) {
  //     if (trainingBlockData) {
  //       setRunningData(createRunDataTemplate(trainingBlockData));
  //     }
  //   }
  // }, []);
  // ToDo: not sure if we need trainingBlockData as dependency here, basically the template should be created only once

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
