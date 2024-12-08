import { Icons } from "@/components/generic";

const SummaryGoalStats = ({ value, hideSchedule = false }) => {
  return (
    <div className="divide-y-4 divide-cyan-500">
      <p className="flex items-center text-nowrap gap-x-1 mb-2">
        {!hideSchedule && (
          <>
            <Icons type="goal" />
            {value}
          </>
        )}
      </p>
      <p className="spacer"></p>
    </div>
  );
};

export default SummaryGoalStats;
