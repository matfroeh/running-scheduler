import { useState, useEffect } from "react";
import CalendarBar from "../components/CalendarBar";
import CalendarBody from "../components/CalendarBody";
import {
  Outlet,
  useActionData,
  useOutletContext,
  useNavigate,
} from "react-router-dom";
import { processFormDataFromScheduler } from "../data/processFormDataFromScheduler";
import { createTrainingSchedule } from "../data/schedules";
import { createRun } from "../data/runs";
import { toast } from "react-toastify";
import {
  showCurrentCalendar as showCurrent,
  showPreviousCalendar as showPrevious,
  showNextCalendar as showNext,
} from "../logic/calendarCycling";

const CalendarView = () => {
  // ToDo: actionData needs to be exported to backend, but later
  const data = useActionData();
  const { scheduleCalendars, runCalendars } = useOutletContext();
  const navigate = useNavigate();

  // console.log("scheduleCalendars", scheduleCalendars);

  const [trainingBlockData, setTrainingBlockData] = useState(
    scheduleCalendars.currentCalendar
  );
  const [runningData, setRunningData] = useState(runCalendars.currentCalendar);
  const [calendarIndex, setCalendarIndex] = useState(0);
  const [cycleState, setCycleState] = useState("current");
  const [newScheduleFormSubmitted, setNewScheduleFormSubmitted] =
    useState(false);

  const activeCalendarId = runningData?._id;
  const params = {
    cycleState,
    calendarIndex,
    setTrainingBlockData,
    setRunningData,
    setCalendarIndex,
    scheduleCalendars,
    runCalendars,
    setCycleState,
    toast,
  };
  const showCurrentCalendar = () => {
    showCurrent(params);
  };
  const showPreviousCalendar = () => {
    showPrevious(params);
  };
  const showNextCalendar = () => {
    showNext(params);
  };

  // ToDo: some responsiveness that tells user that it will be discarded if he clicks somewhere else
  // ToDo: some reload must be triggered if schedule is saved
  const saveNewSchedule = async () => {
    try {
      const schedule = await createTrainingSchedule(trainingBlockData);
      // console.log(schedule);
      await createRun(runningData, schedule._id);
      // console.log(run);
      setNewScheduleFormSubmitted(false);
      navigate(`/${schedule._id}`);
      // navigate(`/`); // ToDo: to get to the root again for re-triggering the loader but it does not work (maybe because of the "/" index)
      // maybe this will work
      // navigate(".", { replace: true });
    } catch (error) {
      console.error(error);
    }
  };

  // not necessary and useful because it will get triggered by switching calendars
  // useEffect(() => {
  //   async function saveCalendar() {
  //     try {
  //       const response = await updateRunCalendar(
  //         runningData,
  //         activeCalendarId,
  //       );
  //       console.log(response);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  //   if (runningData) {
  //     saveCalendar();
  //   }
  // }, [trainingBlockData, runningData]);

  useEffect(() => {
    if (data) {
      const { trainingBlockJson, runDataTemplate } =
        processFormDataFromScheduler(data);
      setTrainingBlockData(trainingBlockJson);
      setRunningData(runDataTemplate);
    }
    // The schedule is by then saved in the DB, but the calendars including the new schedule are not loaded yet
  }, [data]);

  
  useEffect(() => {
    navigate(`/${activeCalendarId}`);
  }, [runningData, trainingBlockData]);

  return (
    <>
      <CalendarBar
        title={trainingBlockData?.meta?.title}
        runningData={runningData}
        setRunningData={setRunningData}
        newScheduleFormSubmitted={newScheduleFormSubmitted}
        saveNewSchedule={saveNewSchedule}
        showCurrentCalendar={showCurrentCalendar}
        showPreviousCalendar={showPreviousCalendar}
        showNextCalendar={showNextCalendar}
      />
      <CalendarBody
        trainingData={trainingBlockData}
        runningData={runningData}
        activeCalendarId={activeCalendarId}
      />
      <Outlet context={{ setNewScheduleFormSubmitted, runningData, setRunningData, trainingBlockData, setTrainingBlockData }} />
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
