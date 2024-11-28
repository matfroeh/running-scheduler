import {
  CardModal,
  ButtonSave,
  ButtonDelete,
  InputErrorBar,
  Loading,
} from "@/components";
import { FormEquipmentStats, ImageContainer } from "@/components/Equipment/";
import ImageUploader from "@/components/Equipment/ImageUploader";
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
    imageProps,
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
          <ImageContainer {...imageProps} />
          <InputErrorBar error={error} />
          <ImageUploader {...imageProps}/>
          <div className="flex flex-wrap gap-4">
            <FormEquipmentStats formData={formData} onChange={handleChange} />
          </div>
        </>
      )}
    </CardModal>
  );
};

export default EquipmentDetails;
