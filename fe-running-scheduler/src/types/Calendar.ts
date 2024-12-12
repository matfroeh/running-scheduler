export type RunDay = {
  _id: string;
  date: string;
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

type Days = {
  days: { [key: string]: RunDay };
};

type Weeks = {
  [key: string]: Days;
};

export type RunningCalendar = {
  meta: {
    startDate: string;
    endDate: string;
  };
  weeks: Weeks;
};
