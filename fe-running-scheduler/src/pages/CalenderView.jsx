import CalenderBar from "../components/CalenderBar";
import CalenderBody from "../components/CalenderBody";
import { Outlet, useActionData } from "react-router-dom";
import { processFormDataFromScheduler } from "../data/processFormDataFromScheduler";

const CalenderView = () => {
  const data = useActionData();
  console.log(data);
  processFormDataFromScheduler(data);
  
  return (
    <>
      <CalenderBar />
      <CalenderBody />
      <Outlet />
    </>
  );
};

export default CalenderView;
