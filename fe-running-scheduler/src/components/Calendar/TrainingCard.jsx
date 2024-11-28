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

  const cardClasses = `card card-compact mx-0.5 bg-gray-800 max-w-40 min-w-20 min-h-20 rounded-br-none rounded-bl-none rounded-tr-none ring-1 hover:ring-2 cursor-pointer overflow-clip  ${
    isToday && "ring-green-500"
  }`;

  return (
    <div className={cardClasses} onClick={openTrainingCard}>
      <div className="flex flex-col justify-start overflow-clip">
        <div className="absolute top-0 right-0.5 text-white text-xs">
          {formattedDate}
        </div>
        <div className="mx-3 mt-3 mb-1 flex flex-col gap-0 justify-start text-xs">
          {type && (
            <div className="card-title text-xs md:text-sm mt-1">{type}</div>
          )}
          <div className="flex flex-wrap text-nowrap gap-1">
            {distance && (
              <p className="flex items-center gap-x-1">
                <Icons type="goal" />
                {parseFloat(distance).toFixed(1)} km
              </p>
            )}
            {description && (
              <p className="flex items-start text-wrap gap-x-1">
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
