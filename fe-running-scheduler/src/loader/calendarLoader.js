import { getAllTrainingSchedules } from "../data/schedules";
import { getAllRuns } from "../data/runs";
// import getCalendars from "../utils/getCurrentPreviousNextCalendars";

export const calendarLoader = async () => {
  try {
    // console.log("calendarLoader called");

    const scheduleCalendars = await getAllTrainingSchedules();
    const runCalendars = await getAllRuns();

    return {
      scheduleCalendars,
      runCalendars,
    };
  } catch (error) {
    console.error(error);
    return {
      scheduleCalendars: {},
      runCalendars: {},
    };
  }
};

// export const calendarLoader = async () => {
//   try {
//     // console.log("calendarLoader called");

//     const loadedSchedules = await getAllTrainingSchedules();
//     const loadedRuns = await getAllRuns();

//     let scheduleCalendars = [];
//     let runCalendars = [];
//     Object.keys(loadedSchedules).length === 0
//       ? (scheduleCalendars = [])
//       : (scheduleCalendars = getCalendars(loadedSchedules));

//     Object.keys(loadedRuns).length === 0
//       ? (runCalendars = [])
//       : (runCalendars = getCalendars(loadedRuns));

//     // const currentCalendarId = runCalendars?.currentCalendar?._id;

//     return {
//       scheduleCalendars,
//       runCalendars,
//     };
//   } catch (error) {
//     console.error(error);
//     return {
//       scheduleCalendars: {},
//       runCalendars: {},
//       // currentCalendarId: null
//     };
//   }
// };
