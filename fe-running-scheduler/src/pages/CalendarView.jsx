import { useState, useEffect } from "react";
import CalendarBar from "../components/CalendarBar";
import CalendarBody from "../components/CalendarBody";
import {
  Outlet,
  useActionData,
  useLoaderData,
  useNavigate,
  // useNavigation,
} from "react-router-dom";
import { processFormDataFromScheduler } from "../logic/processFormDataFromScheduler";
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
  // console.log("CalendarView loaded");

  let data = useActionData();
  const { scheduleCalendars, runCalendars } = useLoaderData();

  const [trainingBlockData, setTrainingBlockData] = useState(
    scheduleCalendars.currentCalendar
  );
  const [runningData, setRunningData] = useState(runCalendars.currentCalendar);

  const [calendarIndex, setCalendarIndex] = useState(0);
  const [cycleState, setCycleState] = useState("current");

  const [newScheduleFormSubmitted, setNewScheduleFormSubmitted] =
    useState(false);

  const [notes, setNotes] = useState(false);
  const [hideSchedule, setHideSchedule] = useState(false);

  const navigate = useNavigate();
  // const navigation = useNavigation();

  let activeCalendarId = runningData?._id;

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

  const saveNewSchedule = async () => {
    try {
      const schedule = await createTrainingSchedule(trainingBlockData);
      const run = await createRun(runningData, schedule._id);
      setNewScheduleFormSubmitted(false);
      setTrainingBlockData(schedule);
      setRunningData(run);
      navigate(`/${schedule._id}`);
    } catch (error) {
      toast.error(`Error saving schedule: ${error.message}`);
    }
  };

  useEffect(() => {
    if (data) {
      const { trainingBlockJson, runDataTemplate } =
        processFormDataFromScheduler(data);
      setTrainingBlockData(trainingBlockJson);
      setRunningData(runDataTemplate);
    }
  }, [data]);

  useEffect(() => {
    navigate(`/${activeCalendarId}`);
  }, [runningData, trainingBlockData]);

  return (
    <div className="min-w-min">
      <CalendarBar
        title={trainingBlockData?.meta?.title}
        runningData={runningData}
        setRunningData={setRunningData}
        newScheduleFormSubmitted={newScheduleFormSubmitted}
        saveNewSchedule={saveNewSchedule}
        showCurrentCalendar={showCurrentCalendar}
        showPreviousCalendar={showPreviousCalendar}
        showNextCalendar={showNextCalendar}
        setNewScheduleFormSubmitted={setNewScheduleFormSubmitted}
        notes={notes}
        setNotes={setNotes}
        setHideSchedule={setHideSchedule}
      />
      {/* {navigation.state === "loading" ? (
          <div className="flex justify-center mt-32">
            <LoadingOverlay active={true} spinner text="Loading..." />
          </div>
        ) : ( */}
      <CalendarBody
        trainingData={trainingBlockData}
        runningData={runningData}
        activeCalendarId={activeCalendarId}
        notes={notes}
        hideSchedule={hideSchedule}
      />
      {/* )} */}
      <Outlet
        context={{
          setNewScheduleFormSubmitted,
          newScheduleFormSubmitted,
          runningData,
          setRunningData,
          trainingBlockData,
          setTrainingBlockData,
        }}
      />
    </div>
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
