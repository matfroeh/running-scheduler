import { hasExcludedWorkoutType } from "@/lib";

export const calculateSummariesForOverview = (runningWeek) => {
    const totalDistanceRun = Object.keys(runningWeek.days).reduce(
        (acc, day) => {
            if (hasExcludedWorkoutType(runningWeek.days[day])) {
                return acc;
            }
            if (runningWeek.days[day].distance) {
                acc += parseFloat(runningWeek.days[day].distance);
            }
            return parseFloat(acc);
        },
        0
    );

    const totalTime = Object.keys(runningWeek.days).reduce((acc, day) => {
        if (hasExcludedWorkoutType(runningWeek.days[day])) {
            return acc;
        }
        if (runningWeek.days[day].duration > 0) {
            acc += parseInt(runningWeek.days[day].duration);
        }
        return acc;
    }, 0);

    // time weighted average heart rate
    const getAvgHr = () => {
        let avg_hr = Object.keys(runningWeek.days).reduce(
            (acc, day) => {
                if (hasExcludedWorkoutType(runningWeek.days[day])) {
                    return acc;
                }
                if (parseInt(runningWeek.days[day].avg_hr)) {
                    acc.days += 1;
                    acc.hr +=
                        parseInt(runningWeek.days[day].avg_hr) *
                        parseInt(runningWeek.days[day].duration);
                }
                return acc;
            },
            { days: 0, hr: 0 }
        );
        if (avg_hr.days > 0) {
            return avg_hr.hr / totalTime;
            // return avg_hr.hr / avg_hr.days;
        }
        return null;
    };

    // time weighted average effort
    const getEffort = () => {
        let totalEffort = Object.keys(runningWeek.days).reduce(
            (acc, day) => {
                if (hasExcludedWorkoutType(runningWeek.days[day])) {
                    return acc;
                }
                if (runningWeek.days[day].effort) {
                    acc.days += 1;
                    acc.effort +=
                        parseInt(runningWeek.days[day].effort) *
                        parseInt(runningWeek.days[day].duration);
                }
                return acc;
            },
            { days: 0, effort: 0 }
        );
        if (totalEffort.days > 0) {
            return totalEffort.effort / totalTime;
            // return totalEffort.effort / totalEffort.days
        }
        return null;
    };

    const avgPace = parseFloat(totalTime / 60 / totalDistanceRun).toFixed(2);
    const avg_hr = getAvgHr();
    const avgEffort = getEffort();

    return {
        totalDistanceRun,
        totalTime,
        avgPace,
        avg_hr,
        avgEffort,
    };
};
