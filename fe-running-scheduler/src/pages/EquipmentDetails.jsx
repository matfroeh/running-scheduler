import { CardModal, ButtonSave, ButtonDelete, InputErrorBar } from "@/components";
import { FormEquipmentStats, ImageContainer } from "@/components/Equipment/";
import ImageUploader from "@/components/Equipment/ImageUploader";
import { useEquipmentDetails } from "@/lib/hooks/useEquipmentDetails";

const EquipmentDetails = () => {
  const {
    formData,
    setFormData,
    error,
    handleDelete,
    handleUpdate,
    imageProps,
  } = useEquipmentDetails();

  return (
    <CardModal>
      <h2 className="card-title text-xl">{formData.name} - Details</h2>
      <div className="flex space-x-2 justify-end">
        <ButtonDelete onClick={handleDelete} />
        <ButtonSave onClick={handleUpdate} />
      </div>
      <ImageContainer {...imageProps} />
      <InputErrorBar error={error} />
      <ImageUploader {...imageProps} />
      <div className="flex flex-wrap gap-4">
        <FormEquipmentStats formData={formData} setFormData={setFormData} />
      </div>
    </CardModal>
  );
};

export default EquipmentDetails;
