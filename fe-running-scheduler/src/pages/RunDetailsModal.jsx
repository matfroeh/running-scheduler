import { useParams, useOutletContext, Link } from "react-router-dom";
import { updateRunCalendar } from "../data/runs";
import { useState } from "react";

const RunDetailsModal = () => {
  const { calendarId, week, day } = useParams();
  const { runningData, setRunningData } = useOutletContext();

  // console.log(runningData);

  const run = runningData.weeks[week].days[day];

  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState({ ...run });

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
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

  // Toggle edit mode
  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
    if (isEditMode) {
      setFormData({ ...run });
    }
  };

  for (const key in run) {
    console.log(key, run[key]);
  }

  const update = async () => {
    try {
      const updatedRunningData = { ...runningData };
      updatedRunningData.weeks[week].days[day] = formData;
      console.log(updatedRunningData.weeks[week].days[day]);
      setRunningData(updatedRunningData);
      const response = await updateRunCalendar(runningData, calendarId);
      console.log(response);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="fixed overflow-hidden inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
      <div className="card max-h-screen overflow-auto modal-window p-4 bg-base-100 rounded-lg border shadow-lg">
        <div className="card w-full  bg-base-100 shadow-xl p-2">
          <div className="card-body overflow-y-scroll h-max">
          <div className="flex justify-end">
            <Link className="btn btn-md text-lg btn-ghost" to={`/${calendarId}`}>
              X
            </Link>
          </div>
            <h2 className="card-title text-xl font-bold">Run Details</h2>

            <div className="flex justify-end">
              <button
                className="btn btn-sm btn-primary"
                onClick={toggleEditMode}
              >
                {isEditMode ? "Cancel" : "Edit"}
              </button>
              {isEditMode && (
                <button
                  className="btn btn-sm btn-success ml-2"
                  onClick={update}
                >
                  Save
                </button>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <strong>Date:</strong>
                {isEditMode ? (
                  <input
                    type="date"
                    name="date"
                    value={formData.date.split("T")[0]} // Format for date input
                    onChange={handleChange}
                    className="input input-bordered w-full"
                  />
                ) : (
                  <span>{formatDate(formData.date)}</span>
                )}
              </div>
              <div>
                <strong>Name:</strong>
                {isEditMode ? (
                  <input
                    type="text"
                    name="name"
                    value={formData.name || ""}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                  />
                ) : (
                  <span>{formData.name || "N/A"}</span>
                )}
              </div>
              <div>
                <strong>Type:</strong>
                {isEditMode ? (
                  <input
                    type="text"
                    name="type"
                    value={formData.type || ""}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                  />
                ) : (
                  <span>{formData.type || "N/A"}</span>
                )}
              </div>
              <div>
                <strong>Distance:</strong>
                {isEditMode ? (
                  <input
                    type="number"
                    name="distance"
                    value={formData.distance || ""}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                  />
                ) : (
                  <span>
                    {formData.distance ? `${formData.distance} km` : "N/A"}
                  </span>
                )}
              </div>
              <div>
                <strong>Duration:</strong>
                {isEditMode ? (
                  <input
                    type="text"
                    name="duration"
                    value={formData.duration || ""}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                  />
                ) : (
                  <span>{formData.duration || "N/A"}</span>
                )}
              </div>
              <div>
                <strong>Tempo:</strong>
                {isEditMode ? (
                  <input
                    type="text"
                    name="tempo"
                    value={formData.tempo || ""}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                  />
                ) : (
                  <span>{formData.tempo || "N/A"}</span>
                )}
              </div>
              <div>
                <strong>Speed:</strong>
                {isEditMode ? (
                  <input
                    type="text"
                    name="speed"
                    value={formData.speed || ""}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                  />
                ) : (
                  <span>{formData.speed || "N/A"}</span>
                )}
              </div>
              <div>
                <strong>Effort:</strong>
                {isEditMode ? (
                  <input
                    type="number"
                    name="effort"
                    value={formData.effort || ""}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                  />
                ) : (
                  <span>
                    {formData.effort !== undefined ? formData.effort : "N/A"}
                  </span>
                )}
              </div>
              <div>
                <strong>Average Heart Rate:</strong>
                {isEditMode ? (
                  <input
                    type="number"
                    name="avg_hr"
                    value={formData.avg_hr || ""}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                  />
                ) : (
                  <span>
                    {formData.avg_hr ? `${formData.avg_hr} bpm` : "N/A"}
                  </span>
                )}
              </div>
              <div>
                <strong>Equipment:</strong>
                {isEditMode ? (
                  <input
                    type="text"
                    name="equipment"
                    value={formData.equipment || ""}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                  />
                ) : (
                  <span>{formData.equipment || "N/A"}</span>
                )}
              </div>
            </div>

            <div className="mt-4">
              <h3 className="text-lg font-semibold">Comments</h3>
              {isEditMode ? (
                <textarea
                  name="comments"
                  value={formData.comments || ""}
                  onChange={handleChange}
                  className="textarea textarea-bordered w-full"
                />
              ) : (
                <p className="bg-base-200 p-2 rounded">
                  {formData.comments || "No comments available"}
                </p>
              )}
            </div>
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
