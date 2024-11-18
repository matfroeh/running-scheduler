import axios from "axios";

const API_URL = import.meta.env.VITE_APP_RUNNING_SCHEDULER_API_URL;
if (!API_URL)
  throw new Error("API URL is required, are you missing a .env file?");
const baseURL = `${API_URL}/uploads`;

export const getUserProfilePicture = async (user) => {
  const response = await axios.get(`${baseURL}/${user.profilePicture}`, {
    withCredentials: true,
  });
  return await response.data;
};
