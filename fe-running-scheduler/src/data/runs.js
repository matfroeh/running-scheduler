const API_URL = import.meta.env.VITE_APP_RUNNING_SCHEDULER_API_URL;
if (!API_URL) {
  throw new Error("API_URL is not defined");
}
const baseURL = `${API_URL}/runs`;

export const getAllRuns = async () => {
    const res = await fetch(baseURL);
    if (!res.ok) {
      const errorData = await res.json();
      if (!errorData.error) {
        throw new Error("An error occurred while fetching the posts");
      }
      throw new Error(errorData.error);
    }
    const data = await res.json();
    return data;
  };
  
  export const createRun = async (run) => {
    const res = await fetch(baseURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(run),
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
  