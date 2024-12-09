type RunData = {
  _id: string;
  date: string | Date;
  name: string;
  distance: number;
  type: string;
  duration: number;
  totalTime: number;
  speed: number;
  tempo: number;
  avg_hr: number;
  timeArray: number[];
  velocityArray: number[];
  comments: string;
  equipment: string;
  effort: number;
};

type AvgRunData = {
  totalDistance: number | 0;
  weeklyDistance: number | 0;
  totalTime: number | 0;
  weeklyTime: number | 0;
  avgSpeed: number | null;
  avgTempo: number | null;
  avgAvg_hr: number | null;
  avgEffort: number | null;
};

export const getAvgFromRunDataArray = (runData: RunData[]): AvgRunData => {
  let avgRunData: AvgRunData = {
    totalDistance: 0,
    weeklyDistance: 0,
    totalTime: 0,
    weeklyTime: 0,
    avgSpeed: null,
    avgTempo: null,
    avgAvg_hr: null,
    avgEffort: null,
  };
  avgRunData.totalDistance = totalDistanceRun(runData);

  return avgRunData;
};

const totalDistanceRun = (runData: RunData[]): number => {
  return runData.reduce((acc, entry, index) => {
    if (runData[index].distance) {
      acc += runData[index].distance;
    }
    return acc;
  }, 0);
};
