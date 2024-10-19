export const getTempoAsMinutesSecondsString = (tempo) => {
  const minutes = Math.floor(tempo);
  const seconds = (tempo - minutes) * 60;
  return `${minutes}:${seconds.toFixed(0).padStart(2, "0")}`;
};

export const getSecondsAsHoursMinutesSecondsString = (duration) => {
  const hours = Math.floor(duration / 3600);
  const minutes = Math.floor((duration % 3600) / 60);
  const seconds = duration % 60;
  return `${hours}:${minutes}:${seconds.toFixed(0).padStart(2, "0")}`;
};

// params: date: string/Date, runningData: object:{week: object:{day: object}}
// finds the day object in the runningData object by the date (coming from the gpx file)
export const findDayObjectByDate = (date, runningData) => {
  for (const week in runningData) {
    if (week === "meta") continue;
    for (const day in runningData[week]) {
      if (runningData[week][day].date.slice(0, 10) === date.slice(0, 10)) { // Check only leading YYYY-MM-DD
        return [week, day];
      }
    }
  }
  return null;
};

//
// export const findDayObjectByDate = (date, runningData) => {
//   Object.entries(runningData).map(([week, data]) => {
//     if (week === "meta") return;
//     Object.entries(data).map(([day, data]) => {
//       if (data.date === date) {
//         return { "week": week, "day": day };
//       }
//     });
//   });
// };
