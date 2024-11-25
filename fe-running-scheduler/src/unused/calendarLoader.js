import { getAllTrainingSchedules } from "../data/schedules";
import { getAllRuns } from "../data/runs";

export const calendarLoader = async () => {
  try {
    console.log("calendarLoader called");
    const scheduleCalendars = await getAllTrainingSchedules();
    const runCalendars = await getAllRuns();
    return {
      scheduleCalendars,
      runCalendars,
    };
  } catch (error) {
    console.error(error);
    return {
      scheduleCalendars: null,
      runCalendars: null,
    };
  }
};