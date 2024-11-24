import { useNavigate } from "react-router-dom";

const CreateScheduleControls = ({ error, handleSubmit }) => {
  const navigate = useNavigate();

  return (
    <div className="mt-10 flex flex-auto flex-row">
      <div className="w-full justify-stretch py-2">
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>

      <button
        type="button"
        className="px-4 py-2 rounded-lg mr-2 hover:bg-base-100 transition-colors"
        onClick={() => navigate(-1)}
      >
        Cancel
      </button>
      <button
        type="submit"
        className="w-1/3 py-2 rounded-lg hover:bg-blue-600 transition-colors"
        onClick={(e) => handleSubmit(e)}
      >
        Create Schedule
      </button>
    </div>
  );
};

export default CreateScheduleControls;
