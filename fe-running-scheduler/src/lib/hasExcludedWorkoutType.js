const excludedWorkoutTypes = [
    "Cross Training",
    "Rest Day",
    "Strength Training",
];

export const hasExcludedWorkoutType = (data) => {
    if (excludedWorkoutTypes.includes(data.type)) {
        return true;
    }
};
