import NavBar from "../components/NavBar";
import { Outlet, useLoaderData, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import getCalendars from "../data/getCurrentPreviousNextCalendars";
import { useEffect } from "react";

const RootLayout = () => {
  const { loadedSchedules, loadedRuns } = useLoaderData();
  const scheduleCalendars = getCalendars(loadedSchedules);
  const runCalendars = getCalendars(loadedRuns);
  const navigate = useNavigate();

  const currentCalendarId = runCalendars.currentCalendar._id;

  // it works so far, now we need to transfer the cycling here as well
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
