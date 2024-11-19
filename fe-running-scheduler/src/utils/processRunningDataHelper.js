export const getTempoAsMinutesSecondsString = (tempo) => {
  const minutes = Math.floor(tempo);
  const seconds = (tempo - minutes) * 60;
  return `${minutes}:${seconds.toFixed(0).padStart(2, "0")}`;
};

export const getSecondsAsHoursMinutesSecondsString = (duration) => {
  const hours = Math.floor(duration / 3600);
  const minutes = Math.floor((duration % 3600) / 60);
  const seconds = duration % 60;
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
    
    if (week === "meta") continue;
    for (const day in runningData.weeks[week].days) {
      // console.log(runningData.weeks[week]["days"][day]);
      // console.log(date);
      
      if (runningData.weeks[week].days[day].date.slice(0, 10) === date.slice(0, 10)) { // Check only leading YYYY-MM-DD
        return [week, day];
      }
    }
  }
  return [null, null];

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
