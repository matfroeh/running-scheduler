import { useParams, useOutletContext, Link } from "react-router-dom";
import { updateRunCalendar } from "../data/runs";
import { useState } from "react";
import { toast } from "react-toastify";

const RunDetailsModal = () => {
  const { calendarId, week, day } = useParams();
  const { runningData, setRunningData } = useOutletContext();

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

  return (
    <div className="fixed overflow-hidden inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
      <div className="card container md:max-w-[75%] lg:max-w-[65%] xl:max-w-[50%] max-h-screen modal-window p-4 bg-base-100 rounded-lg border shadow-lg">
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
                <span>{formData.name || "N/A"}, </span>
                <span>{formatDate(formData.date)}</span>{" "}
              </div>
            )}
          </h2>

          <div className="flex justify-end">
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
                  {formData.effort !== undefined ? formData.effort : "0"} / 10
                </span>
              )}
            </div>
            {isEditMode ? null : (
              <div>
                <strong>Duration: </strong>
                <span>{formData.duration || "N/A"}</span>
              </div>
            )}
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
                  <option>Other</option>
                </select>
              </div>
            ) : (
              <div>
                <strong>Type: </strong>
                <span>{formData.type || ""}</span>
              </div>
            )}

            {isEditMode ? null : (
              <div>
                <strong>Tempo: </strong>
                <span>{formData.tempo || "N/A"}</span>
              </div>
            )}
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
        </div>
      </div>
    </div>
  );
};

export default RunDetailsModal;

// Not sure why I had needed this before? Maybe because of not using useContext before, but the current way is easier I guess than fetching from DB
// useEffect(() => {
//   (async () => {
//     try {
//       const run = await getRunByParams(calendarId, week, day, runId);
//       console.log(run);
//     } catch (error) {
//       console.log(error.message);
//     }
//   })();
// }, [calendarId, runId, week, day]);
