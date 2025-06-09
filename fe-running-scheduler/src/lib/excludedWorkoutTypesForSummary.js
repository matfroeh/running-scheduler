const excludedWorkoutTypes = [
    "Cross Training",
    "Rest Day",
    "Strength Training",
];

export const checkForExcludedWorkoutType = (data) => {
    if (excludedWorkoutTypes.includes(data.type)) {
        return true;
    }
};
