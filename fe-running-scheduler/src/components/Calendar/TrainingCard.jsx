import { formatDate } from "@/utils/formatDate";
import { Icons } from "@/components";

const TrainingCard = ({ data, openTrainingCard }) => {
  const { date, type, distance, description } = data;

  let isToday = false;
  date &&
    (isToday =
      new Date(date).toISOString().slice(0, 10) ===
      new Date(Date.now()).toISOString().slice(0, 10));

  const formattedDate = formatDate(date, { month: "numeric", day: "numeric" });

  const cardClasses = `card card-compact bg-gray-800 max-w-44 min-w-20 rounded-br-none rounded-bl-none rounded-tr-none ring-2 hover:ring-4 cursor-pointer 
  ${isToday && "ring-green-500"}`;

  return (
    <div className={cardClasses} onClick={openTrainingCard}>
      <div className="card-body justify-start gap-0 overflow-clip relative">
        <div className="absolute top-0 right-0 text-white text-xs mt-1 mr-2">
          {formattedDate}
        </div>
        <div className="flex flex-col gap-1 justify-start text-xs">
          {type && <div className="card-title text-sm mt-1">{type}</div>}
          <div className="flex flex-wrap text-nowrap gap-1">
            {distance && (
              <p className="flex items-center gap-x-1">
                <Icons type="goal" />
                {parseFloat(distance).toFixed(1)} km
              </p>
            )}
            {description && (
              <p className="flex items-start mt-0 text-wrap gap-x-1">
                <Icons type="note" />
                <span className="line-clamp-3"> {description}</span>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainingCard;
