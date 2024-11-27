import { useLoaderData } from "react-router-dom";
import OverviewControls from "@/components/Overview/OverviewControls";
import OverviewBlock from "@/components/Overview/OverviewBlock";
import ChartSection from "@/components/Overview/ChartSection";
import { getOverviewData } from "@/utils/getOverviewData";
import { useState, useRef } from "react";
import { ButtonScrollTop, ButtonScrollToRef } from "@/components";

const Overview = () => {
  const { loadedRuns } = useLoaderData();
  const overviewData = getOverviewData(loadedRuns);
  const [selectedBlock, setSelectedBlock] = useState(overviewData ? overviewData[0] : null);
  const [selectedMode, setSelectedMode] = useState("one");
  const chartRef = useRef(null);

  const handleBlockSelect = (block) => {
    setSelectedBlock(block);
    chartRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  if (!loadedRuns.length) return (
    <div className="flex justify-center items-start mt-20 h-screen text-xl">
      Create your first Schedule and upload running data to create the Overview
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
          {overviewData.map(block => (
            <OverviewBlock
              key={block.title}
              block={block}
              selectedBlock={selectedBlock}
              selectedMode={selectedMode}
              selectBlock={handleBlockSelect}
            />
          ))}
        </div>

        <div ref={chartRef} className="flex flex-col gap-8 mt-8 items-center max-w-2xl">
          <ChartSection selectedMode={selectedMode} overviewData={overviewData} selectedBlock={selectedBlock} />
        </div>
      </div>
      <ButtonScrollToRef forwardRef={chartRef} className="top-20 right-6 lg:hidden" />
      <ButtonScrollTop />
    </div>
  );
};

export default Overview;