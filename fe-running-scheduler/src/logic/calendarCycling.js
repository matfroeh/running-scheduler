export const showCurrentCalendar = (params) => {
  const {
    setTrainingBlockData,
    setRunningData,
    setCalendarIndex,
    scheduleCalendars,
    runCalendars,
    setCycleState,
  } = params;

  setTrainingBlockData(scheduleCalendars.currentCalendar);
  setRunningData(runCalendars.currentCalendar);
  setCalendarIndex(0);
  setCycleState("current");
};

export const showPreviousCalendar = (params) => {
  const {
    cycleState,
    calendarIndex,
    setTrainingBlockData,
    setRunningData,
    setCalendarIndex,
    scheduleCalendars,
    runCalendars,
    setCycleState,
    toast,
  } = params;
  if (cycleState === "next" && calendarIndex > 0) {
    setTrainingBlockData(scheduleCalendars.nextCalendars[calendarIndex - 1]);
    setRunningData(runCalendars.nextCalendars[calendarIndex - 1]);
    setCalendarIndex((prev) => prev - 1);
    return;
  }
  if (cycleState === "next" && calendarIndex === 0) {
    setTrainingBlockData(scheduleCalendars.currentCalendar);
    setRunningData(runCalendars.currentCalendar);
    setCalendarIndex(0);
    setCycleState("current");
    return;
  }
  if (cycleState === "current") {
    setTrainingBlockData(scheduleCalendars.previousCalendars[0]);
    setRunningData(runCalendars.previousCalendars[0]);
    setCycleState("previous");
    return;
  }
  if (calendarIndex >= scheduleCalendars.previousCalendars.length - 1) {
    toast.info("End of previous schedules reached");
    return;
  }

  setTrainingBlockData(scheduleCalendars.previousCalendars[calendarIndex + 1]);
  setRunningData(runCalendars.previousCalendars[calendarIndex + 1]);
  setCycleState("previous");
  setCalendarIndex((prev) => prev + 1);
};

export const showNextCalendar = (params) => {
  const {
    cycleState,
    calendarIndex,
    setTrainingBlockData,
    setRunningData,
    setCalendarIndex,
    scheduleCalendars,
    runCalendars,
    setCycleState,
    toast,
  } = params;
  if (cycleState === "previous" && calendarIndex > 0) {
    setTrainingBlockData(
      scheduleCalendars.previousCalendars[calendarIndex - 1]
    );
    setRunningData(runCalendars.previousCalendars[calendarIndex - 1]);
    setCalendarIndex((prev) => prev - 1);
    return;
  }
  if (cycleState === "previous" && calendarIndex === 0) {
    setTrainingBlockData(scheduleCalendars.currentCalendar);
    setRunningData(runCalendars.currentCalendar);
    setCalendarIndex(0);
    setCycleState("current");
    return;
  }
  if (cycleState === "current") {
    setTrainingBlockData(scheduleCalendars.nextCalendars[0]);
    setRunningData(runCalendars.nextCalendars[0]);
    setCycleState("next");
    return;
  }
  if (calendarIndex >= scheduleCalendars.nextCalendars.length - 1) {
    toast.info("End of upcoming schedules reached");
    return;
  }

  setTrainingBlockData(scheduleCalendars.nextCalendars[calendarIndex + 1]);
  setRunningData(runCalendars.nextCalendars[calendarIndex + 1]);
  setCycleState("next");
  setCalendarIndex((prev) => prev + 1);
};
