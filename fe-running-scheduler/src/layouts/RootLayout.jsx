import NavBar from "../components/NavBar";
import { Outlet, useLoaderData, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import getCalendars from "../data/getCurrentPreviousNextCalendars";
import { useEffect } from "react";
// import JsonFileHandler from "../logic/JsonFileHandler";

const RootLayout = () => {
  const navigate = useNavigate();
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

  // ToDo: avoid this useEffect
  useEffect(() => {
    // if (currentCalendarId) 
      navigate(`/${currentCalendarId}`);
  }, []);

  return (
    <>
      {/* ONLY DEV TOOL FOR NOW ToDo: maybe include this as a function?  */}
      {/* <JsonFileHandler scheduleCalendars={scheduleCalendars} runCalendars={runCalendars} /> */}
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
