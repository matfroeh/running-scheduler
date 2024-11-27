import { getTrainingScheduleById } from "@/data/schedules";
import { getRunsById } from "@/data/runs";

export const calendarByIdLoader = async (calendarId) => {
  if (!calendarId) {
    return { scheduleById: null, runsById: null };
  }
  try {
    console.log(calendarId);
    const scheduleById = await getTrainingScheduleById(calendarId);
    const runsById = await getRunsById(calendarId);
    return { scheduleById, runsById };
  } catch (error) {
    console.error(error);
    return { scheduleById: null, runsById: null };
  }
};
