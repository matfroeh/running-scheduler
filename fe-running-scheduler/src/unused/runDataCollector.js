import { useFindDayObjectByDate } from "@/lib/utils";


// returns an array of run data objects between the start and end date
export const runDataCollector = (startDate, endDate, runningCalendarList) => {
  startDate = new Date(startDate).toISOString();
  endDate = new Date(endDate).toISOString();
  let runData = [];

  const datesToCheck = getDatesBetween(startDate, endDate);
  // console.log("dates to check", datesToCheck);

  datesToCheck.forEach((date) => {
    // console.log("date", date);
    const findDayObject = useFindDayObjectByDate(date, runningCalendarList);

    for (let i = 0; i < runningCalendarList.length; i++) {
      const result = findDayObject(i);
      if (result) {
        const [week, day] = result;
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

export const containsRun = (runningCalendar, date) => {
  return (
    runningCalendar.meta.startDate <= date &&
    runningCalendar.meta.endDate >= date
  );
};

export const getDatesBetween = (startDate, endDate) => {
  let dates = [];
  let currentDate = new Date(startDate).toISOString();
  while (currentDate <= endDate) {
    dates.push(currentDate);
    currentDate = addDays(currentDate, 1).toISOString();
  }
  return dates;
};

export const addDays = (date, days) => {
  let result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

export const runDetails = (week, day, runCalendar) => {
  return runCalendar.weeks[week].days[day];
};

export const hasDistance = (run) => {
  return run.distance > 0;
};
