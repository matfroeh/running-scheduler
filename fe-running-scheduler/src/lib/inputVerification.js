export const verifyCreateEquipmentInput = (formData, setError) => {
  if (!formData.name) {
    setError("Please specify a name for the equipment.");
    return false;
  }
  if (!formData.type) {
    setError("Please specify a type for the equipment.");
    return false;
  }
  if (!formData.inUseSince) {
    setError("Please specify when the equipment was put into use.");
    return false;
  }
  if (isNaN(formData.distance) || formData.distance < 0) {
    setError("Please specify the distance the equipment has covered.");
    return false;
  }
  if (isNaN(formData.time) || formData.time < 0) {
    setError("Please specify the time the equipment has been used.");
    return false;
  }

  setError(null);
  return true;
};

export const verifyUpdateEquipmentInput = (formData, setError) => {
  if (!formData.name) {
    setError("Please specify a name for the equipment.");
    return false;
  }
  if (!formData.type) {
    setError("Please specify a type for the equipment.");
    return false;
  }
  if (!formData.inUseSince) {
    setError("Please specify when the equipment was put into use.");
    return false;
  }
  if (isNaN(formData.distance) || formData.distance < 0) {
    setError("Please specify a valid distance the equipment has covered.");
    return false;
  }
  if (isNaN(formData.time) || formData.time < 0) {
    setError("Please specify time the equipment has been used.");
    return false;
  }
  setError(null);
  return true;
};
