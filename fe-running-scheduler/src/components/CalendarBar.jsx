import { useNavigate } from "react-router-dom";

const CalendarBar = ({ title }) => {
  const navigate = useNavigate();

  const openCreateTrainingBlockModal = () => {
    navigate("/new-schedule");
  };

  title? title : title = "Training July - October 2024";

  return (
    <div className="navbar">
      <span className="navbar-start">
        <button className="btn btn-sm">Back</button>
        <button className="btn btn-sm">Current</button>
        <button className="btn btn-sm">Next</button>
      </span>
      <div className="navbar-center">
        <span>{title}</span>
        <div className="group relative w-max">
          <button
            className="btn btn-sm btn-circle mx-4"
            onClick={openCreateTrainingBlockModal}
          >
            +
          </button>
          <span
            className="pointer-events-none absolute -top-6 -left-6 text-sm w-max 
          opacity-0 transition-opacity duration-700 bg-base-100 group-hover:opacity-100"
          >
            New Training Block
          </span>
        </div>
      </div>
      <span className="navbar-end">
        <button className="btn btn-sm">Details</button>
        <button className="btn btn-sm">Notes</button>
      </span>
    </div>
  );
};

export default CalendarBar;
