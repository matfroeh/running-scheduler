import { useNavigate } from "react-router";

const CreateScheduleControls = ({ error, handleSubmit }) => {
  const navigate = useNavigate();

  return (
    <div className="mt-10 flex flex-auto flex-row">
      <div className="w-full justify-stretch py-2">
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>

      <button
        type="button"
        className="btn btn-neutral mr-8"
        onClick={() => navigate(-1)}
      >
        Cancel
      </button>
      <button
        type="submit"
        className="btn btn-primary"
        onClick={(e) => handleSubmit(e)}
      >
        Create Schedule
      </button>
    </div>
  );
};

export default CreateScheduleControls;
