import {
  CardModal,
  InputErrorBar,
  ImageViewAndInputGroup,
  ButtonSubmit,
} from "@/components/generic";
import { useEquipmentForm } from "@/lib/hooks";
import { FormEquipmentStats } from "@/components/Equipment";

const CreateEquipment = () => {
  const {
    formData,
    handleChange,
    error,
    handleCreate,
    imageUrl,
    handleImageChange,
  } = useEquipmentForm();

  return (
    <CardModal>
      <h2 className="card-title text-xl">Add New Equipment</h2>
      <div className="flex space-x-2 justify-end">
        <ButtonSubmit onClick={handleCreate} />
      </div>
      <ImageViewAndInputGroup
        image={null}
        imageUrl={imageUrl}
        handleImageChange={handleImageChange}
      />
      <InputErrorBar error={error} />
      <div className="flex flex-wrap gap-4">
        <FormEquipmentStats formData={formData} onChange={handleChange} />
      </div>
    </CardModal>
  );
};

export default CreateEquipment;
