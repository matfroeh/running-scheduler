import { useState, useEffect } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { getTrainingScheduleById } from "@/data/schedules";
import { getRunsById } from "@/data/runs";

// This hook is used to load the schedule and runs data for the calendar view and to handle the cycling through the calendars
export const useCalendarLoading = () => {
  // carries the information about the order of the calendars fetched by the RootLayout's calendarIndexLoader and of the currentIndex, which is the index of the calendar that encloses today's date
  const { calendarIndexList, currentIndex } = useOutletContext();
  const { calendarId } = useParams();
  //   console.log("CalendarView useParams", calendarId);

  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [calendarIndex, setCalendarIndex] = useState(currentIndex);

  const [schedule, setSchedule] = useState(null);
  const [runs, setRuns] = useState(null);

  useEffect(() => {
    if (!calendarId) {
      // setLoading(false);
      //   console.log("useEffect canceled", calendarId);
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
  }, [calendarId]);

  const showCurrentCalendar = () => {
    if (calendarIndex !== currentIndex) {
      setLoading(true);
      setCalendarIndex(currentIndex);
      navigate(`/auth/calendar/${calendarIndexList[currentIndex]}`);
    }
  };

  const showPreviousCalendar = () => {
    if (calendarIndex > 0) {
      setLoading(true);
      setCalendarIndex(calendarIndex - 1);
      navigate(`/auth/calendar/${calendarIndexList[calendarIndex - 1]}`);
    }
  };

  const showNextCalendar = () => {
    if (calendarIndex < calendarIndexList.length - 1) {
      setLoading(true);
      setCalendarIndex(calendarIndex + 1);
      navigate(`/auth/calendar/${calendarIndexList[calendarIndex + 1]}`);
    }
  };

  return {
    loading,
    schedule,
    setSchedule,
    runs,
    setRuns,
    cyclingProps: {
      showCurrentCalendar,
      showPreviousCalendar,
      showNextCalendar,
      calendarIndex,
      calendarSize: calendarIndexList.length,
    },
  };
};
