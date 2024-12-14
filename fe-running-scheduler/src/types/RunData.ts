export type AvgRunData = {
    totalDistance: number | 0;
    totalTime: number | 0;
    weeklyDistance: number | 0;
    weeklyTime: number | 0;
    avgTempo: number | null;
    avg_hr: number | null;
    avgEffort: number | null;
    numberOfWeeks: number | 0;
};

export type RunData = {
    date: string;
    distance: number;
    type: string; // ToDo: get number of types from the data
    duration: number;
    tempo: number;
    avg_hr: number | null;
    effort: number | null;
};
