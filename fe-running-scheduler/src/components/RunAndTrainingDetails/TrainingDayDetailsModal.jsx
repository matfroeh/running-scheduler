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
      <TrainingDayDetailsTitle
        formData={formData}
        handleChange={handleChange}
      />
      <TrainingDayDetailsButtonGroup
        isUpdating={isUpdating}
        handleDelete={handleDelete}
        update={update}
      />
      <InputErrorBar error={error} />
      <TrainingDayDetailsForm formData={formData} handleChange={handleChange} />
    </CardModal>
  );
};

export default TrainingDayDetailsModal;
