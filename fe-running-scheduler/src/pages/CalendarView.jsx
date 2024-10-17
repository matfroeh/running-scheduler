import { useState, useEffect } from "react";
import CalendarBar from "../components/CalendarBar";
import CalendarBody from "../components/CalendarBody";
import { Outlet, useActionData } from "react-router-dom";
import { processFormDataFromScheduler } from "../data/processFormDataFromScheduler";

const CalendarView = () => {
  const data = useActionData();
  console.log(data);
  
  const [trainingBlockData, setTrainingBlockData] = useState(
    data ? processFormDataFromScheduler(data) : {}
  );

  useEffect(() => {
    if (data) {
      setTrainingBlockData(processFormDataFromScheduler(data));
    }
  }, [data]);
  
  // console.log(trainingBlockData);
  
  // if (data) {
  //   for (const key in trainingBlockData) {
  //     console.log(key, trainingBlockData[key]);
  //   }
  // }
  


  // Note: We can associate the Scheduled Training Card with the corresponding Uploaded Training Card at the same day
  return (
    <>
      <CalendarBar title={trainingBlockData.title} />
      <CalendarBody data={trainingBlockData} />
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