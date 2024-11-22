import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";

// This hook is used to cycle through the training schedules and runs in the calendar view
// It uses the data from the loader and sorts it by date
// It also sets the current index to the calendar closest to today's date
// It provides functions to show the previous, next and current calendar
export const useCalendarCycling = () => {

  // State to hold the calendars data (that includes both training schedules and runs)
  const [calendars, setCalendars] = useState(useLoaderData());

  // Cycling logic state
  const [currentIndex, setCurrentIndex] = useState(null);

  // Sort both data arrays by date
  useEffect(() => {
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
    const today = new Date();
    const closestIndex = calendars.scheduleCalendars.findIndex(
      (item) => new Date(item.date) >= today
    );
    setCurrentIndex(
      closestIndex !== -1
        ? closestIndex
        : calendars.scheduleCalendars.length - 1
    );
  }, [calendars]);

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
    if (currentIndex < calendars.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

    return {
        showPreviousCalendar,
        showNextCalendar,
        showCurrentCalendar,
        currentIndex,
        calendars
    };
};
