import {
  CardModal,
  ButtonSave,
  ButtonDelete,
  InputErrorBar,
  Loading,
} from "@/components";
import {
  FormEquipmentStats,
  ImageViewAndInputGroup,
} from "@/components/Equipment/";
import { useEquipmentDetails } from "@/lib/hooks/useEquipmentDetails";
import { useState } from "react";

const EquipmentDetails = () => {
  const [loading, setLoading] = useState(true);

  const handleSetLoading = (value) => {
    setLoading(value);
  };

  const {
    formData,
    handleChange,
    error,
    handleDelete,
    handleUpdate,
    handleImageChange,
    imageUrl,
    image,
  } = useEquipmentDetails(handleSetLoading);

  return (
    <CardModal>
      {loading ? (
        <Loading />
      ) : (
        <>
          <h2 className="card-title text-xl">{formData.name} - Details</h2>
          <div className="flex space-x-2 justify-end">
            <ButtonDelete onClick={handleDelete} />
            <ButtonSave onClick={handleUpdate} />
          </div>
          <ImageViewAndInputGroup
            image={image}
            imageUrl={imageUrl}
            handleImageChange={handleImageChange}
          />
          <InputErrorBar error={error} />
          <div className="flex flex-wrap gap-4">
            <FormEquipmentStats formData={formData} onChange={handleChange} />
          </div>
        </>
      )}
    </CardModal>
  );
};

export default EquipmentDetails;
