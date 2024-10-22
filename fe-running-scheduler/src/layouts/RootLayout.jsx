import NavBar from "../components/NavBar";
import { Outlet, useLoaderData, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import getCalendars from "../data/getCurrentPreviousNextCalendars";
import { useEffect } from "react";

const RootLayout = () => {
  const navigate = useNavigate();
  // console.log(loader);

  
  const { loadedSchedules, loadedRuns } = useLoaderData();

  // If no schedules could be loaded from DB:
  let scheduleCalendars = [];
  let runCalendars = [];
  Object.keys(loadedSchedules).length === 0
    ? (scheduleCalendars = [])
    : (scheduleCalendars = getCalendars(loadedSchedules));

  Object.keys(loadedRuns).length === 0
    ? (runCalendars = [])
    : (runCalendars = getCalendars(loadedRuns));

  const currentCalendarId = runCalendars?.currentCalendar?._id;

  useEffect(() => {
    navigate(`/${currentCalendarId}`);
  }, []);

  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={1500}
        theme="colored"
      />
      <NavBar />

      <Outlet context={{ scheduleCalendars, runCalendars }} />
    </>
  );
};

export default RootLayout;
