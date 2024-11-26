import { CardModal, InputErrorBar } from "@/components";
import { ButtonSubmit } from "@/components/Equipment";
import { useEquipmentForm } from "@/lib/hooks/useEquipmentForm";
import FormEquipmentStats from "@/components/Equipment/FormEquipmentStats";
import ImageUploader from "@/components/Equipment/ImageUploader";

const CreateEquipment = () => {
  const {
    formData,
    handleChange,
    error,
    handleCreate,
    handleImageUpload,
    imageProps,
  } = useEquipmentForm();

  return (
    <CardModal>
      <h2 className="card-title text-xl">Add New Equipment</h2>
      <div className="flex space-x-2 justify-end">
        <ButtonSubmit onClick={handleCreate} />
      </div>
      <InputErrorBar error={error} />
      <ImageUploader {...imageProps} handleImageUpload={handleImageUpload} />
      <div className="flex flex-wrap gap-4">
        <FormEquipmentStats formData={formData} onChange={handleChange} />
      </div>
    </CardModal>
  );
};

export default CreateEquipment;