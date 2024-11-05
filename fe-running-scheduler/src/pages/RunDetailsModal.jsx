import { useParams, useOutletContext } from "react-router-dom";
import { updateRunCalendar } from "../data/runs";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import {
  getTempoAsMinutesSecondsString,
  getSecondsAsHoursMinutesSecondsString,
} from "../utils/processRunningDataHelper.js";
import { updateEquipment, getEquipmentListFromUser } from "../data/user.js";
import { CardModal } from "@/components";
import { useAuth } from "@/context";
import LineChartTimeVelocity from "../components/charts/LineChartTimeVelocity";

const RunDetailsModal = () => {
  const { calendarId, week, day } = useParams();
  const { runningData, setRunningData, newScheduleFormSubmitted } =
    useOutletContext();
  const { user } = useAuth();
  const run = runningData.weeks[week].days[day];

  // console.log("run", run);

  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState({ ...run });
  const [equipmentChanged, setEquipmentChanged] = useState(false);
  const [equipmentList, setEquipmentList] = useState([]);
  const [error, setError] = useState(null);

  const activeEquipmentList = equipmentList.filter(
    (item) => item.status === "active"
  );

  const selectedEquipment = activeEquipmentList.find(
    (item) => item.name === formData.equipment
  );

  useEffect(() => {
    const fetchEquipmentList = async () => {
      // console.log("fetching equipment list");

      const equipmentList = await getEquipmentListFromUser(user.userId);
      // console.log(equipmentList);
      setEquipmentList(equipmentList);
    };
    fetchEquipmentList();
  }, []);

  // console.log("activeEquipmentList", activeEquipmentList);
  // console.log("equipment list", equipmentList);
  // console.log("selected equipment", selectedEquipment);

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

  const handleEquipmentChange = (e) => {
    handleChange(e);
    setEquipmentChanged(true);
  };

  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
    if (isEditMode) {
      setFormData({ ...run });
    }
  };

  const update = async () => {
    if (handleInputVerification() === false) return;

    try {
      const updatedRunningData = { ...runningData };
      updatedRunningData.weeks[week].days[day] = formData;

      setRunningData(updatedRunningData);
      await updateRunCalendar(runningData, calendarId);

      // update the equipment distance if still exists in the list (as active equipment)
      if (selectedEquipment && equipmentChanged) {
        const distanceToAdd = formData.distance || 0;
        const durationToAdd = formData.duration || 0;
        const updatedEquipment = { ...selectedEquipment };
        updatedEquipment.distance += parseFloat(distanceToAdd);
        updatedEquipment.time += Math.round((durationToAdd / 3600) * 100) / 100;

        updateEquipment(user.userId, selectedEquipment._id, updatedEquipment);
      }
      toast.success("Run updated successfully.");
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
      // console.log(updatedRunningData.weeks[week].days[day]);
      setRunningData(updatedRunningData);
      await updateRunCalendar(runningData, calendarId);
      toast.success("Run deleted successfully.");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleInputVerification = () => {
    if (!formData.name) {
      setError("Please specify a name.");
      return false;
    }
    if (
      !formData.distance ||
      isNaN(formData.distance) ||
      formData.distance <= 0
    ) {
      setError("Distance must be a number greater than 0.");
      return false;
    }
    if (
      !formData.duration ||
      isNaN(formData.duration) ||
      formData.duration <= 0
    ) {
      setError("Duration must be a number greater than 0.");
      return false;
    }
    if (!formData.avg_hr || isNaN(formData.avg_hr) || formData.avg_hr <= 0) {
      setError("Average heart rate must be a number greater than 0.");
      return false;
    }
    setError(null);
    return true;
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
    <>
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
            <>
              <button className="btn btn-sm btn-success ml-2" onClick={update}>
                Save
              </button>
            </>
          )}
        </div>
        {isEditMode && error && (
          <p className="text-red-500 text-sm flex justify-end mt-4">{error}</p>
        )}
        <div className="grid grid-cols-2 gap-4 mt-2">
          <div>
            <strong>Distance: </strong>
            {isEditMode ? (
              <input
                type="number"
                name="distance"
                value={parseFloat(formData.distance) || ""}
                onChange={handleChange}
                className="input input-bordered w-full mt-2"
              />
            ) : (
              <span>{formData.distance ? `${formData.distance} km` : ""}</span>
            )}
          </div>
          {isEditMode ? (
            <div className="">
              <strong>Type: </strong>
              <select
                className="select select-bordered w-full mt-2"
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
                <option value="Steady State">Steady State</option>
                <option value="Threshold/Tempo Run">Threshold/Tempo Run</option>
                <option value="Progression Run">Progression Run</option>
                <option value="Hill Sprints">Hill Sprints</option>
                <option value="Cross Training">Cross Training</option>
                <option value="Strength Training">Strength Training</option>
                <option value="Race Day">Race Day</option>
                <option value="Time Trial">Time Trial</option>
                <option value="Fartlek">Fartlek</option>
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
                <strong>Activity Time (seconds): </strong>
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
                <strong>Activity Time: </strong>
                <span>
                  {formData.duration
                    ? getSecondsAsHoursMinutesSecondsString(formData.duration)
                    : null}
                </span>
              </>
            )}
          </div>
          <div>
            {isEditMode ? (
              <>
                <strong>Total Time (seconds): </strong>
                <input
                  type="number"
                  name="totalTime"
                  value={formData.totalTime || ""}
                  onChange={handleChange}
                  className="input input-bordered w-full mt-2"
                />
              </>
            ) : (
              <>
                <strong>Total Time: </strong>
                <span>
                  {formData.totalTime
                    ? getSecondsAsHoursMinutesSecondsString(formData.totalTime)
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
                {formData.effort !== undefined
                  ? formData.effort + " / 10"
                  : null}
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
          {!isEditMode && <div className="spacer"></div>}
          <div>
            <strong>Equipment: </strong>
            {isEditMode ? (
              <select
                className="select select-bordered w-full mt-2"
                value={formData.equipment}
                name="equipment"
                onChange={handleEquipmentChange}
              >
                <option value="" defaultValue="Select equipment used">
                  Select equipment used
                </option>
                {activeEquipmentList.map((item) => (
                  <option key={item._id} value={item.name}>
                    {item.name}
                  </option>
                ))}
              </select>
            ) : (
              <span>{formData.equipment || ""}</span>
            )}
          </div>
        </div>
        {run.timeArray.length > 0 && run.velocityArray.length > 0 && (
          <LineChartTimeVelocity
            xLabel={run.timeArray}
            yFunction={run.velocityArray}
            yLabel="Tempo (min/km)"
            yAxisReversed={true}
            color={"#00CDB7"}
          />
        )}

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
    </>
  );
};

export default RunDetailsModal;
