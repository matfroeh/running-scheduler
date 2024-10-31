import { calculateSummariesForOverview } from "./calculateSummariesForOverview";
import {
  getTempoAsMinutesSecondsString,
  getSecondsAsHoursMinutesSecondsString,
} from "../data/processRunningDataHelper.js";

// Creates an array of objects with the title, start date and array of weeks containing the summaries of each week
export const getOverviewData = (runs) => {
  let summariesArray = [];
  for (const block of runs) {
    summariesArray.push({
      title: block.meta.title,
      startDate: block.meta.startDate,
      endDate: block.meta.endDate,
      weeks: [],
    });
    Object.entries(block.weeks).map(([, data]) => {
      // console.log(week);
      summariesArray[summariesArray.length - 1].weeks.push(
        calculateSummariesForOverview(data)
      );
    });
  }
  summariesArray.sort((a, b) => {
    return new Date(b.startDate) - new Date(a.startDate);
  });
  // console.log(summariesArray);
  return summariesArray;
};

export const getTotalDistance = (block) => {
  let totalDistance = 0;
  block.weeks.map((week) => {
    totalDistance += week.totalDistanceRun;
  });
  return parseFloat(totalDistance).toFixed(0);
};

export const getAverageHeartBeat = (block) => {
  let totalHeartBeat = 0;
  let numberOfWeeksWithData = 0;
  block.weeks.map((week) => {
    if (week.avg_hr !== 0 && !isNaN(week.avg_hr)) {
      numberOfWeeksWithData += 1;
      totalHeartBeat += week.avg_hr;
    }
  });
  // console.log(totalHeartBeat, numberOfWeeksWithData);
  return numberOfWeeksWithData !== 0
    ? parseFloat(totalHeartBeat / numberOfWeeksWithData).toFixed(0)
    : "--";
};

export const getAveragePace = (block) => {
  let totalPace = 0;
  let numberOfWeeksWithData = 0;
  block.weeks.map((week) => {
    if (week.avgPace !== 0 && !isNaN(week.avgPace)) {
      // console.log(week.avgPace);
      numberOfWeeksWithData += 1;
      totalPace += parseFloat(week.avgPace);
    }
    // console.log(totalPace, numberOfWeeksWithData);
  });
  return numberOfWeeksWithData !== 0
    ? getTempoAsMinutesSecondsString(totalPace / numberOfWeeksWithData)
    : "--";
};

export const getAverageEffort = (block) => {
  let totalEffort = 0;
  let numberOfWeeksWithData = 0;
  block.weeks.map((week) => {
    if (week.avgEffort !== 0 && !isNaN(week.avgEffort)) {
      numberOfWeeksWithData += 1;
      totalEffort += week.avgEffort;
    }
  });
  return numberOfWeeksWithData !== 0
    ? parseFloat(totalEffort / numberOfWeeksWithData).toFixed(1)
    : "--";
};

export const getTotalTime = (block) => {
  let totalTime = 0;
  block.weeks.map((week) => {
    totalTime += parseFloat(week.totalTime);
  });
  // console.log(totalTime);

  return getSecondsAsHoursMinutesSecondsString(totalTime);
};

export const getWeeksXAxis = (block) => {
  const xAxis = [];
  let weekNumber = 1;
  block.weeks.map(() => {
    xAxis.push(weekNumber);
    weekNumber += 1;
  });
  // console.log(xAxis);

  return xAxis;
};

export const getWeeklyDistance = (block) => {
  const weeklyDistance = [];
  block.weeks.map((week) => {
    weeklyDistance.push(week.totalDistanceRun);
  });
  // console.log(weeklyDistance);
  return weeklyDistance;
};

export const getWeeklyTime = (block) => {
  const weeklyTime = [];
  block.weeks.map((week) => {
    weeklyTime.push(parseFloat(week.totalTime) / 60);
  });
  return weeklyTime;
};

export const getWeeklyPace = (block) => {
  const weeklyPace = [];
  block.weeks.map((week) => {
    weeklyPace.push(parseFloat(week.avgPace));
  });
  // console.log(weeklyPace);
  
  return weeklyPace;
};

export const getWeeklyHeartRate = (block) => {
  const weeklyHeartRate = [];
  block.weeks.map((week) => {
    weeklyHeartRate.push(parseFloat(week.avg_hr));
  });
  return weeklyHeartRate;
};

export const getAllWeeksXAxis = (overviewData) => {
  const xAxis = [];
  // reverse array to get the last block (oldest) first
  const overviewDataReversed = [...overviewData].reverse();
  let weekNumber = 1;
  overviewDataReversed.map((block) => {
    block.weeks.map(() => {
      xAxis.push(weekNumber);
      weekNumber += 1;
    });
  });
  return xAxis;
};

export const getAllWeeklyDistance = (overviewData) => {
  const weeklyDistance = [];
  // reverse array to get the last block (oldest) first
  const overviewDataReversed = [...overviewData].reverse();
  overviewDataReversed.map((block) => {
    block.weeks.map((week) => {
      weeklyDistance.push(week.totalDistanceRun);
    });
  });
  return weeklyDistance;
};

export const getAllWeeklyTime = (overviewData) => {
  const weeklyTime = [];
  // reverse array to get the last block (oldest) first
  const overviewDataReversed = [...overviewData].reverse();
  overviewDataReversed.map((block) => {
    block.weeks.map((week) => {
      weeklyTime.push(parseFloat(week.totalTime) / 60);
    });
  });
  return weeklyTime;
};

export const getAllWeeklyPace = (overviewData) => {
  const weeklyPace = [];
  // reverse array to get the last block (oldest) first
  const overviewDataReversed = [...overviewData].reverse();
  overviewDataReversed.map((block) => {
    block.weeks.map((week) => {
      weeklyPace.push(parseFloat(week.avgPace));
    });
  });
  return weeklyPace;
};

export const getAllWeeklyHeartRate = (overviewData) => {
  const weeklyHeartRate = [];
  // reverse array to get the last block (oldest) first
  const overviewDataReversed = [...overviewData].reverse();
  overviewDataReversed.map((block) => {
    block.weeks.map((week) => {
      weeklyHeartRate.push(parseFloat(week.avg_hr));
    });
  });
  return weeklyHeartRate;
};
