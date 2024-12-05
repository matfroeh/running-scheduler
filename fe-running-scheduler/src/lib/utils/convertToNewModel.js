// Converts the old model (which used separate calendars: runs and schedule) 
// to the new model (which uses a single calendar called journal) and stores performed runs and scheduled trainings
// in the same object as arrays 'performed' and 'scheduled' respectively, and in which only the object ID as ref will be stored.
// The final step will be to save the scheduled/performed data (which are now only as IDs in the arrays) to the new documents 'performeds' and 'scheduleds'.

export const convertToNewModel = (runsObject, scheduleObject) => {
  let newModel = {
    user: runsObject.user,
    title: runsObject.meta.title,
    startDate: runsObject.meta.startDate,
    endDate: runsObject.meta.endDate,
    weeks: [],
  };

  let newWeeks = [];

  console.log(runsObject.weeks);

  Object.entries(runsObject.weeks).map(([weekNumber, weekData], i) => {
    let newWeek = {
      weekNumber: i + 1,
      days: [],
    };

    let newDays = [];

    Object.entries(weekData.days).map(([day, dayData], i) => {
      let newDay = {
        date: dayData.date,
        dayOfWeek: dayOfWeekMap[i],
        scheduled: [scheduleObject.weeks[weekNumber].days[day]._id],
        performed: [dayData._id],
      };

      newDays.push(newDay);
    });

    newWeek.days = newDays;
    newWeeks.push(newWeek);
  });

  newModel.weeks = newWeeks;

  return newModel;
};

export const dayOfWeekMap = {
  0: "Monday",
  1: "Tuesday",
  2: "Wednesday",
  3: "Thursday",
  4: "Friday",
  5: "Saturday",
  6: "Sunday",
};

console.log(dayOfWeekMap[0]);
