export const verifyEquipmentInput = (formData, setError) => {
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
    setError("Please specify the time the equipment has been used.");
    return false;
  }
  setError(null);
  return true;
};

export const verifyCreateScheduleInput = (e, form, selectedDays, setError) => {
  if (Object.keys(form).some((key) => form[key].trim() === "")) {
    e.preventDefault();
    setError("Please fill in all fields.");
    return;
  }
  if (selectedDays.length === 0) {
    e.preventDefault();
    setError("Please select at least one running day.");
    return;
  }
  if (form.distance < 1) {
    e.preventDefault();
    setError("Distance should be greater than 0.");
    return;
  }
  if (form.weeks < 1) {
    e.preventDefault();
    setError("Weeks should be greater than 0.");
    return;
  }
  if (
    form.longRun === form.workoutDay &&
    form.longRun !== "none" &&
    form.workoutDay !== "none"
  ) {
    e.preventDefault();
    setError("Long Run and Workout Day should be on different days.");
    return;
  }
};

export const verifyRunDetailsInput = (formData, setError) => {
  if (!formData.name) {
    setError("Please specify a name.");
    return false;
  }
  if (formData.distance < 0) {
    setError("Distance must be a positive number.");
    return false;
  }
  if (formData.avg_hr < 0) {
    setError("Average heart rate must be a positive number.");
    return false;
  }
  if (formData.avg_hr == 0) {
    setError("Average heart rate must be greater than zero.");
    return false;
  }
  if (formData.effort == 0) {
    setError("Effort must be greater than zero.");
    return false;
  }

  setError(null);
  return true;
};

export const verifyScheduleDetailsInput = (formData, setError) => {
  if (!formData.type) {
    setError("Please select a type.");
    return false;
  }
  if (formData.distance < 0) {
    setError("Distance must be a positive number.");
    return false;
  }
  setError(null);
  return true;
};