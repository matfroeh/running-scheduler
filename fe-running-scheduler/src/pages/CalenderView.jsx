import CalenderBar from "../components/CalenderBar";
import CalenderBody from "../components/CalenderBody";
import { Outlet, useActionData } from "react-router-dom";

const CalenderView = () => {
  const data = useActionData();
  console.log(data);
  
  return (
    <>
      <CalenderBar />
      <CalenderBody />
      <Outlet />
    </>
  );
};

export default CalenderView;
