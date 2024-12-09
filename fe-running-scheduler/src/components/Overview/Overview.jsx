import { getOverviewData } from "@/lib";
import { useState, useRef } from "react";
import { ButtonScrollTop, ButtonScrollToRef } from "@/components/generic";
import {
  OverviewControls,
  OverviewBlock,
  ChartSection,
} from "@/components/Overview";
import { useQuery } from "@tanstack/react-query";
import { getAllRunsQuery } from "@/loader/overviewLoader";
import { runDataCollector, getAvgFromRunDataArray } from "@/lib";

const Overview = () => {
  // see loader/overviewLoader.js for the query.
  // This combines the react-router loader with the react-query caching and works very nicely together.
  // To showcase this: edit the distance of a run and then switch to the overview page. The changes will be reflected immediately without a visible reload.
  const { data: loadedRuns } = useQuery(getAllRunsQuery());

  // console.log("loadedRuns", loadedRuns);

  // // just for testing now, will be later useful for a date range picker
  const runDataCollected = runDataCollector(
    new Date("2024-10-07"),
    new Date("2024-12-09"),
    loadedRuns
  );
  console.log("collected:", runDataCollected);

  const avgRunData = getAvgFromRunDataArray(runDataCollected);
  console.log("avgRunData", avgRunData);

  const overviewData = getOverviewData(loadedRuns);
  const [selectedBlock, setSelectedBlock] = useState(
    overviewData ? overviewData[0] : null
  );
  const [selectedMode, setSelectedMode] = useState("one");
  const chartRef = useRef(null);

  const handleBlockSelect = (block) => {
    setSelectedBlock(block);
    chartRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  if (!loadedRuns.length)
    return (
      <div className="flex justify-center items-start mt-20 h-screen text-xl">
        Create your first Schedule and upload running data to create the
        Overview
      </div>
    );

  return (
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
  );
};

export default Overview;
