import { TypeSelectOptions } from "@/components/RunAndTrainingDetails";
import { formatDateYYMMDD } from "@/lib/utils";

const TrainingDayDetailsTitle = ({formData, handleChange}) => {
  return (
    <>
      <span className="absolute top-2 left-2 ">
        {formatDateYYMMDD(formData.date)}
      </span>
      <h2 className="card-title text-sm md:text-base lg:text-xl font-bold mt-4">
        <TypeSelectOptions type={formData.type} handleChange={handleChange} />
      </h2>
    </>
  );
};

export default TrainingDayDetailsTitle;
