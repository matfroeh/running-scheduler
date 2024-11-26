const OverviewControls = ({ selectedMode, handleSelectOne, handleSelectAll }) => (
    <div className="navbar flex gap-2 justify-center">
      <button
        className={`btn btn-sm ${selectedMode === "one" ? "btn-accent" : ""}`}
        onClick={handleSelectOne}
      >
        Select One
      </button>
      <button
        className={`btn btn-sm ${selectedMode === "all" ? "btn-primary" : ""}`}
        onClick={handleSelectAll}
      >
        Select All
      </button>
    </div>
  );
  
  export default OverviewControls;
  