import { useState, useEffect } from "react";
import CalendarBar from "../components/Calendar/CalendarBar";
import CalendarBody from "../components/Calendar/CalendarBody";
import {
  Outlet,
  useActionData,
  // useLoaderData,
  useNavigate,
} from "react-router-dom";
import { processFormDataFromScheduler } from "../logic/processFormDataFromScheduler";
import { createTrainingSchedule } from "../data/schedules";
import { createRun } from "../data/runs";
import { toast } from "react-toastify";
import { useCalendarCycling } from "../lib/hooks/useCalendarCycling";

const CalendarView = () => {
  // Form data from CreateTrainingBlock.jsx
  let createScheduleData = useActionData();

  const {
    calendars,
    currentIndex,
    showCurrentCalendar,
    showPreviousCalendar,
    showNextCalendar,
  } = useCalendarCycling();

  // State required when creating a new schedule in order to process the form data and display the new schedule, and triggering save/discard buttons
  const [newScheduleFormSubmitted, setNewScheduleFormSubmitted] =
    useState(false);

  // State passed to CalendarBar to show/hide notes
  const [notes, setNotes] = useState(false);
  const [hideSchedule, setHideSchedule] = useState(false);

  // // State to hold the calendars data (that includes both training schedules and runs)
  // const [calendars, setCalendars] = useState(useLoaderData());

  // // Cycling logic state
  // const [currentIndex, setCurrentIndex] = useState(null);

  // States that hold the current (=nearest to today's date) schedule and run data and which is passed to the CalendarBody component to display the data
  const [scheduleData, setScheduleData] = useState(
    calendars.scheduleCalendars[currentIndex]
  );
  const [runningData, setRunningData] = useState(
    calendars.runCalendars[currentIndex]
  );

  const navigate = useNavigate();

  // console.log(
  //   "running data at current index",
  //   calendars.runCalendars[currentIndex]
  // );
  // console.log(
  //   "training block data at current index",
  //   calendars.scheduleCalendars[currentIndex]
  // );

  // // Sort both data arrays by date
  // useEffect(() => {
  //   setCalendars((prevData) => {
  //     return {
  //       scheduleCalendars: [...prevData.scheduleCalendars].sort(
  //         (a, b) => new Date(a.meta.startDate) - new Date(b.meta.startDate)
  //       ),
  //       runCalendars: [...prevData.runCalendars].sort(
  //         (a, b) => new Date(a.meta.startDate) - new Date(b.meta.startDate)
  //       ),
  //     };
  //   });
  // }, []);

  // // Set current index to the calendar closest to today's date
  // // Finding it just in scheduleCalendar is sufficient as the runCalendar has the same structure/order (it has to, otherwise that would mean the data is corrupted)
  // useEffect(() => {
  //   const today = new Date();
  //   const closestIndex = calendars.scheduleCalendars.findIndex(
  //     (item) => new Date(item.date) >= today
  //   );
  //   setCurrentIndex(
  //     closestIndex !== -1
  //       ? closestIndex
  //       : calendars.scheduleCalendars.length - 1
  //   );
  // }, [calendars]);

  // const showCurrentCalendar = () => {
  //   const today = new Date();
  //   const closestIndex = calendars.scheduleCalendars.findIndex(
  //     (item) => new Date(item.date) >= today
  //   );

  //   setCurrentIndex(
  //     closestIndex !== -1
  //       ? closestIndex
  //       : calendars.scheduleCalendars.length - 1
  //   );
  // };

  // const showPreviousCalendar = () => {
  //   if (currentIndex > 0) {
  //     setCurrentIndex(currentIndex - 1);
  //   }
  // };

  // const showNextCalendar = () => {
  //   if (currentIndex < calendars.length - 1) {
  //     setCurrentIndex(currentIndex + 1);
  //   }
  // };

  let activeCalendarId = runningData?._id;

  const saveNewSchedule = async () => {
    try {
      const schedule = await createTrainingSchedule(scheduleData);
      const run = await createRun(runningData, schedule._id);
      setNewScheduleFormSubmitted(false);
      setScheduleData(schedule);
      setRunningData(run);
      navigate(`/auth/calendar/${schedule._id}`);
    } catch (error) {
      toast.error(`Error saving schedule: ${error.message}`);
    }
  };

  useEffect(() => {
    if (createScheduleData) {
      const { trainingBlockJson, runDataTemplate } =
        processFormDataFromScheduler(createScheduleData);
      setScheduleData(trainingBlockJson);
      setRunningData(runDataTemplate);
      setNewScheduleFormSubmitted(true);
    }
    // navigate(`/auth/calendar/${activeCalendarId}`);
  }, [createScheduleData]);

  return (
    <div className="min-w-min flex-grow">
      <CalendarBar
        // title={trainingBlockData?.meta?.title}
        // runningData={runningData}
        title={calendars.scheduleCalendars[currentIndex]?.meta?.title}
        runningData={calendars.runCalendars[currentIndex]}
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

      <CalendarBody
        // trainingData={trainingBlockData}
        // runningData={runningData}
        trainingData={calendars.scheduleCalendars[currentIndex]}
        runningData={calendars.runCalendars[currentIndex]}
        activeCalendarId={activeCalendarId}
        notes={notes}
        hideSchedule={hideSchedule}
      />

      <Outlet
        context={{
          setNewScheduleFormSubmitted,
          newScheduleFormSubmitted,
          runningData,
          setRunningData,
          trainingBlockData: scheduleData,
          setTrainingBlockData: setScheduleData,
        }}
      />
    </div>
  );
};

export default CalendarView;
