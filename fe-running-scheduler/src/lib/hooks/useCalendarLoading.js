import { useState, useEffect, useCallback } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { getTrainingScheduleById } from "@/data/schedules";
import { getRunsById } from "@/data/runs";

// This hook is used to load the schedule and runs data for the calendar view and to handle the cycling through the calendars
export const useCalendarLoading = () => {
  // console.log("useCalendarLoading");

  // carries the information about the order of the calendars fetched by the RootLayout's calendarIndexLoader and of the currentIndex, which is the index of the calendar that encloses today's date
  const { calendarIndexList, currentIndex } = useOutletContext();
  const { calendarId } = useParams();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [calendarIndex, setCalendarIndex] = useState(
    calendarIndexList.indexOf(calendarId) !== -1
      ? calendarIndexList.indexOf(calendarId)
      : currentIndex
  );

  const [schedule, setSchedule] = useState(null);
  const [runs, setRuns] = useState(null);

  useEffect(() => {
    if (!calendarId) {
      setLoading(false);
      return;
    }
    async function fetchData() {
      //   console.log("useEffect fetching", calendarId);
      const schedule = await getTrainingScheduleById(calendarId);
      const runs = await getRunsById(calendarId);
      setSchedule(schedule);
      setRuns(runs);
    }
    fetchData();
    setLoading(false);

    return () => {
      setSchedule(null);
      setRuns(null);
    };
  }, [calendarId]);

  const showCurrentCalendar = useCallback(() => {
    if (calendarIndex === currentIndex) {
      return;
    }
    setLoading(true);
    setCalendarIndex(currentIndex);
    navigate(`/auth/calendar/${calendarIndexList[currentIndex]}`);
  }, [calendarIndex, currentIndex, calendarIndexList, navigate]);

  const showPreviousCalendar = useCallback(() => {
    if (calendarIndex > 0) {
      setLoading(true);
      setCalendarIndex(calendarIndex - 1);
      navigate(`/auth/calendar/${calendarIndexList[calendarIndex - 1]}`);
    }
  }, [calendarIndex, calendarIndexList, navigate]);

  const showNextCalendar = useCallback(() => {
    if (calendarIndex < calendarIndexList.length - 1) {
      setLoading(true);
      setCalendarIndex(calendarIndex + 1);
      navigate(`/auth/calendar/${calendarIndexList[calendarIndex + 1]}`);
    }
  }, [calendarIndex, calendarIndexList, navigate]);

  const handleSetRuns = useCallback((newRuns) => {
    setRuns(newRuns);
  }, []);

  const handleSetSchedule = useCallback((newSchedule) => {
    setSchedule(newSchedule);
  }, []);

  return {
    loading,
    schedule,
    handleSetSchedule,
    runs,
    handleSetRuns,
    cyclingProps: {
      showCurrentCalendar,
      showPreviousCalendar,
      showNextCalendar,
      calendarIndex,
      calendarSize: calendarIndexList.length,
    },
  };
};
