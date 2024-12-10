import { getDatesBetween } from "@/lib/runDataCollector";

type RunData = {
  date: string;
  distance: number;
  type: string; // ToDo: get number of types from the data
  duration: number;
  tempo: number;
  avg_hr: number | null;
  effort: number | null;
};

type AvgRunData = {
  totalDistance: number | 0;
  totalTime: number | 0;
  weeklyDistance: number | 0;
  weeklyTime: number | 0;
  avgTempo: number | null;
  avg_hr: number | null;
  avgEffort: number | null;
  numberOfWeeks: number | 0;
};

const defaultAvgRunData: AvgRunData = {
  totalDistance: 0,
  totalTime: 0,
  weeklyDistance: 0,
  weeklyTime: 0,
  avgTempo: null,
  avg_hr: null,
  avgEffort: null,
  numberOfWeeks: 0,
};

export const getSummaryFromRunDataArray = (runData: RunData[]): AvgRunData => {
  if (runData.length === 0) return defaultAvgRunData;

  let avgRunData = defaultAvgRunData;

  avgRunData.numberOfWeeks = getNumberOfWeeks(
    runData[0].date,
    runData[runData.length - 1].date
  );

  avgRunData.totalDistance = getTotalDistanceRun(runData);
  avgRunData.totalTime = getTotalTime(runData);
  avgRunData.avg_hr = avgHeartRate(runData);
  avgRunData.avgEffort = getAvgEffort(runData);
  avgRunData.avgTempo = getAvgPace(runData);
  avgRunData.weeklyDistance =
    avgRunData.totalDistance / avgRunData.numberOfWeeks;
  avgRunData.weeklyTime = avgRunData.totalTime / avgRunData.numberOfWeeks;

  return avgRunData;
};

export const getTotalDistanceRun = (runData: RunData[]): number => {
  return runData.reduce((acc, entry, index) => {
    if (runData[index].distance) {
      acc += runData[index].distance;
    }
    return acc;
  }, 0);
};

export const getTotalTime = (runData: RunData[]): number => {
  return runData.reduce((acc, entry, index) => {
    if (runData[index].duration) {
      acc += runData[index].duration;
    }
    return acc;
  }, 0);
};

// time weighted average heart rate
export const avgHeartRate = (runData: RunData[]): number | null => {
  const totalTime = getTotalTime(runData);
  let avg_hr = runData.reduce(
    (acc, entry, index) => {
      if (runData[index].avg_hr) {
        acc.duration += runData[index].duration;
        acc.hr += runData[index].avg_hr * runData[index].duration;
      }
      return acc;
    },
    { duration: 0, hr: 0 }
  );
  if (avg_hr.duration > 0) {
    return avg_hr.hr / avg_hr.duration;
  }
  return null;
};

// time weighted average effort
export const getAvgEffort = (runData: RunData[]): number | null => {
  const totalTime = getTotalTime(runData);
  let totalEffort = runData.reduce(
    (acc, entry, index) => {
      if (runData[index].effort) {
        acc.duration += runData[index].duration;
        acc.effort += runData[index].effort * runData[index].duration;
      }
      return acc;
    },
    { duration: 0, effort: 0 }
  );
  if (totalEffort.duration > 0) {
    return totalEffort.effort / totalEffort.duration;
  }
  return null;
};

export const getAvgPace = (runData: RunData[]): number | null => {
  if (getTotalDistanceRun(runData) === 0) {
    return null;
  }
  return getTotalTime(runData) / 60 / getTotalDistanceRun(runData);
};

export const getNumberOfWeeks = (
  startDate: string,
  endDate: string
): number => {
  const datesBetween = getDatesBetween(startDate, endDate);
  return datesBetween.length / 7;
};
