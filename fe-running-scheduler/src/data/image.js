import axios from "axios";

const API_URL = import.meta.env.VITE_APP_RUNNING_SCHEDULER_API_URL;
if (!API_URL)
  throw new Error("API URL is required, are you missing a .env file?");
const baseURL = `${API_URL}/uploads`;

export const getImageByIdFromApi = async (imageId, signal) => { 
  const response = await axios.get(`${baseURL}/${imageId}`, {
    withCredentials: true,
    signal: signal ? signal : null,
  });
  
  return await response.data;
};

// ToDo: There is some issues when using axios to post image data and verifyTokenMiddleware, using fetch for now
export const postImageToApi = async (formData, signal) => {
  const response = await fetch(`${API_URL}/uploads`, {
    method: "POST",
    credentials: "include",
    body: formData,
    signal: signal ? signal : null,
  });

  const data = await response.json();
  return data;
}
