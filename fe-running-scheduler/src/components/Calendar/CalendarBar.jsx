import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import { INITIAL_TITLE, NEW_TRAINING_SCHEDULE } from "@/lib/uiConstants.js";
// import { readMultipleFiles } from "@/lib/fileHandling.js";
import { useProcessGpxData } from "@/lib//hooks";
import {
  ButtonLoadingState,
  ButtonToggle,
  ButtonHiddenInput,
} from "@/components";
import ButtonCalendarNavigate from "@/components/Calendar/ButtonCalendarNavigate";

const CalendarBar = ({
  title,
  runs,
  handleSetRuns,
  cyclingProps: {
    showPreviousCalendar,
    showCurrentCalendar,
    showNextCalendar,
    calendarIndex,
    calendarSize,
  },
  toggleNotes,
  toggleSchedule,
}) => {
  const navigate = useNavigate();
  const gpxInputRef = useRef(null);

  // This hook processes the gpx data and sets the new running data
  const { handleGpxFileChange, isLoading } = useProcessGpxData(
    runs,
    handleSetRuns
  );
  // console.log("CalendarBar loading", loading);

  // This passes the click on the normal button to the hidden input field button
  const handleGpxInputClick = () => {
    gpxInputRef.current.click();
  };

  const openCreateTrainingBlockModal = () => {
    navigate("new-schedule");
  };

  const handleCalendarEdit = () => {
    navigate(`edit-schedule`);
  };

  return (
    <div className="flex flex-auto flex-wrap navbar sticky top-0 z-10 bg-base-100">
      <div className="flex flex-1 navbar-start">
        <div className="">
          <ButtonCalendarNavigate
            text={"Previous"}
            onClick={showPreviousCalendar}
            disabled={calendarIndex === 0 || !runs}
          />
          <ButtonCalendarNavigate
            text={"Current"}
            onClick={showCurrentCalendar}
            disabled={!runs}
          />
          <ButtonCalendarNavigate
            text={"Next"}
            onClick={showNextCalendar}
            disabled={calendarIndex === calendarSize - 1 || !runs}
          />
        </div>

        <div className="px-4">
          {!isLoading ? (
            <ButtonHiddenInput
              text={"Upload .gpx"}
              accept=".gpx"
              onClick={handleGpxInputClick}
              onChange={handleGpxFileChange}
              disabled={!title ? true : false}
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
              calendarSize !== 0 && (
                <span className="rounded-md p-1">Loading...</span>
              )
            )}
            {calendarSize === 0 && (
              <span className="rounded-md p-1">{INITIAL_TITLE}</span>
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
                {NEW_TRAINING_SCHEDULE}
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
  );
};

export default CalendarBar;
