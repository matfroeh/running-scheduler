import { useParams, useOutletContext, Link } from "react-router-dom";
import { useEffect } from "react";
import { getRunByParams, updateRunCalendar } from "../data/runs";
const RunDetailsModal = () => {
  const { calendarId, runId, week, day } = useParams();
  const { runningData, setRunningData } = useOutletContext();

  // console.log(runningData);

  const run = runningData.weeks[week].days[day];

  for (const key in run) {
    console.log(key, run[key]);
  }

  const update = async () => {
    try {
      const updatedRunningData = { ...runningData };
      updatedRunningData.weeks[week].days[day].name = "This is a test";
      console.log(updatedRunningData.weeks[week].days[day]);
      setRunningData(updatedRunningData);
      const response = await updateRunCalendar(runningData, calendarId);
      console.log(response);
    } catch (error) {
      console.log(error.message);
    }

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
  };

  // console.log(runId, week, day);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
      <div className="card  w-1/2 h-1/2 modal-window p-8 bg-base-100 rounded-lg border shadow-lg">
        <div className="card-body flex flex-col justify-between">
          <div className="card-title">{run.name}</div>
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
