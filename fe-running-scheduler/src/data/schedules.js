const API_URL = import.meta.env.VITE_APP_RUNNING_SCHEDULER_API_URL;
if (!API_URL) {
  throw new Error("API_URL is not defined");
}
const baseURL = `${API_URL}/schedules`;

export const getAllTrainingSchedules = async () => {
  const res = await fetch(baseURL, {
    method: "GET",
    credentials: "include",
  });
  if (!res.ok) {
    const errorData = await res.json();
    if (!errorData.error) {
      throw new Error("An error occurred while fetching the Training Schedules");
    }
    throw new Error(errorData.error);
  }
  const data = await res.json();
  return data;
};

export const createTrainingSchedule = async (schedule) => {
  const res = await fetch(baseURL, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(schedule),
  });
  if (!res.ok) {
    const errorData = await res.json();
    if (!errorData.error) {
      throw new Error("An error occurred while creating the Training Schedule");
    }
    throw new Error(errorData.error);
  }
  const data = await res.json();
  return data;
};


export const updateTrainingSchedule = async (schedule, calendarId) => {
  const res = await fetch(`${baseURL}/${calendarId}`, {
    method: "PUT",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(schedule),
  });
  if (!res.ok) {
    const errorData = await res.json();
    if (!errorData.error) {
      throw new Error("An error occurred while updating the Training Schedule");
    }
    throw new Error(errorData.error);
  }
  const data = await res.json();

  console.log(data);
  
  return data;
};