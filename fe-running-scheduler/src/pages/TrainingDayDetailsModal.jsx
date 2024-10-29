import { useParams, useOutletContext } from "react-router-dom";
import { updateTrainingSchedule } from "../data/schedules";
import { useState } from "react";
import { toast } from "react-toastify";
import CardModal from "../components/CardModal";

const TrainingDayDetailsModal = () => {
  const { calendarId, week, day } = useParams();
  const { trainingBlockData, setTrainingBlockData, newScheduleFormSubmitted } =
    useOutletContext();

  const trainingDay = trainingBlockData.weeks[week].days[day];

  const [formData, setFormData] = useState({ ...trainingDay });

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-UK", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    // console.log(name, value);
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const update = async () => {
    try {
      const updatedTrainingDayData = { ...trainingBlockData };
      updatedTrainingDayData.weeks[week].days[day] = formData;

      console.log(updatedTrainingDayData.weeks[week].days[day]);

      setTrainingBlockData(updatedTrainingDayData);
      await updateTrainingSchedule(trainingBlockData, calendarId);
      // console.log(response);
      toast.success("Training Day updated successfully");
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

      const updatedTrainingDayData = { ...trainingBlockData };
      updatedTrainingDayData.weeks[week].days[day] = { date: trainingDay.date };
      console.log(updatedTrainingDayData.weeks[week].days[day]);
      setTrainingBlockData(updatedTrainingDayData);
      await updateTrainingSchedule(trainingBlockData, calendarId);
      toast.success("Scheduled Training deleted successfully");
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (newScheduleFormSubmitted) {
    return (
      <CardModal>
        <h2 className="card-title text-xl font-bold">
          Please save your new schedule first
        </h2>
      </CardModal>
    );
  }
  return (
    <CardModal>
      <span className="absolute top-2 left-2 ">
        {formatDate(formData.date)}
      </span>
      <h2 className="card-title text-xl font-bold mt-4">
        <div>
          <strong>Type: </strong>
          <select
            className="select select-bordered w-full max-w-xs mt-2"
            value={formData.type}
            name="type"
            onChange={handleChange}
          >
            <option value="" defaultValue="Select a type">
              Select a type
            </option>
            <option value="Easy Run">Easy Run</option>
            <option value="Long Run">Long Run</option>
            <option value="Interval Workout">Interval Workout</option>
            <option value="Threshold/Tempo Run">Threshold/Tempo Run</option>
            <option value="Progression Run">Progression Run</option>
            <option value="Hill Sprints">Hill Sprints</option>
            <option value="Recovery Run">Recovery Run</option>
            <option value="Rest Day">Rest Day</option>
            <option value="Other">Other</option>
          </select>
        </div>
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
