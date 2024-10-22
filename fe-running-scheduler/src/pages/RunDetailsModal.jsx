import { useParams, useOutletContext, Link } from "react-router-dom";
import {  updateRunCalendar } from "../data/runs";
const RunDetailsModal = () => {
  const { calendarId, week, day } = useParams();
  const { runningData, setRunningData } = useOutletContext();

  // console.log(runningData);

  const run = runningData.weeks[week].days[day];

  for (const key in run) {
    console.log(key, run[key]);
  }

  const update = async () => {
    try {
      const updatedRunningData = { ...runningData };
      // updatedRunningData.weeks[week].days[day].name = "This is a test";
      console.log(updatedRunningData.weeks[week].days[day]);
      setRunningData(updatedRunningData);
      const response = await updateRunCalendar(runningData, calendarId);
      console.log(response);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
      <div className="card modal-window p-8 bg-base-100 rounded-lg border shadow-lg">
        <div className="card-body flex flex-col justify-between">
          <div className="card-title">{run.name}</div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <strong>Date:</strong> {(run.date.slice(0, 10))}
            </div>
            <div>
              <strong>Name:</strong> {run.name || "N/A"}
            </div>
            <div>
              <strong>Type:</strong> {run.type || "N/A"}
            </div>
            <div>
              <strong>Distance:</strong>{" "}
              {run.distance ? `${run.distance} km` : "N/A"}
            </div>
            <div>
              <strong>Duration:</strong> {run.duration || "N/A"}
            </div>
            <div>
              <strong>Tempo:</strong> {run.tempo || "N/A"}
            </div>
            <div>
              <strong>Speed:</strong> {run.speed || "N/A"}
            </div>
            <div>
              <strong>Effort:</strong>{" "}
              {run.effort !== undefined ? run.effort : "N/A"}
            </div>
            <div>
              <strong>Average Heart Rate:</strong>{" "}
              {run.avg_hr ? `${run.avg_hr} bpm` : "N/A"}
            </div>
            <div>
              <strong>Equipment:</strong> {run.equipment || "N/A"}
            </div>
          </div>

          <div className="mt-4">
            <h3 className="text-lg font-semibold">Comments</h3>
            <p className="bg-base-200 p-2 rounded">
              {run.comments || "No comments available"}
            </p>
          </div>
          <div className="flex justify-between">
            <Link className="btn" to={`/${calendarId}`}>
              Close
            </Link>
            <button className="btn" onClick={update}>
              Test Update
            </button>
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

{
  /* <div className="card w-full bg-base-100 shadow-xl p-4">
<div className="card-body">
  <h2 className="card-title text-2xl font-bold">Activity Details</h2>

  <div className="grid grid-cols-2 gap-4 mt-4">
    <div>
      <strong>Date:</strong> {formatDate(data.date)}
    </div>
    <div>
      <strong>Name:</strong> {data.name || 'N/A'}
    </div>
    <div>
      <strong>Type:</strong> {data.type || 'N/A'}
    </div>
    <div>
      <strong>Distance:</strong> {data.distance ? `${data.distance} km` : 'N/A'}
    </div>
    <div>
      <strong>Duration:</strong> {data.duration || 'N/A'}
    </div>
    <div>
      <strong>Tempo:</strong> {data.tempo || 'N/A'}
    </div>
    <div>
      <strong>Speed:</strong> {data.speed || 'N/A'}
    </div>
    <div>
      <strong>Effort:</strong> {data.effort !== undefined ? data.effort : 'N/A'}
    </div>
    <div>
      <strong>Average Heart Rate:</strong> {data.avg_hr ? `${data.avg_hr} bpm` : 'N/A'}
    </div>
    <div>
      <strong>Equipment:</strong> {data.equipment || 'N/A'}
    </div>
  </div>

  <div className="mt-4">
    <h3 className="text-lg font-semibold">Comments</h3>
    <p className="bg-base-200 p-2 rounded">{data.comments || 'No comments available'}</p>
  </div>
</div>
</div>
);
}; */
}
