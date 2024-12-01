import axios from "axios";

const API_URL = import.meta.env.VITE_APP_RUNNING_SCHEDULER_API_URL;
if (!API_URL)
  throw new Error("API URL is required, are you missing a .env file?");
const baseURL = `${API_URL}/uploads`;

export const getImageByIdFromApi = async (imageId, signal) => {
  const res = await axios.get(`${baseURL}/${imageId}`, {
    withCredentials: true,
    signal: signal ? signal : null,
  });
  if (!res) {
    throw new Error("An error occurred while fetching the image");
  }
  return await res.data;
};

// ToDo: There is some issues when using axios to post image data and verifyTokenMiddleware, using fetch for now
export const postImageToApi = async (formData, signal) => {
  const res = await fetch(baseURL, {
    method: "POST",
    credentials: "include",
    body: formData,
    signal: signal ? signal : null,
  });

  if (!res.ok) {
    const errorData = await res.json();
    if (!errorData.error) {
      throw new Error("An error occurred while posting the image");
    }
    throw new Error(errorData.error);
  }

  const data = await res.json();
  return data;
};

export const deleteImageById = async (imageId) => {
  const res = await fetch(`${baseURL}/${imageId}`, {
    method: "DELETE",
    credentials: "include",
  });

  if (!res.ok) {
    const errorData = await res.json();
    if (!errorData.error) {
      throw new Error("An error occurred while updating the image"); // This is correct as we delete only when updating the image
    }
    throw new Error(errorData.error);
  }

  const data = await res.json();
  return data;
};
