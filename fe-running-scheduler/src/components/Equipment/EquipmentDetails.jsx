import {
  CardModal,
  ButtonSave,
  ButtonDelete,
  InputErrorBar,
  Loading,
  ImageViewAndInputGroup,
  ButtonLoadingState,
} from "@/components/generic";
import { FormEquipmentStats } from "@/components/Equipment/";
import { useEquipmentDetails } from "@/lib/hooks";
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
    isUpdating,
  } = useEquipmentDetails(handleSetLoading);

  return (
    <CardModal>
      {loading ? (
        <Loading />
      ) : (
        <>
          <h2 className="card-title text-xl">{formData.name} - Details</h2>
          <div className="flex space-x-2 justify-end">
            {!isUpdating ? (
              <>
                <ButtonDelete onClick={handleDelete} />
                <ButtonSave onClick={handleUpdate} />
              </>
            ) : (
              <ButtonLoadingState text={"Updating..."} />
            )}
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
