import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { getRunByParams } from "../data/runs";
const RunDetailsModal = () => {  
  const { calendarId, runId, week, day } = useParams();

  useEffect(() => {
    (async () => {
      try {
        const run = await getRunByParams(calendarId, week, day, runId);
        console.log(run);
      } catch (error) {
        console.log(error.message);
      }
    })();
  }, []);

  // console.log(runId, week, day);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
      <div className="modal-window p-8 bg-base-100 rounded-lg border shadow-lg">
        <div>RunDetailsModal</div>
      </div>
    </div>
  );
};

export default RunDetailsModal;
