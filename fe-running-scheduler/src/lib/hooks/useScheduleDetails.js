import { useParams, useOutletContext, useNavigate } from "react-router";
import { updateTrainingSchedule } from "@/data";
import { useState } from "react";
import { toast } from "react-toastify";
import { verifyScheduleDetailsInput } from "@/lib";

export const useScheduleDetails = () => {
  const { week, day } = useParams();
  const { schedule, handleSetSchedule } = useOutletContext();

  // set the formData to the training day object of the selected day
  const trainingDay = schedule.weeks[week].days[day];
  const calendarId = schedule._id;
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ ...trainingDay });
  const [error, setError] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const update = async () => {
    if (!handleInputVerification()) return;
    try {
      setIsUpdating(true);
      const updatedTrainingDayData = { ...schedule };
      updatedTrainingDayData.weeks[week].days[day] = formData;

      handleSetSchedule(updatedTrainingDayData);
      await updateTrainingSchedule(schedule, calendarId);

      toast.success("Training Day updated successfully");
      navigate(-1);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async () => {
    try {
      // alert with a confirmation box
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this scheduled training?"
      );
      if (!confirmDelete) return;

      setIsUpdating(true);

      const updatedTrainingDayData = { ...schedule };
      // restore day object to initial state (carrying only the date)
      updatedTrainingDayData.weeks[week].days[day] = { date: trainingDay.date };
      handleSetSchedule(updatedTrainingDayData);
      await updateTrainingSchedule(schedule, calendarId);
      toast.success("Scheduled Training deleted successfully");
      navigate(-1);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleInputVerification = () => {
    return verifyScheduleDetailsInput(formData, setError);
  };

  return {
    formData,
    error,
    isUpdating,
    handleChange,
    handleDelete,
    update,
  };
};
