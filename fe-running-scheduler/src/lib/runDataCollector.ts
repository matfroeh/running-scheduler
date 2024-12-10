import { useFindDayObjectByDate } from "@/lib/utils";

type RunDay = {
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

type RunningCalendar = {
  meta: {
    startDate: string;
    endDate: string;
  };
  weeks: Weeks;
};

// returns an array of run data objects between the start and end date
export const runDataCollector = (
  startDate: string | Date,
  endDate: string | Date,
  runningCalendarList: RunningCalendar[]
): RunDay[] => {
  startDate = new Date(startDate);
  endDate = new Date(endDate);
  let runData: RunDay[] = [];
  console.log("start date", startDate);
  console.log("end date", endDate);

  const datesToCheck = getDatesBetween(startDate, endDate);
  console.log("dates to check", datesToCheck);

  datesToCheck.forEach((date) => {
    // console.log("date", date);
    const findDayObject = useFindDayObjectByDate(date, runningCalendarList);

    for (let i = 0; i < runningCalendarList.length; i++) {
      const result = findDayObject(i);
      if (result) {
        const [week, day] = result as [string, string];
        // filter out data without distance
        if (hasDistance(runDetails(week, day, runningCalendarList[i]))) {
          runData.push({
            ...runDetails(week, day, runningCalendarList[i]),
          });
          break;
        }
      }
    }
  });
  return runData;
};

export const getDatesBetween = (
  startDate: Date | string,
  endDate: Date | string
): Date[] => {
  let dates: Date[] = [];

  // if the start date is after the end date, return an empty array
  if (startDate > endDate) {
    return dates;
  }

  let currentDate = new Date(startDate);
  while (currentDate <= endDate) {
    dates.push(currentDate);
    currentDate = addDays(currentDate, 1);
  }
  // add the end date
  // dates.push(endDate);
  return dates;
};

export const addDays = (date: Date, days: number): Date => {
  let result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

export const runDetails = (
  week: string,
  day: string,
  runCalendar: RunningCalendar
): RunDay => {
  return runCalendar.weeks[week].days[day];
};

export const hasDistance = (run: RunDay): boolean => {
  return run.distance > 0;
};
