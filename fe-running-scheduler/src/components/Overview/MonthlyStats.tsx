import { RunningCalendar } from "@/types";
import { runDataCollector, getSummaryFromRunDataArray } from "@/lib";
import dayjs from "dayjs";
import { SummaryStats } from "@/components/Overview";

const MonthlyStats = ({
    runningCalendarList,
}: {
    runningCalendarList: RunningCalendar[];
}) => {
    const today = new Date();
    const monthName = dayjs(today).format("MMMM");
    const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
    const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);

    const runDataThisMonth = runDataCollector(
        firstDay,
        lastDay,
        runningCalendarList
    );

    const summaryThisMonth = getSummaryFromRunDataArray(runDataThisMonth);

    return (
        <SummaryStats summaryTitle={monthName} summaryData={summaryThisMonth} />
    );
};

export default MonthlyStats;
