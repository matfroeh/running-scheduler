import dayjs from "dayjs";
import {
    getTotalDistance,
    getTotalTimeFromBlock,
    getAveragePace,
    getAverageHeartBeat,
    getAverageEffort,
} from "@/lib";

const OverviewBlock = ({ block, selectedBlock, selectedMode, selectBlock }) => {
    const isSelected =
        selectedBlock?.title === block.title &&
        (selectedMode === "one" || selectedMode === "multiple");

    return (
        <div
            className={`card card-compact text-primary-content cursor-pointer ${
                isSelected ? "bg-accent" : "bg-primary"
            }`}
            onClick={() =>
                (selectedMode === "one" || selectedMode === "multiple") &&
                selectBlock(block)
            }
        >
            <div className="card-body">
                <h2 className="card-title text-base lg:text-xl ">
                    {block.title}
                </h2>
                <div className="stats shadow">
                    <div className="grid grid-cols-3 gap-x-2 overflow-hidden">
                        <StatItem
                            title="Total Distance"
                            value={`${getTotalDistance(block)} km`}
                            desc={`${dayjs(block.startDate).format(
                                "DD. MMM"
                            )} to ${dayjs(block.endDate).format("DD. MMM")}`}
                        />
                        <StatItem
                            title="Weekly Distance"
                            value={`${(
                                getTotalDistance(block) / block.weeks.length
                            ).toFixed(0)} km`}
                            desc={`in ${block.weeks.length} Weeks`}
                        />
                        <StatItem
                            title="Total Time"
                            value={getTotalTimeFromBlock(block)}
                            desc="hh:mm:ss"
                        />
                        <StatItem
                            title="Average Pace"
                            value={getAveragePace(block)}
                            desc="per km"
                        />
                        <StatItem
                            title="Average HR"
                            value={getAverageHeartBeat(block)}
                            desc="bpm"
                        />
                        <StatItem
                            title="Average Effort"
                            value={getAverageEffort(block)}
                            desc="/ 10"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

const StatItem = ({ title, value, desc }) => (
    <div className="stat place-items-start -mb-2">
        <div className="stat-title text-xs lg:text-small">{title}</div>
        <div className="stat-value text-sm lg:text-2xl">{value}</div>
        <div className="stat-desc text-xs lg:text-small">{desc}</div>
    </div>
);

export default OverviewBlock;
