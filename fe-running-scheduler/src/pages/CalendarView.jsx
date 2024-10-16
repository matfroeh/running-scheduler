import CalendarBar from "../components/CalendarBar";
import CalendarBody from "../components/CalendarBody";
import { Outlet, useActionData } from "react-router-dom";
import { processFormDataFromScheduler } from "../data/processFormDataFromScheduler";

const CalendarView = () => {
  const data = useActionData();
  console.log(data);
  processFormDataFromScheduler(data);
  
  return (
    <>
      <CalendarBar />
      <CalendarBody />
      <Outlet />
    </>
  );
};

export default CalendarView;
