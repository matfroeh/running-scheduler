import CalenderBar from "../components/CalenderBar";
import CalenderBody from "../components/CalenderBody";
import { Outlet } from "react-router-dom";

const CalenderView = () => {
  return (
    <>
      <CalenderBar />
      <CalenderBody />
      <Outlet />
    </>
  );
};

export default CalenderView;
