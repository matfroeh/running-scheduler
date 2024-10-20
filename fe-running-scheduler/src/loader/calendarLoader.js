import { getAllSchedules } from "../data/schedules";
import { getAllRuns } from "../data/runs";

export const calendarLoader = async () => {
  const loadedSchedules = await getAllSchedules();
  const loadedRuns = await getAllRuns();
  return {
    loadedSchedules,
    loadedRuns,
  };
};
