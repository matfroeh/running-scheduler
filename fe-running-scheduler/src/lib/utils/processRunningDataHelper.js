export const getTempoAsMinutesSecondsString = (tempo) => {
  const minutes = Math.floor(tempo);
  const seconds = (tempo - minutes) * 60;
  if (isNaN(minutes) || isNaN(seconds)) {
    return "";
  }
  return `${minutes}'${seconds.toFixed(0).padStart(2, "0")}''`;
};

export const getSecondsAsHoursMinutesSecondsString = (duration) => {
  const hours = Math.floor(duration / 3600);
  const minutes = Math.floor((duration % 3600) / 60);
  const seconds = duration % 60;
  if (duration === 0) {
    return "";
  }
  if (isNaN(hours) || isNaN(minutes) || isNaN(seconds)) {
    return "";
  }
  if (hours === 0) {
    return `${minutes.toFixed(0).padStart(2, "0")}:${seconds
      .toFixed(0)
      .padStart(2, "0")}`;
  }
  return `${hours.toFixed(0).padStart(2, "0")}:${minutes
    .toFixed(0)
    .padStart(2, "0")}:${seconds.toFixed(0).padStart(2, "0")}`;
};

// params: date: string/Date, runningData: object:{week: object:{day: object}}
// finds the day object in the runningData object by the date (coming from the gpx file)
export const findDayObjectByDate = (date, runningData) => {
  for (const week in runningData.weeks) {
    // console.log(runningData.weeks[week]);

    for (const day in runningData.weeks[week].days) {
      // console.log(runningData.weeks[week]["days"][day]);
      // console.log(date);

      if (
        runningData.weeks[week].days[day].date.slice(0, 10) ===
        date.slice(0, 10)
      ) {
        // Check only leading YYYY-MM-DD
        return [week, day];
      }
    }
  }
  return [null, null];
};

// Checks if the calendar (schedule or runs object) contains today's date
// params: schedule: object:{meta: object:{startDate: string, endDate: string}}
export const calendarContainsTodaysDate = (schedule) => {
  const today = new Date();
  const calendarStartDate = new Date(schedule.meta.startDate);
  const calendarEndDate = new Date(schedule.meta.endDate);
  return today >= calendarStartDate && today <= calendarEndDate;
};

// Finds in which week of the calendar the date of today is
// returns: "week#" if today is in the calendar or null
export const weekNumberOfToday = (schedule) => {
  let week = null;
  if (calendarContainsTodaysDate(schedule)) {
    week = findDayObjectByDate(new Date().toISOString(), schedule)[0];
  }
  return week;
};

// params: date: string/Date, runningData: object:{week: object:{day: object}}
// finds the day object in the runningData object by a date
// fixes the issue that a return value of [null, null] is not very useful
export const findDayObjectByDateAdaptedReturnValue = (date, runningData) => {
  for (const week in runningData.weeks) {
    // console.log(runningData.weeks[week]);

    for (const day in runningData.weeks[week].days) {
      // console.log(runningData.weeks[week]["days"][day]);
      // console.log(date);

      if (
        runningData.weeks[week].days[day].date.slice(0, 10) ===
        date.slice(0, 10)
      ) {
        // Check only leading YYYY-MM-DD
        return [week, day];
      }
    }
  }
  return false;
};

export function useFindDayObjectByDate(date, runningCalendarList) {
  return (index) => findDayObjectByDateAdaptedReturnValue(date, runningCalendarList[index]);
}