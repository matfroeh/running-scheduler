const CalendarBar = () => {
  return (
    <div className="navbar bg-base-100">
      <span className="navbar-start">
        <button className="btn">Back</button>
        <button className="btn">Today</button>
        <button className="btn">Next</button>
      </span>
      <span className="navbar-center">Training July - October 2024</span>
      <span className="navbar-end">
        <button className="btn">
          Details
        </button>
        <button className="btn">
          Notes
        </button>
      </span>
    </div>
  );
};

export default CalendarBar;
