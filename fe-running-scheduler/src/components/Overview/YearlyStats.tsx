import { RunningCalendar } from "@/types";
import { runDataCollector, getSummaryFromRunDataArray } from "@/lib";
import {
    getTempoAsMinutesSecondsString,
    getSecondsAsHoursMinutesSecondsString,
} from "@/lib/utils";
import dayjs from "dayjs";

const YearlyStats = ({
    runningCalendarList,
}: {
    runningCalendarList: RunningCalendar[];
}) => {
    const today = new Date();
    const yearNumber = dayjs(today).format("YYYY");
    const firstDay = new Date(today.getFullYear(), 0, 1);
    const lastDay = new Date(today.getFullYear(), 11, 31);

    const runDataThisYear = runDataCollector(
        firstDay,
        lastDay,
        runningCalendarList
    );

    console.log("runDataThisYear", runDataThisYear);

    const summaryThisYear = getSummaryFromRunDataArray(runDataThisYear);

    console.log("summaryThisYear", summaryThisYear);

    const renderValue = (value: number | string | null, suffix = "") =>
        value ? `${value}${suffix}` : "-";

    return (
        <div className="p-4 text-nowrap">
            <h2 className="text-lg font-semibold">{yearNumber}</h2>
            <p>
                {renderValue(Math.round(summaryThisYear.totalDistance), " km")}
            </p>
            <p>
                {renderValue(
                    getSecondsAsHoursMinutesSecondsString(
                        summaryThisYear.totalTime
                    )
                )}
            </p>
            <p>
                {renderValue(Math.round(summaryThisYear.weeklyDistance), " km")}
            </p>
            <p>
                {renderValue(
                    getSecondsAsHoursMinutesSecondsString(
                        summaryThisYear.weeklyTime
                    )
                )}
            </p>
            <p>
                {renderValue(
                    getTempoAsMinutesSecondsString(summaryThisYear.avgTempo),
                    " /km"
                )}
            </p>
            <p>
                {renderValue(
                    Math.round(
                        summaryThisYear.avg_hr ? summaryThisYear.avg_hr : 0
                    ),
                    " bpm"
                )}
            </p>
            <p>
                {renderValue(
                    Math.round(
                        summaryThisYear.avgEffort
                            ? summaryThisYear.avgEffort
                            : 0 * 10
                    ) / 10,
                    "/10"
                )}
            </p>
            <p>
                {renderValue(
                    Math.round(summaryThisYear.numberOfWeeks * 10) / 10
                )}
            </p>
        </div>
    );
};

export default YearlyStats;
