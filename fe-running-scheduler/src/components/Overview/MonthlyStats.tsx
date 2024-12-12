import { RunningCalendar } from "@/types";
import { runDataCollector, getSummaryFromRunDataArray } from "@/lib";
import {
    getTempoAsMinutesSecondsString,
    getSecondsAsHoursMinutesSecondsString,
} from "@/lib/utils";
import dayjs from "dayjs";

const MonthlyStats = ({
    runningCalendarList,
}: {
    runningCalendarList: RunningCalendar[];
}) => {
    const today = new Date();
    const monthName = dayjs(today).format("MMMM");
    const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
    const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    console.log("firstDay", firstDay);
    console.log("lastDay", lastDay);

    const runDataThisMonth = runDataCollector(
        firstDay,
        lastDay,
        runningCalendarList
    );

    console.log("runDataThisMonth", runDataThisMonth);

    const summaryThisMonth = getSummaryFromRunDataArray(runDataThisMonth);

    // console.log("summaryThisMonth", summaryThisMonth);

    const renderValue = (value: number | string | null, suffix = "") =>
        value ? `${value}${suffix}` : "-";

    return (
        <div className="p-4 text-nowrap">
            <h2 className="text-lg font-semibold">{monthName}</h2>
            <p>
                {renderValue(Math.round(summaryThisMonth.totalDistance), " km")}
            </p>
            <p>
                {renderValue(
                    getSecondsAsHoursMinutesSecondsString(
                        summaryThisMonth.totalTime
                    )
                )}
            </p>
            <p>
                {renderValue(
                    Math.round(summaryThisMonth.weeklyDistance),
                    " km"
                )}
            </p>
            <p>
                {renderValue(
                    getSecondsAsHoursMinutesSecondsString(
                        summaryThisMonth.weeklyTime
                    )
                )}
            </p>
            <p>
                {renderValue(
                    getTempoAsMinutesSecondsString(summaryThisMonth.avgTempo),
                    " /km"
                )}
            </p>
            <p>
                {renderValue(
                    Math.round(
                        summaryThisMonth.avg_hr ? summaryThisMonth.avg_hr : 0
                    ),
                    " bpm"
                )}
            </p>
            <p>
                {renderValue(
                    Math.round(
                        (summaryThisMonth.avgEffort
                            ? summaryThisMonth.avgEffort
                            : 0) * 10
                    ) / 10,
                    "/10"
                )}
            </p>
            <p>
                {renderValue(
                    Math.round(summaryThisMonth.numberOfWeeks * 10) / 10
                )}
            </p>
        </div>
    );
};

export default MonthlyStats;
