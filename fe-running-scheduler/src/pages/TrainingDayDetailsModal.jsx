import { useParams, useOutletContext, useNavigate } from "react-router-dom";
import { updateTrainingSchedule } from "../data/schedules";
import { useState } from "react";
import { toast } from "react-toastify";
import CardModal from "@/components/CardModal";
import { TypeSelectOptions } from "@/components/RunAndTrainingDetails";
import { formatDateYYMMDD } from "@/utils/formatDate";

const TrainingDayDetailsModal = () => {
  const { week, day } = useParams();
  const { schedule, setSchedule } = useOutletContext();

  const trainingDay = schedule.weeks[week].days[day];
  const calendarId = schedule._id;
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ ...trainingDay });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // console.log(name, value);
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const update = async () => {
    if (!handleInputVerification()) return;

    try {
      const updatedTrainingDayData = { ...schedule };
      updatedTrainingDayData.weeks[week].days[day] = formData;

      // console.log(updatedTrainingDayData.weeks[week].days[day]);

      setSchedule(updatedTrainingDayData);
      await updateTrainingSchedule(schedule, calendarId);
      // console.log(response);
      toast.success("Training Day updated successfully");
      navigate(-1);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleDelete = async () => {
    try {
      // alert with a confirmation box
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this run?"
      );
      if (!confirmDelete) return;

      const updatedTrainingDayData = { ...schedule };
      updatedTrainingDayData.weeks[week].days[day] = { date: trainingDay.date };
      // console.log(updatedTrainingDayData.weeks[week].days[day]);
      setSchedule(updatedTrainingDayData);
      await updateTrainingSchedule(schedule, calendarId);
      toast.success("Scheduled Training deleted successfully");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleInputVerification = () => {
    if (!formData.type) {
      setError("Please select a type.");
      return false;
    }
    setError(null);
    return true;
  };

  return (
    <CardModal>
      <span className="absolute top-2 left-2 ">
        {formatDateYYMMDD(formData.date)}
      </span>
      <h2 className="card-title text-xl font-bold mt-4">
        <TypeSelectOptions type={formData.type} handleChange={handleChange} />
      </h2>
      <div className="flex space-x-2 justify-end">
        <button
          className="btn btn-sm btn-neutral hover:btn-error"
          onClick={handleDelete}
        >
          Delete
        </button>
        <button className="btn btn-sm btn-success ml-2" onClick={update}>
          Save
        </button>
      </div>
      {error && (
        <p className="text-red-500 text-sm flex justify-end mt-4">{error}</p>
      )}
      <div className="grid grid-cols-2 gap-4 mt-2">
        <div>
          <strong>Distance: </strong>
          <input
            type="number"
            name="distance"
            value={formData.distance || ""}
            onChange={handleChange}
            className="input input-bordered w-full mt-2"
          />
        </div>
      </div>
      <div className="mt-4">
        <h3 className="text-lg font-semibold">Description: </h3>
        <textarea
          placeholder="Add your Workout protocol here"
          rows={4}
          name="description"
          value={formData.description || ""}
          onChange={handleChange}
          className="placeholder-italic textarea min-h-20 resize-vertical textarea-bordered w-full mt-2"
        />
      </div>
    </CardModal>
  );
};

export default TrainingDayDetailsModal;
