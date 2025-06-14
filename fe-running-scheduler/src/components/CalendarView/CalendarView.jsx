import { CalendarBar, CalendarBody } from "@/components/CalendarView";
import { Outlet } from "react-router";
import {
    useCalendarLoading,
    useSaveNewSchedule,
    useCalendarViewToggles,
} from "@/lib/hooks";
import { Loading } from "@/components/generic";
import { ErrorPage } from "@/components/misc";
// import { JsonFileHandler } from "@/components/misc";
// import { convertToNewModel } from "@/lib/utils/convertToNewModel";

const CalendarView = () => {
    // Custom hook for toggling the notes and schedule in the calendar view
    const {
        notes,
        hideSchedule,
        isHideScheduleChecked,
        toggleNotes,
        toggleSchedule,
    } = useCalendarViewToggles();

    // Custom hook for loading the schedule and runs; handling the cycling through the calendars based on the information on the order of the calendars fetched by the RootLayout's calendarIndexLoader
    const {
        loading,
        schedule,
        runs,
        errors,
        handleSetSchedule,
        handleSetRuns,
        cyclingProps,
        handleAddCalendarToMetaDataList,
    } = useCalendarLoading();

    // console.log("schedule", schedule);
    // console.log("runs", runs);

    // Custom hook for handling saving the newly created schedule
    useSaveNewSchedule(
        handleSetSchedule,
        handleSetRuns,
        handleAddCalendarToMetaDataList
    );

    // if (runs) {
    //   const newModel = convertToNewModel(runs, schedule);
    //   console.log("newModel", newModel);
    // }

    if (errors) {
        return <ErrorPage />;
    }

    return (
        <>
            <CalendarBar
                title={runs?.meta?.title}
                runs={runs}
                handleSetRuns={handleSetRuns}
                cyclingProps={cyclingProps}
                toggleNotes={toggleNotes}
                toggleSchedule={toggleSchedule}
                isHideScheduleChecked={isHideScheduleChecked}
            />
            <div className="flex-grow min-w-[320px]">
                {loading && <Loading />}
                {/* {!isCalendarListEmpty && !schedule && <Loading />} */}
                {!loading && schedule && (
                    <CalendarBody
                        schedule={schedule}
                        runs={runs}
                        notes={notes}
                        hideSchedule={hideSchedule}
                    />
                )}

                <Outlet
                    context={{
                        runs,
                        handleSetRuns,
                        schedule,
                        handleSetSchedule,
                    }}
                />
                {/* <JsonFileHandler
          schedule={schedule}
          runs={runs}
          calendarTitle={runs?.meta?.title}
        /> */}
            </div>
        </>
    );
};

export default CalendarView;
