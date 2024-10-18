import { useNavigate } from "react-router-dom";
import { handleGpxUpload as processGpx } from "../data/handleGpxUpload";
import { useRef } from "react";
// import { useState } from "react";

const CalendarBar = ({ title }) => {
  // const [thisTitle, setThisTitle] = useState(title? title : title = "Create Your First Training Schedule");
  title ? title : (title = "Create Your First Training Schedule");
  const navigate = useNavigate();
  const gpxInputRef = useRef(null);

  const openCreateTrainingBlockModal = () => {
    navigate("/new-schedule");
  };

  const handleGpxUpload = () => {
    gpxInputRef.current.click();
    processGpx(gpxInputRef.current.files[0]);
  };

  // ToDo: this can be done in a different way using onInput event see bookmark
  // Spielerei
  // const handleTitleChange = (e) => {
  //   console.log(e.target.value);
  //   setThisTitle(e.target.value);
  //   setTrainingBlockData( (prev) => { return {...prev, title: e.target.value} });
  // };

  // title? title : title = "Create Your First Training Schedule";

  return (
    <div className="navbar">
      <span className="navbar-start">
        <button className="btn btn-sm">Back</button>
        <button className="btn btn-sm">Current</button>
        <button className="btn btn-sm">Next</button>
      </span>
      <div className="px-4">
        <div className="btn btn-sm ring-1" onClick={handleGpxUpload}>
          Upload .gpx
          <input
            ref={gpxInputRef}
            type="file"
            style={{ display: "none" }}
            accept=".gpx"
          />
        </div>
      </div>
      <div className="navbar-center w-1/2 justify-around ">
        {/* <input className="w-52 text-center bg-inherit" contentEditable="false" value={thisTitle} onChange={(e) => handleTitleChange(e)} /> */}

        <div className="flex">
          <span className="hover:ring-1 cursor-pointer rounded-md p-1">{title}</span>
          <div className="group relative w-max">
            <button
              className="btn btn-sm btn-circle mx-4 hover:ring-1"
              onClick={openCreateTrainingBlockModal}
            >
              +
            </button>
            <span
              className="pointer-events-none absolute left-6 -top-6 text-sm w-max 
          opacity-0 transition-opacity duration-700 bg-base-100 group-hover:opacity-100"
            >
              New Training Schedule
            </span>
          </div>
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
