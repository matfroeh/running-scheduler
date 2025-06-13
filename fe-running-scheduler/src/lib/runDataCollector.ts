import { useFindDayObjectByDate } from "@/lib/utils";
import { RunningCalendar, RunDay } from "@/types";
import { hasExcludedWorkoutType } from "@/lib";

// returns an array of run data objects between the start and end date
export const runDataCollector = (
    startDate: string | Date,
    endDate: string | Date,
    runningCalendarList: RunningCalendar[]
): RunDay[] => {
    startDate = new Date(startDate);
    endDate = new Date(endDate);
    let runData: RunDay[] = [];

    const datesToCheck = getDatesBetween(startDate, endDate);

    datesToCheck.forEach((date) => {
        const findDayObject = useFindDayObjectByDate(date, runningCalendarList);

        for (let i = 0; i < runningCalendarList.length; i++) {
            const result = findDayObject(i);
            if (result) {
                const [week, day] = result as [string, string];
                const run = runDetails(week, day, runningCalendarList[i]);

                // filter out data without distance AND are not of type excluded workout types (e.g. rest, cross-training)
                if (hasDistance(run) && !hasExcludedWorkoutType(run)) {
                    runData.push({
                        ...run,
                    });
                    break;
                }
            }
        }
    });
    return runData;
};

export const getDatesBetween = (
    startDate: Date | string,
    endDate: Date | string
): Date[] => {
    let dates: Date[] = [];

    // if the start date is after the end date, return an empty array
    if (startDate > endDate) {
        return dates;
    }

    let currentDate = new Date(startDate);
    while (currentDate <= endDate) {
        dates.push(currentDate);
        currentDate = addDays(currentDate, 1);
    }
    return dates;
};

export const addDays = (date: Date, days: number): Date => {
    let result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
};

export const runDetails = (
    week: string,
    day: string,
    runCalendar: RunningCalendar
): RunDay => {
    return runCalendar.weeks[week].days[day];
};

export const hasDistance = (run: RunDay): boolean => {
    return run.distance > 0;
};

// type RunDay = {
//     _id: string;
//     date: string;
//     name: string;
//     distance: number;
//     type: string;
//     duration: number;
//     totalTime: number;
//     speed: number;
//     tempo: number;
//     avg_hr: number;
//     timeArray: number[];
//     velocityArray: number[];
//     comments: string;
//     equipment: string;
//     effort: number;
// };

// type Days = {
//     days: { [key: string]: RunDay };
// };

// type Weeks = {
//     [key: string]: Days;
// };

// type RunningCalendar = {
//     meta: {
//         startDate: string;
//         endDate: string;
//     };
//     weeks: Weeks;
// };
