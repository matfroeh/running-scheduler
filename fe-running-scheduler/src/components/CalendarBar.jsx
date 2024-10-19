import { useNavigate } from "react-router-dom";
import { handleGpxUpload as processGpx } from "../data/handleGpxUpload";
import { useRef } from "react";
import { useState, useEffect } from "react";
import { findDayObjectByDate } from "../data/processRunningDataHelper.js";

// ToDo: We really want to upload multiple files here but this can wait

const CalendarBar = ({ title, runningData, setRunningData }) => {
  // const [newRunningData, setNewRunningData] = useState(null);
  const [fileContent, setFileContent] = useState(null);
  const navigate = useNavigate();
  const gpxInputRef = useRef(null);

  title ? title : (title = "Create Your First Training Schedule");
  // console.log(newRunningData);
  // for (const key in newRunningData) {
  //   console.log(key, newRunningData[key]);
  // }

  const openCreateTrainingBlockModal = () => {
    navigate("/new-schedule");
  };

  // This passes the click on the normal button to the hidden input field button
  const handleGpxInputClick = () => {
    console.log("handleinput event called");
    gpxInputRef.current.click();
  };

  // Finally, this function reads the file content and sets it to the state
  const handleGpxFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setFileContent(reader.result);
    };
    reader.readAsText(file);
  };

  // I don't see any other way to do this but with useEffect
  useEffect(() => {
    if (fileContent) {
      // setNewRunningData(processGpx(fileContent));
      const newRunningData = processGpx(fileContent);
      const [week, day] = findDayObjectByDate(newRunningData.date, runningData);
      if (week && day) {
        const updatedRunningData = { ...runningData };
        updatedRunningData[week][day] = newRunningData;
        setRunningData(updatedRunningData);
      }
    }
  }, [fileContent]);

  // ToDo: this can be done in a different way using onInput event (see bookmarked article)
  // Spielerei
  // const handleTitleChange = (e) => {
  //   console.log(e.target.value);
  //   setThisTitle(e.target.value);
  //   setTrainingBlockData( (prev) => { return {...prev, title: e.target.value} });
  // };

  return (
    <div className="navbar">
      <span className="navbar-start">
        <button className="btn btn-sm">Back</button>
        <button className="btn btn-sm">Current</button>
        <button className="btn btn-sm">Next</button>
        {/* {newRunningData && <span>{newRunningData.name}</span>} */}
      </span>
      <div className="px-4">
        <div className="btn btn-sm ring-1" onClick={handleGpxInputClick}>
          Upload .gpx
          <input
            ref={gpxInputRef}
            type="file"
            onChange={handleGpxFileChange}
            style={{ display: "none" }}
            accept=".gpx"
          />
        </div>
      </div>
      <div className="navbar-center w-1/2 justify-around ">
        {/* <input className="w-52 text-center bg-inherit" contentEditable="false" value={thisTitle} onChange={(e) => handleTitleChange(e)} /> */}

        <div className="flex">
          <span className="  rounded-md p-1">
            {title}
          </span>
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
