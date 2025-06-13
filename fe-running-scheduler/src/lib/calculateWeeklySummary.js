import { getSecondsAsHoursMinutesSecondsString } from "@/lib/utils";
import { hasExcludedWorkoutType } from "@/lib";

export const calculateWeeklySummary = (scheduleWeek, runningWeek) => {
    const totalDistancePlanned = Object.keys(scheduleWeek.days).reduce(
        (acc, day) => {
            if (
                hasExcludedWorkoutType(
                    scheduleWeek.days[day] || !scheduleWeek.days[day].distance
                )
            ) {
                return acc;
            }
            return (acc += parseFloat(scheduleWeek.days[day].distance));
        },
        0
    );

    const totalDistanceRun = Object.keys(runningWeek.days).reduce(
        (acc, day) => {
            if (
                hasExcludedWorkoutType(runningWeek.days[day]) ||
                !runningWeek.days[day].distance
            ) {
                return acc; //
            }
            return acc + parseFloat(runningWeek.days[day].distance);
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
        }
        return null;
    };

    const totalTimeFormatted = getSecondsAsHoursMinutesSecondsString(totalTime);
    const avgPace = parseFloat(totalTime / 60 / totalDistanceRun).toFixed(2);
    const avg_hr = getAvgHr();
    const avgEffort = getEffort();

    return {
        totalDistancePlanned,
        totalDistanceRun,
        totalTime,
        totalTimeFormatted,
        avgPace,
        avg_hr,
        avgEffort,
    };
};
