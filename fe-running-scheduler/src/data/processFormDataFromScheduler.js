// TODO: handle exceptions e.g. no longrun, no workout day, etc.
// ToDo: but first, this needs to be really cleaned up and refactored, even the copilot agrees

export function processFormDataFromScheduler(data) {
  const { title, distance, workoutDay, longRun, weeks, date } = data;

  const weekdays = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];

  // Helper functions
  const getDaysToMonday = (dayOfWeek) => {
    if (dayOfWeek === 0) return 1;
    if (dayOfWeek === 1) return 0;
    return 8 - dayOfWeek;
  };

  const setDateToFollowingMonday = (date) => {
    const dayOfWeek = date.getDay();
    date.setDate(date.getDate() + getDaysToMonday(dayOfWeek));
    return date;
  };

  const getRunningDaysAsIndexList = () => {
    let runningDays = [];
    Object.keys(data).filter((day) => {
      if (weekdays.includes(day)) {
        runningDays.push(weekdays.indexOf(day));
      }
    });
    return runningDays;
  };

  const getRestDaysAsIndexList = (runningDays) => {
    let restDays = [];
    weekdays.forEach((day, index) => {
      if (!runningDays.includes(index)) {
        restDays.push(index);
      }
    });
    return restDays;
  };

  const getEndDate = (startDate, weeks) => {
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() -1 + weeks * 7);
    return endDate;
  };

  // Calculate training block parameters
  const runningDays = getRunningDaysAsIndexList();
  const restDays = getRestDaysAsIndexList(runningDays);
  const startDate = new Date(setDateToFollowingMonday(new Date(date)));
  const endDate = getEndDate(startDate, weeks);
  const workoutDayIndex =
    workoutDay !== "None" ? weekdays.indexOf(workoutDay) : null;
  const longRunDayIndex = longRun !== "None" ? weekdays.indexOf(longRun) : null;
  // console.log(workoutDayIndex, longRunDayIndex);

  const longRunDistance = Math.round(distance * (1 / 3)); // a reasonable starting point
  const workoutDayDistance = 10; // fixed assumption

  // TODO: handle exceptions e.g. no longrun, no workout day, etc.
  const easyRunDistance = Math.round(
    (distance - longRunDistance - workoutDayDistance) / (runningDays.length - 2)
  );

  const trainingBlockParameters = {
    title,
    startDate,
    endDate,
    distance,
    workoutDayIndex,
    workoutDayDistance,
    longRunDayIndex,
    longRunDistance,
    easyRunDistance,
    weeks,
    runningDays,
    restDays,
  };

  // for (const key in trainingBlockParameters) {
  //   console.log(key, trainingBlockParameters[key]);
  // }

  const getAllWeekDates = (firstDay, week) => {
    const weekDates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(firstDay);
      date.setDate(date.getDate() + i + (week - 1) * 7);
      weekDates.push(date);
    }

    return weekDates;
  };

  // we are ordering the weekdays with monday having index 0 because that is
  // how the calendar will be displaying the days of the week.
  // Needs to be observed if this will lead to confusion.
  const createWeekTemplateDays = (weekDates) => {
    let template = {};
    template.days = {};
    const daysList = ["day1", "day2", "day3", "day4", "day5", "day6", "day0"];
    let i = 0;
    for (const day in weekDates) {
      template.days[daysList[i]] = { date: weekDates[day] };
      i++;
    }
    // console.log(template);
    
    return template;
  };

  const getTrainingBlockWeek = (trainingBlockParameters, week) => {
    const {
      startDate,
      workoutDayIndex,
      workoutDayDistance,
      longRunDayIndex,
      longRunDistance,
      easyRunDistance,
      runningDays,
      restDays,
    } = trainingBlockParameters;
    let trainingBlockWeek = {};
    const weekDates = getAllWeekDates(startDate, week);

    // set all dates of the week
    trainingBlockWeek = createWeekTemplateDays(weekDates);
    // set workout day and long run day types
    // set distances of workout day and long run day
    if (workoutDayIndex !== -1) {
      trainingBlockWeek.days[`day${workoutDayIndex}`].type = "Workout Day";
      trainingBlockWeek.days[`day${workoutDayIndex}`].distance =
        workoutDayDistance;
    }
    if (longRunDayIndex !== -1) {
      trainingBlockWeek.days[`day${longRunDayIndex}`].type = "Long Run";
      trainingBlockWeek.days[`day${longRunDayIndex}`].distance =
        longRunDistance;
    }
    // set remaining days of running days as easy run types and set distance
    runningDays.forEach((index) => {
      if (index !== workoutDayIndex && index !== longRunDayIndex) {
        trainingBlockWeek.days[`day${index}`].type = "Easy Run";
        trainingBlockWeek.days[`day${index}`].distance = easyRunDistance;
      }
    });
    // set RestDays as rest days type
    restDays.forEach((index) => {
      trainingBlockWeek.days[`day${index}`].type = "Rest Day";
    });

    // console.log(trainingBlockWeek);

    return trainingBlockWeek;
  };

  // const testTrainingBlock1 = getTrainingBlockWeek(trainingBlockParameters, 1);

  // for (const key in testTrainingBlock1) {
  //   console.log(key, testTrainingBlock1[key]);
  // }

  const createTrainingBlockJson = (trainingBlockParameters, weeks) => {
    let trainingBlock = {};

    // set meta data
    // ToDo: let us see what we can add here as well
    trainingBlock.meta = {}; // supposedly JS needs to know that meta will be an object beforehand
    trainingBlock.meta.title = trainingBlockParameters.title;
    trainingBlock.meta.startDate = trainingBlockParameters.startDate;
    trainingBlock.meta.endDate = trainingBlockParameters.endDate;
    trainingBlock.meta.weeks = trainingBlockParameters.weeks;


    // set the weeks
    trainingBlock.weeks = {};
    for (let i = 1; i <= weeks; i++) {
      trainingBlock.weeks[`week${i}`] = getTrainingBlockWeek(
        trainingBlockParameters,
        i
      );
    }
    return trainingBlock;
  };

  const trainingBlockJson = createTrainingBlockJson(
    trainingBlockParameters,
    weeks
  );
  const runDataTemplate = createRunDataTemplate(trainingBlockJson);

  return { trainingBlockJson, runDataTemplate };
}


// Creates the template for the later insertion of the running data (uploaded gpx files)
// based on the TrainingBlockData
// By that, the process simplifies as follows:
// 1. from the gpx get the date
// 2. find the week and day that corresponds to the date (ToDo: we will later add error handling if the date is outside of the training block)
// 3. insert the extracted gpx data by simply accessing runData.weeks[week].days[day].date
// the run data will be a react state (separate from the training block data) and will update accordingly

export const createRunDataTemplate = (trainingBlockData) => {
  let runDataTemplate = {
    meta: {
      //   blockId: trainingBlockData.blockId, // we will have this later when implementing the DB
      startDate: trainingBlockData.meta.startDate,
      endDate: trainingBlockData.meta.endDate,
      title: trainingBlockData.meta.title,
      weeks: trainingBlockData.meta.weeks,
    },
  };

  runDataTemplate["weeks"] = {};
  for (const week in trainingBlockData.weeks) {
    if (week !== "meta") {
      runDataTemplate.weeks[week] = {};
      runDataTemplate.weeks[week]["days"] = {};
      for (const day in trainingBlockData.weeks[week]["days"]) {
        // console.log("createRunDataTemplate", trainingBlockData.weeks[week]["days"][day]);

        
        // runDataTemplate[week]["days"][day] = {};
        runDataTemplate.weeks[week]["days"][day] = {
          date: trainingBlockData.weeks[week]["days"][day].date,
        };
        // console.log("createRunDataTemplate", runDataTemplate[week]["days"][day]);
        
      }
    }
  }
    // console.log("runDataTemplate", runDataTemplate);
  return runDataTemplate;
};
