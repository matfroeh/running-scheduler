import {
    getTempoAsMinutesSecondsString,
    getSecondsAsHoursMinutesSecondsString,
} from "@/lib/utils";
import { AvgRunData } from "@/types";

interface SummaryStatsProps {
    summaryTitle: string;
    summaryData: AvgRunData;
}

const SummaryStats = ({ summaryTitle, summaryData }: SummaryStatsProps) => {
    const renderValue = (value: number | string | null, suffix = "") =>
        value ? `${value}${suffix}` : "-";

    return (
        <div className="p-4 text-xs md:text-base text-nowrap">
            <h2 className="text-base md:text-lg font-semibold">
                {summaryTitle}
            </h2>
            <p>{renderValue(Math.round(summaryData.totalDistance), " km")}</p>
            <p>
                {renderValue(
                    getSecondsAsHoursMinutesSecondsString(summaryData.totalTime)
                )}
            </p>
            <p>{renderValue(Math.round(summaryData.weeklyDistance), " km")}</p>
            <p>
                {renderValue(
                    getSecondsAsHoursMinutesSecondsString(
                        summaryData.weeklyTime
                    )
                )}
            </p>
            <p>
                {renderValue(
                    getTempoAsMinutesSecondsString(summaryData.avgTempo),
                    " /km"
                )}
            </p>
            <p>
                {renderValue(
                    Math.round(summaryData.avg_hr ? summaryData.avg_hr : 0),
                    " bpm"
                )}
            </p>
            <p>
                {renderValue(
                    Math.round(
                        (summaryData.avgEffort ? summaryData.avgEffort : 0) * 10
                    ) / 10,
                    "/10"
                )}
            </p>
            <p>
                {renderValue(Math.round(summaryData.numberOfWeeks * 10) / 10)}
            </p>
        </div>
    );
};

export default SummaryStats;
