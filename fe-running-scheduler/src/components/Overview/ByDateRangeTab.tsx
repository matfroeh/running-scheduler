import {
    DateRangePicker,
    StatNamesBox,
    SummaryStats,
} from "@/components/Overview";
import { runDataCollector, getSummaryFromRunDataArray } from "@/lib";
import { RunningCalendar } from "@/types";
import { formatDate } from "@/lib/utils";
import { useDateRangePicker } from "@/lib/hooks";

const ByDateRangeTab = ({ loadedRuns }: { loadedRuns: RunningCalendar[] }) => {
    const { error, dates, handleChange } = useDateRangePicker();

    const runData = runDataCollector(
        dates.startDate,
        dates.endDate,
        loadedRuns
    );
    const summary = getSummaryFromRunDataArray(runData);

    return (
        <div
            role="tabpanel"
            className="tab-content text-sm lg:text-base bg-base-200 border-accent rounded-r-2xl p-4 min-h-[75vh]"
        >
            <div className="mt-4">
                <DateRangePicker
                    dates={dates}
                    handleChange={handleChange}
                    error={error}
                />
            </div>
            <div className="mt-4 md:mt-12 flex flex-row justify-center divide-x-2 space-x-8 md:space-x-16 divide-accent p-4 items-center">
                <StatNamesBox />
                <SummaryStats
                    summaryData={summary}
                    summaryTitle={`${formatDate(
                        dates.startDate
                    )} - ${formatDate(dates.endDate)}`}
                />
            </div>
        </div>
    );
};

export default ByDateRangeTab;
