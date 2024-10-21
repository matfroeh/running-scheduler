import { getAllSchedules } from "../data/schedules";
import { getAllRuns } from "../data/runs";

export const calendarLoader = async () => {
  try {
    const loadedSchedules = await getAllSchedules();
    const loadedRuns = await getAllRuns();
    return {
      loadedSchedules,
      loadedRuns,
    };
  } catch (error) {
    console.error(error);
    // ToDo: handle empty database
    return null;
  }
};
