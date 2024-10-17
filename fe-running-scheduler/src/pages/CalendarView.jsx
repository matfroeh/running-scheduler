import CalendarBar from "../components/CalendarBar";
import CalendarBody from "../components/CalendarBody";
import { Outlet, useActionData } from "react-router-dom";
import { processFormDataFromScheduler } from "../data/processFormDataFromScheduler";

const CalendarView = () => {
  const data = useActionData();
  // console.log(data);

  let trainingBlockData = {};

  if (data) {
    trainingBlockData = processFormDataFromScheduler(data);
    // for (const key in trainingBlockData) {
    //   console.log(key, trainingBlockData[key]);
    // }
  }

  // ToDo: Fix Title
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
