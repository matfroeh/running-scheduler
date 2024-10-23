import { getAllTrainingSchedules } from "../data/schedules";
import { getAllRuns } from "../data/runs";

export const calendarLoader = async () => {
  try {
    const loadedSchedules = await getAllTrainingSchedules();
    const loadedRuns = await getAllRuns();
    return {
      loadedSchedules,
      loadedRuns,
    };
  } catch (error) {
    console.error(error);
    return null;
  }
};
