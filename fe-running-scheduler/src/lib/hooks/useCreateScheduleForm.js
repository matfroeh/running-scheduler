import { useState } from "react";
import { verifyCreateScheduleInput } from "@/lib/inputVerification";

export const useCreateScheduleForm = () => {
  const [form, setForm] = useState({
    title: "",
    weeks: "",
    date: "",
    distance: 0,
    longRun: "none",
    workoutDay: "none",
  });
  const [runningDays, setRunningDays] = useState({
    monday: false,
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: false,
    saturday: false,
    sunday: false,
  });
  const [error, setError] = useState(null);

  const selectedDays = Object.keys(runningDays).filter(
    (day) => runningDays[day] === true
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleToggle = (e) => {
    const { name, checked } = e.target;
    setRunningDays({ ...runningDays, [name]: checked });
  };

  const handleSubmit = async (e) => {
    verifyCreateScheduleInput(e, form, selectedDays, setError);
  };

  return {
    form,
    runningDays,
    error,
    selectedDays,
    handleChange,
    handleToggle,
    handleSubmit,
  };
};
