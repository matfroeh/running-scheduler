import { MonthlyStats, YearlyStats, StatNamesBox } from "@/components/Overview";
import { RunningCalendar } from "@/types";

interface ByMonthAndYearProps {
    loadedRuns: RunningCalendar[];
}

const ByMonthAndYearTab = ({ loadedRuns }: ByMonthAndYearProps) => {
    return (
        <div
            role="tabpanel"
            className="tab-content bg-base-200 border-accent rounded-box p-4 min-h-[75vh]"
        >
            <div className="flex justify-center divide-x-2 space-x-16 divide-accent p-4 items-center">
                <StatNamesBox />
                <MonthlyStats runningCalendarList={loadedRuns} />
                <YearlyStats runningCalendarList={loadedRuns} />
            </div>
        </div>
    );
};

export default ByMonthAndYearTab;
