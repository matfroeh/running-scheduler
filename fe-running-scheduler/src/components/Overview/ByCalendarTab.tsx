import { ButtonScrollTop, ButtonScrollToRef } from "@/components/generic";
import {
    OverviewControls,
    OverviewBlock,
    ChartSection,
} from "@/components/Overview";
import { getOverviewData } from "@/lib";
import { useState, useRef, SetStateAction } from "react";
import { RunningCalendar } from "@/types";

interface ByCalendarTabProps {
    loadedRuns: RunningCalendar[];
}

const ByCalendarTab = ({ loadedRuns }: ByCalendarTabProps) => {
    const overviewData = getOverviewData(loadedRuns);
    const [selectedBlock, setSelectedBlock] = useState(
        overviewData ? overviewData[0] : null
    );
    const [selectedMode, setSelectedMode] = useState("one");
    const chartRef = useRef<HTMLDivElement>(null);

    const handleBlockSelect = (
        block: SetStateAction<{
            title: string;
            startDate: string;
            endDate: string;
            weeks: never[];
        } | null>
    ) => {
        setSelectedBlock(block);
        chartRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    };

    return (
        <div
            role="tabpanel"
            className="tab-content bg-base-200 border-accent  rounded-r-2xl p-6"
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
                    className="top-30 right-6 lg:hidden"
                />
                <ButtonScrollTop />
            </div>
        </div>
    );
};

export default ByCalendarTab;
