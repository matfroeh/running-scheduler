import { useState, useEffect } from "react";
import CalendarBar from "../components/CalendarBar";
import CalendarBody from "../components/CalendarBody";
import { Outlet, useActionData } from "react-router-dom";
import { processFormDataFromScheduler } from "../data/processFormDataFromScheduler";
import { createRunDataTemplate } from "../data/createRunDataTemplate";

const CalendarView = () => {
  const data = useActionData();
  // console.log(data);

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
      setTrainingBlockData(processFormDataFromScheduler(data));
    }
  }, [data]);

  useEffect(() => {
    if (trainingBlockData) {
      setRunningData(createRunDataTemplate(trainingBlockData));
    }
  }, []); // ToDo: not sure if we need trainingBlockData as dependency here, basically the template should be created only once

  return (
    <>
      <CalendarBar title={trainingBlockData.meta?.title} />
      <CalendarBody
        trainingData={trainingBlockData}
        runningData={runningData}
      />
      <Outlet />
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
