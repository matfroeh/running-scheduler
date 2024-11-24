import { getAllTrainingSchedulesMetaData } from "../data/schedules";

// This loader will be used to only load the the meta data startDate and endDate of the training schedules
// in order to find the current calendars which should be displayed first in the calendar view
// and to know the order of the calendars for the cycling logic
export const calendarIndexLoader = async () => {
  try {
    console.log("calendarIndexLoader called");
    const schedulesMetaData = await getAllTrainingSchedulesMetaData();
    console.log(schedulesMetaData);
    
    return schedulesMetaData;
  } catch (error) {
    console.error(error);
    return null;
  }
};
