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

  // Calculate training block parameters
  const runningDays = getRunningDaysAsIndexList();
  const restDays = getRestDaysAsIndexList(runningDays);
  const startDate = new Date(setDateToFollowingMonday(new Date(date)));
  const workoutDayIndex = weekdays.indexOf(workoutDay);
  const longRunDayIndex = weekdays.indexOf(longRun);
  const longRunDistance = Math.floor((distance * 1) / 3); // a reasonable starting point
  const workoutDayDistance = 10; // fixed assumption
  const easyRunDistance =
    (distance - longRunDistance - workoutDayDistance) /
    (runningDays.length - 2);

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

  const getAllWeekDates = (firstDay, week) => {
    const weekDates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(firstDay);
      date.setDate(date.getDate() + i + (week - 1) * 7);
      weekDates.push(date);
    }
    return weekDates;
  };

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
      easyRunDistance,
      longRunDayIndex,
      longRunDistance,
      runningDays,
    } = trainingBlockParameters;
    let trainingBlockWeek = {};
    const weekDates = getAllWeekDates(startDate, week);

    // set all dates of the week
    trainingBlockWeek = createWeekTemplateDays(weekDates);
    // set workout day and long run day types
    trainingBlockWeek[`day${workoutDayIndex}`].type = "Workout Day";
    trainingBlockWeek[`day${longRunDayIndex}`].type = "Long Run";
    // set distances of workout day and long run day
    trainingBlockWeek[`day${workoutDayIndex}`].distance = workoutDayDistance;
    trainingBlockWeek[`day${longRunDayIndex}`].distance = longRunDistance;
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
  };

  const testTrainingBlock1 = getTrainingBlockWeek(trainingBlockParameters, 1);
  console.log(testTrainingBlock1);
  
}
