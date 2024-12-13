import {
    ByCalendarTab,
    ByMonthAndYearTab,
    ByDateRangeTab,
} from "@/components/Overview";
import { useQuery } from "@tanstack/react-query";
import { getAllRunsQuery } from "@/loader/overviewLoader";
// import { runDataCollector, getSummaryFromRunDataArray } from "@/lib";

const Overview = () => {
    // see loader/overviewLoader.js for the query.
    // This combines the react-router loader with the react-query caching and works very nicely together.
    // To showcase this: edit the distance of a run and then switch to the overview page. The changes will be reflected immediately without a visible reload.
    const { data: loadedRuns } = useQuery(getAllRunsQuery());

    // just for testing now, will be later used for a date range picker and for revising the overview data calculation
    // const runDataCollected = runDataCollector(
    //   new Date("2024-07-15"),
    //   new Date("2024-05-06"),
    //   loadedRuns
    // );
    // console.log("collected:", runDataCollected);

    // const avgRunData = getSummaryFromRunDataArray(runDataCollected);
    // console.log("avgRunData", avgRunData);
    // end of testing

    if (!loadedRuns.length)
        return (
            <div className="flex justify-center items-start mt-20 h-screen text-xl">
                Create your first Schedule and upload running data to create the
                Overview
            </div>
        );
    {
        /* <MonthlyStats runningCalendarList={loadedRuns} /> */
    }

    return (
        <div role="tablist" className="tabs tabs-lifted mt-8">
            <input
                type="radio"
                name="overview_tabs"
                role="tab"
                className="tab text-nowrap text-base font-semibold bg-base-100"
                defaultChecked
                aria-label="By Calendar"
            />
            <ByCalendarTab loadedRuns={loadedRuns} />

            <input
                type="radio"
                name="overview_tabs"
                role="tab"
                className="tab text-nowrap text-base font-semibold bg-base-100"
                aria-label="By Date Range"
            />
            <ByDateRangeTab loadedRuns={loadedRuns} />

            <input
                type="radio"
                name="overview_tabs"
                role="tab"
                className="tab text-nowrap text-base font-semibold bg-base-100"
                aria-label="Current Month and Year"
            />
            <ByMonthAndYearTab loadedRuns={loadedRuns} />
        </div>
    );
};

export default Overview;

// [--tab-bg:#14191E] [--tab-border-color:#00B29F]

// const overviewData = getOverviewData(loadedRuns);
// const [selectedBlock, setSelectedBlock] = useState(
//     overviewData ? overviewData[0] : null
// );
// const [selectedMode, setSelectedMode] = useState("one");
// const chartRef = useRef(null);

// const handleBlockSelect = (block) => {
//     setSelectedBlock(block);
//     chartRef.current?.scrollIntoView({
//         behavior: "smooth",
//         block: "start",
//     });
// };

{
    /* <div
                role="tabpanel"
                className="tab-content bg-base-100 border-base-300 rounded-box p-6"
            >
                <div className="flex flex-col items-center">
                    <OverviewControls
                        selectedMode={selectedMode}
                        handleSelectOne={() => setSelectedMode("one")}
                        handleSelectAll={() => setSelectedMode("all")}
                    />
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-4 mb-8">
                        <div className="flex flex-col gap-8 mt-8 max-w-xl">
                            {overviewData.map((block) => (
                                <OverviewBlock
                                    key={block.title}
                                    block={block}
                                    selectedBlock={selectedBlock}
                                    selectedMode={selectedMode}
                                    selectBlock={handleBlockSelect}
                                />
                            ))}
                        </div>
                        <div
                            ref={chartRef}
                            className="flex flex-col gap-8 mt-8 items-center max-w-2xl"
                        >
                            <ChartSection
                                selectedMode={selectedMode}
                                overviewData={overviewData}
                                selectedBlock={selectedBlock}
                            />
                        </div>
                    </div>
                    <ButtonScrollToRef
                        forwardRef={chartRef}
                        className="top-20 right-6 lg:hidden"
                    />
                    <ButtonScrollTop />
                </div>
            </div> */
}
