import { useLoaderData } from "react-router";
import { useState, useCallback } from "react";

// This hook is used to get a sorted list of calendars by date and find the current calendar index (= the calendar that contains today's date)
export const useGetCalendarOrder = () => {
  // ToDo: maybe useAction can be used to insert new calendar into the list (try to turn on revalidation first)
  const [calendarsMetaDataList, setCalendarsMetaDataList] = useState(
    useLoaderData()
  );
  let currentIndex = -1;

  const handleAddCalendarToMetaDataList = useCallback((newCalendar) => {
    setCalendarsMetaDataList((prev) => [
      ...prev,
      newCalendar,
    ]);
  }, []);

  // Sort calendars by date
  const sortedCalendarsList = [ ...calendarsMetaDataList ];

  sortedCalendarsList.sort(
    (a, b) => new Date(a.meta.startDate) - new Date(b.meta.startDate)
  );

  const getCurrentCalendarIndex = () => {
    const today = new Date();
    const closestIndex = sortedCalendarsList.findIndex((item) => {
      // Condition true if today's date is within a found calendar's start and end date
      return (
        new Date(item.meta.startDate) <= today &&
        new Date(item.meta.endDate) >= today
      );
    });

    return closestIndex !== -1
      ? closestIndex
      : calendarsMetaDataList.length - 1;
  };

  const calendarIndexList = sortedCalendarsList.map((calendar) => calendar._id);
  currentIndex = getCurrentCalendarIndex();

  const calendarTitleList = sortedCalendarsList.map(
    (calendar) => calendar.meta.title
  );

  return {
    calendarIndexList,
    currentIndex,
    calendarTitleList,
    handleAddCalendarToMetaDataList,
  };
};
