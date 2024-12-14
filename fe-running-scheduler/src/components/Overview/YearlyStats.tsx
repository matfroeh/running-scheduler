import { RunningCalendar } from "@/types";
import { runDataCollector, getSummaryFromRunDataArray } from "@/lib";
import dayjs from "dayjs";
import { SummaryStats } from "@/components/Overview";

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

    const summaryThisYear = getSummaryFromRunDataArray(runDataThisYear);

    return (
        <SummaryStats summaryTitle={yearNumber} summaryData={summaryThisYear} />
    );
};

export default YearlyStats;
