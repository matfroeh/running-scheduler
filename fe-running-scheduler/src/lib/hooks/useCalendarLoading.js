import { useState, useCallback } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getTrainingScheduleById, getRunsById } from "@/data";

// This hook is used to load the schedule and runs data for the calendar view and to handle the cycling through the calendars
export const useCalendarLoading = () => {
  // console.log("useCalendarLoading");

  // carries the information about the order of the calendars fetched by the RootLayout's calendarIndexLoader and of the currentIndex, which is the index of the calendar that encloses today's date
  const { calendarIndexList, currentIndex, handleAddCalendarToMetaDataList } = useOutletContext();
  const { calendarId } = useParams();

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // const [loading, setLoading] = useState(true);
  const [calendarIndex, setCalendarIndex] = useState(
    calendarIndexList.indexOf(calendarId) !== -1
      ? calendarIndexList.indexOf(calendarId)
      : currentIndex
  );

  // Changing to using react-query to fetch the data
  const {
    data: schedule,
    isLoading: scheduleLoading,
    error: scheduleError,
  } = useQuery({
    queryKey: ["trainingSchedule", calendarId],
    queryFn: () => getTrainingScheduleById(calendarId),
    // logging is not working; maybe because is is already resolved due to the data: option?
    onSuccess: () => {
      console.log('useQuery "Schedule" was called successfully');
    },
    enabled: !!calendarId, // Only fetch when calendarId is available
  });

  const {
    data: runs,
    isLoading: runsLoading,
    error: runsError,
  } = useQuery({
    queryKey: ["runs", calendarId],
    queryFn: () => getRunsById(calendarId),
    onSuccess: () => {
      console.log('useQuery "Runs" was called successfully');
    },
    enabled: !!calendarId,
  });

  // Apply loading states for the calendar and runs
  const isLoading = scheduleLoading || runsLoading;
  const errors = scheduleError || runsError;

  // setLoading not necessary anymore as with react-query the loading state works as expected
  const showCurrentCalendar = useCallback(() => {
    if (calendarIndex === currentIndex) {
      return;
    }
    setCalendarIndex(currentIndex);
    navigate(`/auth/calendar/${calendarIndexList[currentIndex]}`);
  }, [calendarIndex, currentIndex, calendarIndexList, navigate]);

  const showPreviousCalendar = useCallback(() => {
    if (calendarIndex > 0) {
      setCalendarIndex(calendarIndex - 1);
      navigate(`/auth/calendar/${calendarIndexList[calendarIndex - 1]}`);
    }
  }, [calendarIndex, calendarIndexList, navigate]);

  const showNextCalendar = useCallback(() => {
    if (calendarIndex < calendarIndexList.length - 1) {
      setCalendarIndex(calendarIndex + 1);
      navigate(`/auth/calendar/${calendarIndexList[calendarIndex + 1]}`);
    }
  }, [calendarIndex, calendarIndexList, navigate]);


  // Setter functions using react-query
  const handleSetSchedule = useCallback(
    (newSchedule) => {
      queryClient.setQueryData(["trainingSchedule", calendarId], newSchedule);
    },
    [queryClient, calendarId]
  );

  const handleSetRuns = useCallback(
    (newRuns) => {
      queryClient.setQueryData(["runs", calendarId], newRuns);
    },
    [queryClient, calendarId]
  );

  return {
    loading: isLoading,
    schedule,
    handleSetSchedule,
    runs,
    handleSetRuns,
    errors,
    cyclingProps: {
      showCurrentCalendar,
      showPreviousCalendar,
      showNextCalendar,
      calendarIndex,
      calendarSize: calendarIndexList.length,
      currentIndex,
    },
    handleAddCalendarToMetaDataList,
  };
};


  // Old way of fetching the data
  //
  // const [schedule, setSchedule] = useState(null);
  // const [runs, setRuns] = useState(null);
  //
  // useEffect(() => {
  //   if (!calendarId) {
  //     setLoading(false);
  //     return;
  //   }
  //   async function fetchData() {
  //     //   console.log("useEffect fetching", calendarId);
  //     const schedule = await getTrainingScheduleById(calendarId);
  //     const runs = await getRunsById(calendarId);
  //     setSchedule(schedule);
  //     setRuns(runs);
  //   }
  //   fetchData();
  //   setLoading(false);

  //   return () => {
  //     setSchedule(null);
  //     setRuns(null);
  //   };
  // }, [calendarId]);

  // Old setters with useState, useEffect
  // const handleSetRuns = useCallback((newRuns) => {
  //   setRuns(newRuns);
  // }, []);

  // const handleSetSchedule = useCallback((newSchedule) => {
  //   setSchedule(newSchedule);
  // }, []);