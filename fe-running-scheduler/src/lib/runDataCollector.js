import { findDayObjectByDateAdaptedReturnValue } from "@/lib/utils";

export const runDataCollector = (startDate, endDate, runningCalendarList) => {
  startDate = new Date(startDate).toISOString();
  endDate = new Date(endDate).toISOString();
  let runData = [];
  const datesToCheck = getDatesBetween(startDate, endDate);
  console.log("dates to check", datesToCheck);

  datesToCheck.forEach((date) => {
    // console.log("date", date);
    
    for (let i = 0; i < runningCalendarList.length; i++) {
      if (findDayObjectByDateAdaptedReturnValue(date, runningCalendarList[i])) {
        const [week, day] = findDayObjectByDateAdaptedReturnValue(date, runningCalendarList[i]);
        // console.log("week", week, "day", day);
        
        runData.push({
          date: date,
          run: runningCalendarList[i].weeks[week].days[day],
        });
        break;
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
