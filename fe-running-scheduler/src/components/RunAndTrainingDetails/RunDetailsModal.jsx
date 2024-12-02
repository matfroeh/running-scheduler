import { CardModal, InputErrorBar } from "@/components/generic";
import {
  NotesField,
  RunDetailsButtonGroup,
  RunDetailsStatsAndForms,
  RunDetailsTitle,
} from "@/components/RunAndTrainingDetails";
import { useRunDetails } from "@/lib/hooks";

const RunDetailsModal = () => {
  const {
    formData,
    error,
    isUpdating,
    isEditMode,
    run,
    activeEquipmentList,
    handleChange,
    handleSetEquipmentChanged,
    toggleEditMode,
    update,
    handleDelete,
  } = useRunDetails();

  return (
    <>
      <CardModal>
        <div className="flex justify-between flex-wrap gap-y-2 mt-4">
          <RunDetailsTitle
            isEditMode={isEditMode}
            name={formData.name}
            date={formData.date}
            handleChange={handleChange}
          />
          <RunDetailsButtonGroup
            isUpdating={isUpdating}
            handleDelete={handleDelete}
            toggleEditMode={toggleEditMode}
            isEditMode={isEditMode}
            update={update}
          />
        </div>

        {isEditMode && error && <InputErrorBar error={error} />}

        <RunDetailsStatsAndForms
          isEditMode={isEditMode}
          formData={formData}
          handleChange={handleChange}
          run={run}
          activeEquipmentList={activeEquipmentList}
          handleSetEquipmentChanged={handleSetEquipmentChanged}
        />
        <NotesField
          isEditMode={isEditMode}
          text={formData.comments}
          handleChange={handleChange}
        />
      </CardModal>
    </>
  );
};

export default RunDetailsModal;
