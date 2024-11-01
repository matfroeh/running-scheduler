const findNearestEndDate = (calendar, today) => {
  let nearestEndDate = calendar[0];
  let nearestDiff = Math.abs(today - new Date(nearestEndDate.meta.endDate));
  calendar.forEach((schedule) => {
    const diff = Math.abs(today - new Date(schedule.meta.endDate));
    if (diff < nearestDiff) {
      nearestDiff = diff;
      nearestEndDate = schedule;
    }
  });
  return nearestEndDate;
};

const findNearestStartDate = (calendar, today) => {
  let nearestStartDate = calendar[0];
  let nearestDiff = Math.abs(today - new Date(nearestStartDate.meta.startDate));
  calendar.forEach((schedule) => {
    const diff = Math.abs(today - new Date(schedule.meta.startDate));
    if (diff < nearestDiff) {
      nearestDiff = diff;
      nearestStartDate = schedule;
    }
  });
  return nearestStartDate;
};

const getCurrentCalender = (calendar, today) => {
  const nearestStartDate = findNearestStartDate(calendar, today);
  const nearestEndDate = findNearestEndDate(calendar, today);

  if (nearestStartDate === nearestEndDate) {
    return nearestStartDate;
  }
  if (
    today.getTime() > new Date(nearestStartDate.meta.startDate).getTime() &&
    today.getTime() < new Date(nearestStartDate.meta.endDate).getTime()
  ) {
    return nearestStartDate;
  }
  if (
    today.getTime() > new Date(nearestEndDate.meta.startDate).getTime() &&
    today.getTime() < new Date(nearestEndDate.meta.endDate).getTime()
  ) {
    return nearestEndDate;
  }
  return nearestStartDate;
};

const getPreviousAndNextCalendars = (calendar, currentCalendar) => {
  // const current = getCurrentCalender(calendar, today);
  // const currentIndex = calendar.indexOf(currentCalendar);
  const previousCalendars = [];
  const nextCalendars = [];
  for (let i = 0; i < calendar.length; i++) {
    if (calendar[i] !== currentCalendar) {
      if (
        new Date(calendar[i].meta.startDate).getTime() <
        new Date(currentCalendar.meta.startDate).getTime()
      ) {
        previousCalendars.push(calendar[i]);
      } else {
        nextCalendars.push(calendar[i]);
      }
    }
  }
  return { previousCalendars: previousCalendars, nextCalendars: nextCalendars };
};

const orderCalenderByStartDate = (calendar) => {
  return calendar.sort((a, b) => {
    return new Date(a.meta.startDate) - new Date(b.meta.startDate);
  });
};

const getCalendars = (calendarArray) => {
  const today = new Date(Date.now());
  const currentCalendar = getCurrentCalender(calendarArray, today);
  const { previousCalendars, nextCalendars } = getPreviousAndNextCalendars(
    calendarArray,
    currentCalendar
  );
  // console.log(currentCalendar);
  // console.log(previousCalendars);

  
  
  return {
    previousCalendars: orderCalenderByStartDate(previousCalendars).reverse(), // reversed due to cycling logic: higher index = older calendar
    currentCalendar,
    nextCalendars: orderCalenderByStartDate(nextCalendars),
  };
};

export default getCalendars;
