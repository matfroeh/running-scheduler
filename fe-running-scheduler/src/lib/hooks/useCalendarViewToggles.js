import { useState, useCallback, useEffect } from "react";

// Custom hook for toggling the notes and schedule in the calendar view
export const useCalendarViewToggles = () => {
    const [notes, setNotes] = useState(false);

    // // Set toggle state of displayed schedule based on User Preferences saved as localStorage values

    const [hideSchedule, setHideSchedule] = useState(() => {
        const checkUserPreferences = localStorage.getItem("userPreferences");
        if (checkUserPreferences) {
            const userPreferences = JSON.parse(checkUserPreferences);
            return userPreferences.scheduleToggle !== undefined
                ? userPreferences.scheduleToggle
                : false;
        }
        return false;
    });

    const [isHideScheduleChecked, setIsHideScheduleChecked] = useState(false);

    // console.log("Initial hideSchedule state:", hideSchedule);
    // console.log("Initial isHideScheduleChecked state:", isHideScheduleChecked);

    // Update User Preferences in localStorage on show schedule toggle
    useEffect(() => {
        const userPreferences = JSON.parse(
            localStorage.getItem("userPreferences") || "{}"
        );
        userPreferences.scheduleToggle = hideSchedule;
        localStorage.setItem(
            "userPreferences",
            JSON.stringify(userPreferences)
        );

        // Update the isHideScheduleChecked state to reflect the current hideSchedule state in the UI
        setIsHideScheduleChecked(hideSchedule);
    }, [hideSchedule]);

    const toggleNotes = useCallback(() => {
        setNotes(!notes);
    }, [notes]);

    const toggleSchedule = useCallback(() => {
        setHideSchedule((prev) => !prev);
    }, []);

    return {
        notes,
        hideSchedule,
        isHideScheduleChecked,
        toggleNotes,
        toggleSchedule,
    };
};
