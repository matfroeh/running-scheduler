const API_URL = import.meta.env.VITE_APP_RUNNING_SCHEDULER_API_URL;
if (!API_URL) {
  throw new Error("API_URL is not defined");
}
const baseURL = `${API_URL}/schedules`;

export const getAllSchedules = async () => {
  const res = await fetch(baseURL);
  if (!res.ok) {
    const errorData = await res.json();
    if (!errorData.error) {
      throw new Error("An error occurred while fetching the schedules");
    }
    throw new Error(errorData.error);
  }
  const data = await res.json();
  return data;
};

export const createSchedule = async (schedule) => {
  const res = await fetch(baseURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(schedule),
  });
  if (!res.ok) {
    const errorData = await res.json();
    if (!errorData.error) {
      throw new Error("An error occurred while creating the schedule");
    }
    throw new Error(errorData.error);
  }
  const data = await res.json();
  return data;
};
