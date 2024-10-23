import { useParams, useOutletContext, Link } from "react-router-dom";
import { updateTrainingSchedule } from "../data/schedules";
import { useState } from "react";
import { toast } from "react-toastify";

const TrainingDayDetailsModal = () => {
  const { calendarId, week, day } = useParams();
  const { trainingBlockData, setTrainingBlockData } = useOutletContext();

  const trainingDay = trainingBlockData.weeks[week].days[day];

  const [isEditMode, setIsEditMode] = useState(false);
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

  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
    if (isEditMode) {
      setFormData({ ...trainingDay });
    }
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

  // for (const key in trainingDay) {
  //   console.log(key, trainingDay[key]);
  // }

  return (
    <div className="fixed overflow-hidden inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
      <div className="card container md:max-w-[55%] lg:max-w-[45%] xl:max-w-[35%] max-h-screen modal-window p-4 bg-base-100 rounded-lg border shadow-lg">
        <div className=" card-body overflow-y-auto h-max">
          <div className="card-actions justify-end">
            <Link
              className="btn btn-square btn-ghost btn-sm"
              to={`/${calendarId}`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </Link>
          </div>
          <h2 className="card-title text-xl font-bold">
            {isEditMode ? (
              <div>
                <strong>Type: </strong>
                <select
                  className="select select-bordered w-full max-w-xs mt-2"
                  value={formData.type}
                  name="type"
                  onChange={handleChange}
                >
                  <option disabled selected>
                    Select a type
                  </option>
                  <option>Easy Run</option>
                  <option>Long Run</option>
                  <option>Interval Workout</option>
                  <option>Threshold/Tempo Run</option>
                  <option>Progression Run</option>
                  <option>Hill Sprints</option>
                  <option>Recovery Run</option>
                  <option>Rest Day</option>
                  <option>Other</option>
                </select>
              </div>
            ) : (
              <div>
                <span>{formData.type}, </span>
                <span>{formatDate(formData.date)}</span>
              </div>
            )}
          </h2>

          <div className="flex justify-end mt-8">
            <button className="btn btn-sm btn-primary" onClick={toggleEditMode}>
              {isEditMode ? "Cancel" : "Edit"}
            </button>
            {isEditMode && (
              <button className="btn btn-sm btn-success ml-2" onClick={update}>
                Save
              </button>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4 mt-2">
            <div>
              <strong>Distance: </strong>
              {isEditMode ? (
                <input
                  type="number"
                  name="distance"
                  value={formData.distance || ""}
                  onChange={handleChange}
                  className="input input-bordered w-full mt-2"
                />
              ) : (
                <span>
                  {formData.distance ? `${formData.distance} km` : "N/A"}
                </span>
              )}
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-lg font-semibold">Description: </h3>
            {isEditMode ? (
              <textarea
                placeholder="Add your Workout protocol here"
                rows={4}
                name="description"
                value={formData.description || ""}
                onChange={handleChange}
                className="placeholder-italic textarea min-h-20 resize-vertical textarea-bordered w-full mt-2"
              />
            ) : (
              <div className="bg-base-200 min-h-20 p-2 rounded mt-4">
                {formData.description || ""}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainingDayDetailsModal;
