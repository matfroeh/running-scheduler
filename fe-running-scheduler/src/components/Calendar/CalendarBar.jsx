import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { initialTitle, newTrainingSchedule } from "@/lib/uiConstants.js";
import { readMultipleFiles } from "@/lib/fileHandling.js";
import { useProcessGpxData } from "@/lib/hooks.js";
import {
  ButtonLoadingState,
  ButtonToggle,
  ButtonCalendarNavigate,
  ButtonHiddenInput,
} from "@/components";

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
  setHideSchedule,
}) => {
  const [fileContents, setFileContents] = useState([]); // Array to hold multiple file contents
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const gpxInputRef = useRef(null);

  // This function reads the content of multiple files and sets them to the state
  const handleGpxFileChange = (event) => {
    const readers = readMultipleFiles(event);

    // Wait until all files are read and set the results to fileContents
    Promise.all(readers).then((contents) => setFileContents(contents));
  };

  // This hook processes the gpx data and sets the new running data
  useProcessGpxData(
    runningData,
    setRunningData,
    fileContents,
    setFileContents,
    setIsLoading,
    toast,
    navigate
  );

  // This passes the click on the normal button to the hidden input field button
  const handleGpxInputClick = () => {
    gpxInputRef.current.click();
  };

  const openCreateTrainingBlockModal = () => {
    navigate("new-schedule");
  };

  const discardNewSchedule = () => {
    setNewScheduleFormSubmitted(false);
    showCurrentCalendar();
  };

  const toggleNotes = () => {
    setNotes(!notes);
  };

  const toggleSchedule = () => {
    setHideSchedule((prev) => !prev);
  };

  const handleCalendarEdit = () => {
    navigate(`edit-schedule`);
  };

  return (
    <>
      <div className="flex flex-auto flex-wrap navbar sticky top-0 z-10 bg-base-100">
        <div className="flex flex-1 navbar-start">
          <div className="">
            <ButtonCalendarNavigate
              text={"Previous"}
              onClick={showPreviousCalendar}
              disabled={newScheduleFormSubmitted}
            />
            <ButtonCalendarNavigate
              text={"Current"}
              onClick={showCurrentCalendar}
              disabled={newScheduleFormSubmitted}
            />
            <ButtonCalendarNavigate
              text={"Next"}
              onClick={showNextCalendar}
              disabled={newScheduleFormSubmitted}
            />
          </div>

          <div className="px-4">
            {!isLoading ? (
              <ButtonHiddenInput
                text={"Upload .gpx"}
                accept=".gpx"
                onClick={handleGpxInputClick}
                onChange={handleGpxFileChange}
                disabled={!title || newScheduleFormSubmitted ? true : false}
                refForward={gpxInputRef}
              />
            ) : (
              <ButtonLoadingState text={"Processing..."} />
            )}
          </div>
        </div>

        <div className="flex flex-1 navbar-center">
          <div className="flex flex-1  w-1/2 justify-around ">
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

              <div className="group relative">
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
                  {newTrainingSchedule}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-1 navbar-end">
          <span className="flex ">
            <ButtonToggle text={"Show Notes"} onClick={toggleNotes} />
            <ButtonToggle text={"Hide Schedule"} onClick={toggleSchedule} />
          </span>
        </div>
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
