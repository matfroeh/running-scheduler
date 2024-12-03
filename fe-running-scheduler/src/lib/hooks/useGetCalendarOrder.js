import { useLoaderData } from "react-router-dom";

// This hook is used to get a sorted list of calendars by date and find the current calendar index (= the calendar that contains today's date)
export const useGetCalendarOrder = () => {
const calendars = useLoaderData();
let currentIndex = -1;

  // Sort calendars by date
calendars.sort((a, b) => new Date(a.meta.startDate) - new Date(b.meta.startDate));

  const getCurrentCalendarIndex = () => {
    const today = new Date();
    const closestIndex = calendars.findIndex((item) => {
      // Condition true if today's date is within a found calendar's start and end date
      return (
        new Date(item.meta.startDate) <= today &&
        new Date(item.meta.endDate) >= today
      );
    });

    return closestIndex !== -1 ? closestIndex : calendars.length - 1;
  };

  const calendarIndexList = calendars.map((calendar) => calendar._id);
  currentIndex = getCurrentCalendarIndex();

  const calendarTitleList = calendars.map((calendar) => calendar.meta.title);

  return { calendarIndexList, currentIndex, calendarTitleList };
};
