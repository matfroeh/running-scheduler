const API_URL = import.meta.env.VITE_APP_RUNNING_SCHEDULER_API_URL;
if (!API_URL)
  throw new Error("API URL is required, are you missing a .env file?");
const baseURL = `${API_URL}/user`;


export const getEquipmentListFromUser = async (userId) => {
  const response = await fetch(`${baseURL}/${userId}`, {
    method: "GET",
    credentials: "include",
  });
  const data = await response.json();
  return data;
};

export const getEquipmentById = async (userId, equipmentId) => {
  const response = await fetch(`${baseURL}/${userId}/${equipmentId}`, {
    method: "GET",
    credentials: "include",
  });
  const data = await response.json();
  return data;
}

export const updateUser = async (userId, user) => {
  const response = await fetch(`${baseURL}/${userId}`, {
    method: "PUT",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  const data = await response.json();
  return data;
};

export const createEquipment = async (userId, equipment) => {
  const response = await fetch(`${baseURL}/${userId}`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(equipment),
  });
  const data = await response.json();
  return data;
};

export const updateEquipment = async (userId, equipmentId, equipment) => {
  const response = await fetch(`${baseURL}/${userId}/${equipmentId}`, {
    method: "PUT",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(equipment),
  });
  const data = await response.json();
  return data;
};

export const deleteEquipmentFromUserList = async (userId, equipmentId) => {
  const response = await fetch(`${baseURL}/${userId}/${equipmentId}`, {
    method: "DELETE",
    credentials: "include",
  });
  const data = await response.json();
  return data;
};

export const deleteUser = async (userId) => {
  console.log("deleteUser", userId);
  
  const response = await fetch(`${baseURL}/${userId}`, {
    method: "DELETE",
    credentials: "include",
  });
  const data = await response.json();
  return data;
};