const API_URL = import.meta.env.VITE_APP_RUNNING_SCHEDULER_API_URL;
if (!API_URL)
  throw new Error("API URL is required, are you missing a .env file?");
const baseURL = `${API_URL}/user`;


export const getEquipmentListFromUser = async (userId) => {
  const res = await fetch(`${baseURL}/${userId}`, {
    method: "GET",
    credentials: "include",
  });
  if (!res.ok) {
    const errorData = await res.json();
    if (!errorData.error) {
      throw new Error("An error occurred while fetching the equipment list");
    }
    throw new Error(errorData.error);
  }
  const data = await res.json();
  return data;
};

export const getEquipmentById = async (userId, equipmentId) => {
  const res = await fetch(`${baseURL}/${userId}/${equipmentId}`, {
    method: "GET",
    credentials: "include",
  });
  if (!res.ok) {
    const errorData = await res.json();
    if (!errorData.error) {
      throw new Error("An error occurred while fetching the equipment data");
    }
    throw new Error(errorData.error);
  }
  const data = await res.json();
  return data;
}

export const updateUser = async (userId, user) => {
  const res = await fetch(`${baseURL}/${userId}`, {
    method: "PUT",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  if (!res.ok) {
    const errorData = await res.json();
    if (!errorData.error) {
      throw new Error("An error occurred while updating the user data");
    }
    throw new Error(errorData.error);
  }
  const data = await res.json();
  return data;
};

export const createEquipment = async (userId, equipment) => {  
  const res = await fetch(`${baseURL}/${userId}`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(equipment),
  });
  if (!res.ok) {
    const errorData = await res.json();
    if (!errorData.error) {
      throw new Error("An error occurred while creating the equipment");
    }
    throw new Error(errorData.error);
  }
  const data = await res.json();
  return data;
};

export const updateEquipment = async (userId, equipmentId, equipment) => {
  console.log(JSON.stringify(equipment));

  const res = await fetch(`${baseURL}/${userId}/${equipmentId}`, {
    method: "PUT",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(equipment),
  });
  if (!res.ok) {
    const errorData = await res.json();
    if (!errorData.error) {
      throw new Error("An error occurred while updating the equipment data");
    }
    throw new Error(errorData.error);
  }
  const data = await res.json();
  return data;
};

export const deleteEquipmentFromUserList = async (userId, equipmentId) => {
  const res = await fetch(`${baseURL}/${userId}/${equipmentId}`, {
    method: "DELETE",
    credentials: "include",
  });
  if (!res.ok) {
    const errorData = await res.json();
    if (!errorData.error) {
      throw new Error("An error occurred while deleting the equipment");
    }
    throw new Error(errorData.error);
  }
  const data = await res.json();
  return data;
};

export const deleteUser = async (userId) => {
  const res = await fetch(`${baseURL}/${userId}`, {
    method: "DELETE",
    credentials: "include",
  });
  if (!res.ok) {
    const errorData = await res.json();
    if (!errorData.error) {
      throw new Error("An error occurred while deleting the user");
    }
    throw new Error(errorData.error);
  }
  const data = await res.json();
  return data;
};