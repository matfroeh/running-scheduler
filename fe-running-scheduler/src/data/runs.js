const API_URL = import.meta.env.VITE_APP_RUNNING_SCHEDULER_API_URL;
if (!API_URL) {
  throw new Error("API_URL is not defined");
}
const baseURL = `${API_URL}/runs`;

export const getAllRuns = async () => {
  const res = await fetch(baseURL, {
    method: "GET",
    credentials: "include",
  });
  if (!res.ok) {
    const errorData = await res.json();
    if (!errorData.error) {
      throw new Error("An error occurred while fetching the running data");
    }
    throw new Error(errorData.error);
  }
  const data = await res.json();
  return data;
};

export const getRunByParams = async (calendarId, week, day, runId) => {
  const res = await fetch(`${baseURL}/${calendarId}/${week}/${day}/${runId}`, {
    method: "GET",
    credentials: "include",
  });
  if (!res.ok) {
    const errorData = await res.json();
    if (!errorData.error) {
      throw new Error("An error occurred while fetching the running data");
    }
    throw new Error(errorData.error);
  }
  const data = await res.json();

  console.log(data);

  return data;
};

// _id is the id of the scheduleCalendar
export const createRun = async (run, _id) => {
  const body = { ...run, _id: _id };

  const res = await fetch(baseURL, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const errorData = await res.json();
    if (!errorData.error) {
      throw new Error("An error occurred while creating the running data");
    }
    throw new Error(errorData.error);
  }
  const data = await res.json();
  return data;
};

export const updateRunCalendar = async (run, calendarId) => {
  const body = run;

  const res = await fetch(`${baseURL}/${calendarId}`, {
    method: "PUT",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const errorData = await res.json();
    if (!errorData.error) {
      throw new Error("An error occurred while updating the running data");
    }
    throw new Error(errorData.error);
  }
  const data = await res.json();

  console.log(data);

  return data;
};
