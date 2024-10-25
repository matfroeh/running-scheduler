import { useParams, useOutletContext, Link } from "react-router-dom";
import { updateRunCalendar } from "../data/runs";
import { useState } from "react";
import { toast } from "react-toastify";
import {
  getTempoAsMinutesSecondsString,
  getSecondsAsHoursMinutesSecondsString,
} from "../data/processRunningDataHelper.js";
import CardModal from "../components/CardModal.jsx";

const RunDetailsModal = () => {
  const { calendarId, week, day } = useParams();
  const { runningData, setRunningData, newScheduleFormSubmitted } =
    useOutletContext();

  const run = runningData.weeks[week].days[day];

  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState({ ...run });

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-UK", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
    if (isEditMode) {
      setFormData({ ...run });
    }
  };

  // for (const key in run) {
  //   console.log(key, run[key]);
  // }

  const update = async () => {
    try {
      const updatedRunningData = { ...runningData };
      updatedRunningData.weeks[week].days[day] = formData;

      console.log(updatedRunningData.weeks[week].days[day]);

      setRunningData(updatedRunningData);
      await updateRunCalendar(runningData, calendarId);
      // console.log(response);
      toast.success("Run updated successfully");
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

      const updatedRunningData = { ...runningData };
      updatedRunningData.weeks[week].days[day] = { date: run.date };
      console.log(updatedRunningData.weeks[week].days[day]);
      setRunningData(updatedRunningData);
      await updateRunCalendar(runningData, calendarId);
      toast.success("Run deleted successfully");
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
      <h2 className="card-title text-xl font-bold">
        {isEditMode ? (
          <div>
            <div>Name: </div>
            <input
              type="text"
              name="name"
              value={formData.name || ""}
              onChange={handleChange}
              className="input input-bordered w-full mt-2"
            />
          </div>
        ) : (
          <div>
            <span>{formData.name ? formData.name + ", " : ""}</span>
            <span>{formatDate(formData.date)}</span>{" "}
          </div>
        )}
      </h2>
      <div className="flex space-x-2 justify-end">
        <button
          className="btn btn-sm btn-neutral hover:btn-error"
          onClick={handleDelete}
        >
          Delete
        </button>
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
            <span>{formData.distance ? `${formData.distance} km` : ""}</span>
          )}
        </div>
        {isEditMode ? (
          <div>
            <strong>Type: </strong>
            <select
              className="select select-bordered w-full max-w-xs mt-2"
              value={formData.type}
              name="type"
              onChange={handleChange}
            >
              <option defaultValue="Select a type">
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
        ) : (
          <div>
            <strong>Type: </strong>
            <span>{formData.type || ""}</span>
          </div>
        )}
        <div>
          {isEditMode ? (
            <>
              <strong>Duration (seconds): </strong>
              <input
                type="number"
                name="duration"
                value={formData.duration || ""}
                onChange={handleChange}
                className="input input-bordered w-full mt-2"
              />
            </>
          ) : (
            <>
              <strong>Duration: </strong>
              <span>
                {formData.duration
                  ? getSecondsAsHoursMinutesSecondsString(formData.duration)
                  : null}
              </span>
            </>
          )}
        </div>
        <div>
          <strong>Effort: </strong>
          {isEditMode ? (
            <>
              <input
                type="range"
                name="effort"
                min={0}
                max="10"
                onChange={handleChange}
                value={formData.effort || 0}
                className="range range-primary mt-3"
                step="1"
              />
              <div className="flex w-full justify-between px-2 text-xs">
                <span>0</span>
                <span>|</span>
                <span>|</span>
                <span>|</span>
                <span>|</span>
                <span>5</span>
                <span>|</span>
                <span>|</span>
                <span>|</span>
                <span>|</span>
                <span>10</span>
              </div>
            </>
          ) : (
            <span>
              {formData.effort !== undefined ? formData.effort + " / 10" : null}
            </span>
          )}
        </div>
        {isEditMode ? null : (
          <div>
            <strong>Pace: </strong>
            <span>
              {formData.tempo
                ? getTempoAsMinutesSecondsString(formData.tempo) +
                  " " +
                  "min/km"
                : null}
            </span>
          </div>
        )}
         <div>
          <strong>Average Heart Rate: </strong>
          {isEditMode ? (
            <input
              type="number"
              name="avg_hr"
              value={formData.avg_hr || ""}
              onChange={handleChange}
              className="input input-bordered w-full mt-2"
            />
          ) : (
            <span>{formData.avg_hr ? `${formData.avg_hr} bpm` : ""}</span>
          )}
        </div>
        <div>
          <strong>Equipment: </strong>
          {isEditMode ? (
            <input
              type="text"
              name="equipment"
              value={formData.equipment || ""}
              onChange={handleChange}
              className="input input-bordered w-full mt-2"
            />
          ) : (
            <span>{formData.equipment || ""}</span>
          )}
        </div>
      </div>

      <div className="mt-4">
        <h3 className="text-lg font-semibold">Notes: </h3>
        {isEditMode ? (
          <textarea
            placeholder="Add your comments here"
            rows={4}
            name="comments"
            value={formData.comments || ""}
            onChange={handleChange}
            className="placeholder-italic textarea min-h-20 resize-vertical textarea-bordered w-full mt-2"
          />
        ) : (
          <div className="bg-base-200 min-h-20 p-2 rounded mt-4">
            {formData.comments || ""}
          </div>
        )}
      </div>
    </CardModal>
  );
};

export default RunDetailsModal;
