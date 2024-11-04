import { useNavigate, useLocation } from "react-router-dom";
import { handleGpxUpload as processGpx } from "../logic/handleGpxUpload";
import { useRef } from "react";
import { updateRunCalendar } from "../data/runs";
import { useState, useEffect } from "react";
import { findDayObjectByDate } from "../utils/processRunningDataHelper.js";
import { toast } from "react-toastify";

// ToDo: We really want to upload multiple files here but this can wait

const CalendarBar = ({
  title,
  runningData,
  setRunningData,
  newScheduleFormSubmitted,
  setNewScheduleFormSubmitted,
  saveNewSchedule,
  showCurrentCalendar,
  showPreviousCalendar,
  showNextCalendar,
  setNotes,
  notes,
}) => {
  const [fileContents, setFileContents] = useState([]); // Array to hold multiple file contents
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  const gpxInputRef = useRef(null);

  const initialTitle = "Create A New Training Schedule";

  const openCreateTrainingBlockModal = () => {
    navigate("/new-schedule");
  };

  // This passes the click on the normal button to the hidden input field button
  const handleGpxInputClick = () => {
    gpxInputRef.current.click();
  };

  // This function reads the content of multiple files and sets them to the state
  const handleGpxFileChange = (event) => {
    const files = event.target.files;
    const readers = [];

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      readers.push(
        new Promise((resolve) => {
          reader.onload = () => {
            resolve(reader.result);
          };
          reader.readAsText(file);
        })
      );
    });

    // Wait until all files are read and set the results to fileContents
    Promise.all(readers).then((contents) => setFileContents(contents));
  };

  // Process each file's content once it is updated
  useEffect(() => {
    const processData = async () => {
      for (const content of fileContents) {
        try {
          const newRunningData = processGpx(content);
          // check if the date is within the current calendar
          const [week, day] = findDayObjectByDate(
            newRunningData.date,
            runningData
          );

          if (week && day) {
            const updatedRunningData = { ...runningData };
            updatedRunningData.weeks[week].days[day] = newRunningData;
            setRunningData(updatedRunningData);
            const response = await updateRunCalendar(
              updatedRunningData,
              runningData._id
            );
            console.log(response);
            if (response) {
              toast.success("New run added successfully");
              // Single uploaded file: directly go to run details modal
              if (fileContents.length === 1) {
                navigate(
                  `/${runningData._id}/runs/${week}/${day}/${response._id}`
                );
              }
            }
          } else {
            toast.error(
              `${newRunningData.date.slice(
                0,
                10
              )} is outside of the current calendar`
            );
          }
        } catch (error) {
          toast.error(`Error adding run: ${error.message}`);
          console.error(error);
        }
      }
    };

    if (fileContents.length > 0) {
      processData();
    }
  }, [fileContents]);

  const discardNewSchedule = () => {
    setNewScheduleFormSubmitted(false);
    showCurrentCalendar();
  };

  const toggleNotes = () => {
    setNotes(!notes);
  };

  const handleCalendarEdit = () => {
    navigate(`${currentPath}/edit-schedule`);
  };

  return (
    <>
      <div className="navbar">
        <span className="navbar-start">
          <button
            className="btn btn-sm"
            onClick={showPreviousCalendar}
            disabled={newScheduleFormSubmitted ? true : false}
          >
            Previous
          </button>
          <button
            className="btn btn-sm"
            onClick={showCurrentCalendar}
            disabled={newScheduleFormSubmitted ? true : false}
          >
            Current
          </button>
          <button
            className="btn btn-sm"
            onClick={showNextCalendar}
            disabled={newScheduleFormSubmitted ? true : false}
          >
            Next
          </button>
        </span>
        <div className="px-4">
          <div
            className="btn btn-sm ring-1 ring-accent"
            onClick={handleGpxInputClick}
            disabled={!title || newScheduleFormSubmitted ? true : false}
          >
            Upload .gpx
            <input
              ref={gpxInputRef}
              type="file"
              multiple
              onChange={handleGpxFileChange}
              style={{ display: "none" }}
              accept=".gpx"
            />
          </div>
        </div>
        <div className="navbar-center w-1/2 justify-around ">
          <div className="flex">
            {title ? (
              <span
                onClick={handleCalendarEdit}
                className="border border-accent cursor-pointer rounded-md p-1"
              >
                {title}
              </span>
            ) : (
              <span className="rounded-md p-1">{initialTitle}</span>
            )}

            <div className="group relative w-max">
              <button
                className="btn btn-sm btn-circle mx-4 hover:ring-1 ring-accent"
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
          <label className="label cursor-pointer">
            <span className="label-text text-base">Show notes only</span>
            <input
              type="checkbox"
              className="toggle toggle-accent mx-2"
              onClick={toggleNotes}
            />
          </label>
        </span>
      </div>
      {newScheduleFormSubmitted && (
        <div className="flex justify-center gap-8 mb-2 mt-4">
          <div className="indicator">
            <span className="indicator-item badge badge-accent"></span>
            <button onClick={saveNewSchedule} className="btn btn-sm">
              Save New Schedule
            </button>
          </div>
          <button onClick={discardNewSchedule} className="btn btn-sm">
            Discard
          </button>
        </div>
      )}
    </>
  );
};

export default CalendarBar;
