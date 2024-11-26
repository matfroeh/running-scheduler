import { useState, useCallback } from "react";

// Custom hook for toggling the notes and schedule in the calendar view
export const useCalendarViewToggles = () => {
  const [notes, setNotes] = useState(false);
  const [hideSchedule, setHideSchedule] = useState(false);

  const toggleNotes = useCallback(() => {
    setNotes(!notes);
  }, [notes]);

  const toggleSchedule = useCallback( () => {
    setHideSchedule((prev) => !prev);
  }, []);

  return { notes, hideSchedule, toggleNotes, toggleSchedule };
};
