import { CardModal, InputErrorBar } from "@/components/generic";
import {
  TrainingDayDetailsButtonGroup,
  TrainingDayDetailsForm,
  TrainingDayDetailsTitle,
} from "@/components/RunAndTrainingDetails";
import { useScheduleDetails } from "@/lib/hooks";

const TrainingDayDetailsModal = () => {
  const { formData, error, isUpdating, handleChange, handleDelete, update } =
    useScheduleDetails();

  return (
    <CardModal>
      <div className="flex justify-between flex-wrap gap-y-4 mt-4">
        <TrainingDayDetailsTitle
          formData={formData}
          handleChange={handleChange}
        />
        <TrainingDayDetailsButtonGroup
          isUpdating={isUpdating}
          handleDelete={handleDelete}
          update={update}
        />
      </div>
      <InputErrorBar error={error} />
      <TrainingDayDetailsForm formData={formData} handleChange={handleChange} />
    </CardModal>
  );
};

export default TrainingDayDetailsModal;
