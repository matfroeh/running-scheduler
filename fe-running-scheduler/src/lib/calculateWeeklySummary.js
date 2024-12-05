import { getSecondsAsHoursMinutesSecondsString } from "@/lib/utils";

export const calculateWeeklySummary = (scheduleWeek, runningWeek) => {
  const totalDistancePlanned = Object.keys(scheduleWeek.days).reduce(
    (acc, day) => {
      if (scheduleWeek.days[day].distance) {
        acc += parseFloat(scheduleWeek.days[day].distance);
      }
      return Math.round(parseFloat(acc));
    },
    0
  );

  const totalDistanceRun = Object.keys(runningWeek.days).reduce((acc, day) => {
    if (runningWeek.days[day].distance) {
      acc += parseFloat(runningWeek.days[day].distance);
    }
    return parseFloat(acc);
  }, 0);

  const totalTime = Object.keys(runningWeek.days).reduce((acc, day) => {
    if (runningWeek.days[day].duration > 0) {
      acc += parseInt(runningWeek.days[day].duration);
    }
    return acc;
  }, 0);
  
  // distance weighted average heart rate
  // const getAvgHr = () => {
  //   let avg_hr = Object.keys(runningWeek.days).reduce(
  //     (acc, day) => {
  //       if (parseInt(runningWeek.days[day].avg_hr)) {
  //         acc.days += 1;
  //         acc.hr +=
  //           parseInt(runningWeek.days[day].avg_hr) *
  //           parseInt(runningWeek.days[day].distance);
  //       }
  //       return acc;
  //     },
  //     { days: 0, hr: 0 }
  //   );
  //   if (avg_hr.days > 0) {
  //     return avg_hr.hr / totalDistanceRun;
  //   }
  //   return null;
  // };

  // time weighted average heart rate
  const getAvgHr = () => {
    let avg_hr = Object.keys(runningWeek.days).reduce(
      (acc, day) => {
        if (parseInt(runningWeek.days[day].avg_hr)) {
          acc.days += 1;
          acc.hr +=
            parseInt(runningWeek.days[day].avg_hr) *
            parseInt(runningWeek.days[day].duration);
        }
        return acc;
      },
      { days: 0, hr: 0 }
    );
    if (avg_hr.days > 0) {
      return avg_hr.hr / totalTime;
      // return avg_hr.hr / avg_hr.days;
    }
    return null;
  };

  // time weighted average effort
  const getEffort = () => {
    let totalEffort = Object.keys(runningWeek.days).reduce(
      (acc, day) => {
        if (runningWeek.days[day].effort) {
          acc.days += 1;
          acc.effort +=
            parseInt(runningWeek.days[day].effort) *
            parseInt(runningWeek.days[day].duration);
        }
        return acc;
      },
      { days: 0, effort: 0 }
    );
    if (totalEffort.days > 0) {
      return totalEffort.effort / totalTime;
      // return totalEffort.effort / totalEffort.days
    };
  };

  const totalTimeFormatted = getSecondsAsHoursMinutesSecondsString(totalTime);
  const avgPace = parseFloat(totalTime / 60 / totalDistanceRun).toFixed(2);
  const avg_hr = getAvgHr();
  const avgEffort = getEffort();

  return {
    totalDistancePlanned,
    totalDistanceRun,
    totalTime,
    totalTimeFormatted,
    avgPace,
    avg_hr,
    avgEffort,
  };
};
