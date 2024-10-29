import { getAllRuns } from "../data/runs";
import { getAllTrainingSchedules } from "../data/schedules";

export const overviewLoader = async () => {
  try {
    const loadedRuns = await getAllRuns();

    return {
      loadedRuns,
    };
  } catch (error) {
    console.error(error);
    return {
      loadedRuns: {},
    };
  }
};
