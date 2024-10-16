import CalendarBar from "../components/CalendarBar";
import CalendarBody from "../components/CalendarBody";
import { Outlet, useActionData } from "react-router-dom";
import { processFormDataFromScheduler } from "../data/processFormDataFromScheduler";

const CalendarView = () => {
  const data = useActionData();
  console.log(data);

  if (data) {
    const testWeek = processFormDataFromScheduler(data);
    for (const key in testWeek) {
      console.log(key, testWeek[key]);
    }
  }

  // Note: We can associate the Scheduled Training Card with the corresponding Uploaded Training Card at the same day
  return (
    <>
      <CalendarBar />
      <CalendarBody />
      <Outlet />
    </>
  );
};

export default CalendarView;
