import { getAllRuns } from "@/data";

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
