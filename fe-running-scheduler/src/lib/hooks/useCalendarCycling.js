import { useEffect, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";

// This hook is used to cycle through the training schedules and runs in the calendar view
// It uses the data from the loader and sorts it by date
// It also sets the current index to the calendar closest to today's date
// It provides functions to show the previous, next and current calendar

export const useCalendarCycling = () => {
  // State to hold the calendars data (that includes both training schedules and runs)
  const [calendars, setCalendars] = useState(useLoaderData());
  // console.log(calendars);
  

  // Number of calendars, length of runs is the same as the length of schedules

  // Cycling logic state
  const [currentIndex, setCurrentIndex] = useState(null);
  const [loading, setLoading] = useState(true);

  // States that hold the current (=nearest to today's date) schedule and run data and which is passed to the CalendarBody component to display the data
  const [schedule, setSchedule] = useState(null);
  const [runs, setRuns] = useState(null);

  const navigate = useNavigate();

  // Sort both data arrays by date
  useEffect(() => {
    // console.log("UseEffect useCalendarCycling - []");
    setCalendars((prevData) => {
      return {
        scheduleCalendars: [...prevData.scheduleCalendars].sort(
          (a, b) => new Date(a.meta.startDate) - new Date(b.meta.startDate)
        ),
        runCalendars: [...prevData.runCalendars].sort(
          (a, b) => new Date(a.meta.startDate) - new Date(b.meta.startDate)
        ),
      };
    });
  }, []);

  // Set current index to the calendar closest to today's date
  // Finding it just in scheduleCalendar is sufficient as the runCalendar has the same structure/order (it has to, otherwise that would mean the data is corrupted)
  useEffect(() => {
    // Restore index if found in localStorage
    const savedIndex = localStorage.getItem("currentCalendarIndex");
    if (savedIndex !== null && !isNaN(savedIndex)) {
      setCurrentIndex(parseInt(savedIndex, 10));
    } else {
      const today = new Date();
      const closestIndex = calendars.scheduleCalendars.findIndex(
        (item) => new Date(item.date) >= today
      );
      setCurrentIndex(
        closestIndex !== -1
          ? closestIndex
          : calendars.scheduleCalendars.length - 1
      );
    }
  }, [calendars]);

  useEffect(() => {
    // console.log("UseEffect useCalendarCycling - index");
    if (currentIndex !== null && calendars.scheduleCalendars[currentIndex]) {
      localStorage.setItem("currentCalendarIndex", currentIndex);
      setSchedule(calendars.scheduleCalendars[currentIndex]);
      setRuns(calendars.runCalendars[currentIndex]);
      navigate(
        `/auth/calendar/${calendars.scheduleCalendars[currentIndex]._id}`
      );
      setLoading(false);
    }
  }, [currentIndex, calendars, navigate]);

  const showCurrentCalendar = () => {
    const today = new Date();
    const closestIndex = calendars.scheduleCalendars.findIndex(
      (item) => new Date(item.date) >= today
    );

    setCurrentIndex(
      closestIndex !== -1
        ? closestIndex
        : calendars.scheduleCalendars.length - 1
    );
  };

  const showPreviousCalendar = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const showNextCalendar = () => {
    if (currentIndex < calendars.scheduleCalendars.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  return {
    cyclingProps: {
      showCurrentCalendar,
      showPreviousCalendar,
      showNextCalendar,
      currentIndex,
      calendarSize: calendars.scheduleCalendars.length,
    },
    schedule,
    runs,
    setSchedule,
    setRuns,
    loading,
  };
};
