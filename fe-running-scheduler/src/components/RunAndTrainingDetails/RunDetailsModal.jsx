import { useParams, useOutletContext, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { updateRunCalendar } from "@/data";
import {
  getTempoAsMinutesSecondsString,
  getSecondsAsHoursMinutesSecondsString,
} from "@/lib/utils";
import { updateEquipment, getEquipmentListFromUser } from "@/data";
import { CardModal, ButtonLoadingState } from "@/components/generic";
import { TypeSelectOptions } from "@/components/RunAndTrainingDetails";
import { useAuth } from "@/context";
import { LineChartTimeVelocity } from "@/components/charts";
import { formatDateYYMMDD } from "@/lib/utils";
import { verifyRunDetailsInput } from "@/lib";

const RunDetailsModal = () => {
  const { week, day } = useParams();
  const { runs, handleSetRuns } = useOutletContext();
  // console.log("runs", runs);

  const { user } = useAuth();
  const run = runs.weeks[week].days[day];
  const calendarId = runs._id;
  const navigate = useNavigate();

  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState({ ...run });
  const [equipmentChanged, setEquipmentChanged] = useState(false);
  const [equipmentList, setEquipmentList] = useState([]);
  const [error, setError] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);

  const activeEquipmentList = equipmentList.filter(
    (item) => item.status === "active"
  );

  const selectedEquipment = activeEquipmentList.find(
    (item) => item.name === formData.equipment
  );

  useEffect(() => {
    const fetchEquipmentList = async () => {
      const equipmentList = await getEquipmentListFromUser(user.userId);
      setEquipmentList(equipmentList);
    };
    fetchEquipmentList();
  }, []);

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
      setIsUpdating(true);
      const updatedRunningData = { ...runs };
      updatedRunningData.weeks[week].days[day] = formData;

      handleSetRuns(updatedRunningData);
      await updateRunCalendar(runs, calendarId);

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
      navigate(-1);
    } catch (error) {
      setIsUpdating(false);
      toast.error(error.message);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async () => {
    try {
      // alert with a confirmation box
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this run?"
      );
      if (!confirmDelete) return;

      setIsUpdating(true);

      const updatedRunningData = { ...runs };
      updatedRunningData.weeks[week].days[day] = { date: run.date };
      // console.log(updatedRunningData.weeks[week].days[day]);
      handleSetRuns(updatedRunningData);
      await updateRunCalendar(runs, calendarId);
      toast.success("Run deleted successfully.");
      navigate(-1);
    } catch (error) {
      toast.error(error.message);
      setIsUpdating(false);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleInputVerification = () => {
    const isValid = verifyRunDetailsInput(formData, setError);
    return isValid;
  };

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
              <span>{formatDateYYMMDD(formData.date)}</span>{" "}
            </div>
          )}
        </h2>
        {!isUpdating && (
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
                <button
                  className="btn btn-sm btn-success ml-2"
                  onClick={update}
                >
                  Save
                </button>
              </>
            )}
          </div>
        )}
        {isUpdating && (
          <div className="flex space-x-2 justify-end">
            <ButtonLoadingState text={"Updating..."} />
          </div>
        )}

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
            <TypeSelectOptions
              type={formData.type}
              handleChange={handleChange}
            />
          ) : (
            <div>
              <strong>Type: </strong>
              <span>{formData.type || ""}</span>
            </div>
          )}
          {!isEditMode && (
            <div>
              <strong>Activity Time: </strong>
              <span>
                {formData.duration
                  ? getSecondsAsHoursMinutesSecondsString(formData.duration)
                  : null}
              </span>
            </div>
          )}
          {!isEditMode && (
            <div>
              <strong>Total Time: </strong>
              <span>
                {formData.totalTime
                  ? getSecondsAsHoursMinutesSecondsString(formData.totalTime)
                  : null}
              </span>
            </div>
          )}
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
        <div className="">
          {!isEditMode &&
            run?.timeArray?.length > 0 &&
            run?.velocityArray?.length > 0 && (
              <LineChartTimeVelocity
                xLabel={run.timeArray}
                yFunction={run.velocityArray}
                yLabel="Tempo (min/km)"
                yAxisReversed={true}
                color={"#00CDB7"}
              />
            )}
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
    </>
  );
};

export default RunDetailsModal;