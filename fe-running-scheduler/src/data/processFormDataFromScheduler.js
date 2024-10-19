// TODO: handle exceptions e.g. no longrun, no workout day, etc.

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
    console.log("dayOfWeek", dayOfWeek);
    console.log("getDaysToMonday", getDaysToMonday(dayOfWeek));
    
    date.setDate(date.getDate() + getDaysToMonday(dayOfWeek));
    // date.setDate(dayOfWeek + getDaysToMonday(dayOfWeek));

    console.log("setDateToFollowingMonday", date);
    
    
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

  // Calculate training block parameters
  const runningDays = getRunningDaysAsIndexList();
  const restDays = getRestDaysAsIndexList(runningDays);
  const startDate = new Date(setDateToFollowingMonday(new Date(date)));
  const workoutDayIndex =
    workoutDay !== "None" ? weekdays.indexOf(workoutDay) : null;
  const longRunDayIndex = longRun !== "None" ? weekdays.indexOf(longRun) : null;
  // console.log(workoutDayIndex, longRunDayIndex);

  const longRunDistance = Math.round(distance * (1/3)); // a reasonable starting point
  const workoutDayDistance = 10; // fixed assumption

  // TODO: handle exceptions e.g. no longrun, no workout day, etc.
  const easyRunDistance = Math.round(
    (distance - longRunDistance - workoutDayDistance) / (runningDays.length - 2)
  );

  const trainingBlockParameters = {
    title,
    startDate,
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
  const createWeekTemplateDays = (weekDays) => {
    let template = {};
    let days = ["day1", "day2", "day3", "day4", "day5", "day6", "day0"];
    let i = 0;
    for (const day in weekDays) {
      template[days[i]] = { date: weekDays[day] };
      i++;
    }
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
      trainingBlockWeek[`day${workoutDayIndex}`].type = "Workout Day";
      trainingBlockWeek[`day${workoutDayIndex}`].distance = workoutDayDistance;
    }
    if (longRunDayIndex !== -1) {
      trainingBlockWeek[`day${longRunDayIndex}`].type = "Long Run";
      trainingBlockWeek[`day${longRunDayIndex}`].distance = longRunDistance;
    }
    // set remaining days of running days as easy run types and set distance
    runningDays.forEach((index) => {
      if (index !== workoutDayIndex && index !== longRunDayIndex) {
        trainingBlockWeek[`day${index}`].type = "Easy Run";
        trainingBlockWeek[`day${index}`].distance = easyRunDistance;
      }
    });
    // set RestDays as rest days type
    restDays.forEach((index) => {
      trainingBlockWeek[`day${index}`].type = "Rest Day";
    });

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
    trainingBlock.meta = {};    // supposedly JS needs to know that meta will be an object beforehand
    trainingBlock.meta.title = trainingBlockParameters.title;
    trainingBlock.meta.startDate = trainingBlockParameters.startDate;


    // set the weeks
    for (let i = 1; i <= weeks; i++) {
      trainingBlock[`week${i}`] = getTrainingBlockWeek(
        trainingBlockParameters,
        i
      );
    }
    return trainingBlock;
  };

  const trainingBlockJson = createTrainingBlockJson(trainingBlockParameters, weeks);
  const runDataTemplate = createRunDataTemplate(trainingBlockJson);

  return { trainingBlockJson, runDataTemplate };
}

export const createRunDataTemplate = (trainingBlockData) => {
  let runDataTemplate = {
    meta: {
      //   blockId: trainingBlockData.blockId, // we will have this later when implementing the DB
      startDate: trainingBlockData.meta.startDate,
      title: trainingBlockData.meta.title,
    },
  };

  for (const week in trainingBlockData) {
    if (week !== "meta") {
      runDataTemplate[week] = {};
      for (const day in trainingBlockData[week]) {
        runDataTemplate[week][day] = {};
        runDataTemplate[week][day] = {
            date: trainingBlockData[week][day].date,
        }
      }
    }
  }
//   console.log("runDataTemplate", runDataTemplate);
return runDataTemplate;  
};