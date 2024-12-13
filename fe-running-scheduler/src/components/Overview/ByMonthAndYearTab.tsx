import { MonthlyStats, YearlyStats, StatNamesBox } from "@/components/Overview";
import { RunningCalendar } from "@/types";

interface ByMonthAndYearProps {
    loadedRuns: RunningCalendar[];
}

const ByMonthAndYearTab = ({ loadedRuns }: ByMonthAndYearProps) => {
    return (
        <div
            role="tabpanel"
            className="tab-content bg-base-200 border-accent rounded-r-2xl p-4 min-h-[75vh]"
        >
            <div className="flex flex-col md:flex-row text-sm md:text-base md:justify-center divide-x-2 md:space-x-16 divide-accent p-4 md:items-center">
                <StatNamesBox />
                <MonthlyStats runningCalendarList={loadedRuns} />
                <YearlyStats runningCalendarList={loadedRuns} />
            </div>
        </div>
    );
};

export default ByMonthAndYearTab;
