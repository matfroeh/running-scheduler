import { CardModal, ButtonSave, ButtonDelete } from "@/components";
import { useState, useRef } from "react";
import { useParams, useOutletContext, useNavigate } from "react-router-dom";
import { updateEquipment, deleteEquipmentFromUserList } from "../data/user";
import {
  FormEquipmentStats,
  ButtonHiddenInput,
  ImagePreviewGroup,
} from "@/components/Equipment";
import { imageChange, uploadImage } from "@/lib/fileHandling";
import { useAuth } from "@/context";
import { toast } from "react-toastify";
import { arrayBufferToBase64 } from "@/utils/arrayBufferToBase64";
import { verifyUpdateEquipmentInput } from "@/lib/inputVerification";
import { useFetchEquipmentDetails } from "../lib/hooks";

const EquipmentDetails = () => {
  const { equipmentId } = useParams();
  const { user } = useAuth();

  const { formData, setFormData, image } = useFetchEquipmentDetails(
    user,
    equipmentId
  );
  const { setEquipmentList } = useOutletContext();
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageId, setImageId] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState(null);

  const imgInputRef = useRef(null);
  const navigate = useNavigate();

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this equipment?"
    );
    if (!confirmDelete) return;
    await deleteEquipmentFromUserList(user.userId, equipmentId);
    setEquipmentList((prev) =>
      prev.filter((equipment) => equipment._id !== equipmentId)
    );
    toast.success("Equipment deleted successfully");
    navigate(-1);
  };

  const update = async () => {
    if (!verifyUpdateEquipmentInput(formData, setError)) return;
    try {
      const updatedEquipmentData = { ...formData };
      if (imageId) updatedEquipmentData.image = imageId;
      await updateEquipment(user.userId, equipmentId, updatedEquipmentData);
      setEquipmentList((prev) =>
        prev.map((equipment) =>
          equipment._id === equipmentId ? updatedEquipmentData : equipment
        )
      );
      toast.success("Equipment updated successfully");
      navigate(-1);
    } catch (error) {
      toast.error(`Error updating equipment: ${error.message}`);
    }
  };

  const handleImageChange = async (e) => {
    await imageChange(e, setImageUrl, setSelectedFile);
  };

  const handleImageInputClick = () => {
    imgInputRef.current.click();
  };

  const setImage = async () => {
    if (!formData.name) {
      setError("Please specify a name for the equipment first.");
      return;
    }
    const data = await uploadImage(selectedFile, user, formData.name);
    setImageId(data);
    setSelectedFile(null);
  };

  return (
    <CardModal key={equipmentId}>
      <h2 className="card-title text-xl">{formData.name} - Details </h2>
      <div className="flex space-x-2 justify-end">
        <ButtonDelete onClick={handleDelete} />
        <ButtonSave onClick={update} />
      </div>
      {error && (
        <p className="text-red-500 text-sm flex justify-end mt-4">{error}</p>
      )}
      {imageUrl && (
        <ImagePreviewGroup
          imageId={imageId}
          setImage={setImage}
          imageUrl={imageUrl}
        />
      )}
      {!imageUrl && image && (
        <img
          src={`data:${image.img.contentType};base64,${arrayBufferToBase64(
            image.img.data.data
          )}`}
          alt={image.name}
          className="w-1/4 mt-4"
        />
      )}
      {!imageId && (
        <div className="mt-4">
          <ButtonHiddenInput
            imageUrl={imageUrl}
            onClick={handleImageInputClick}
            onChange={handleImageChange}
            refForward={imgInputRef}
          />
        </div>
      )}

      <div className="flex flex-wrap gap-4 mt-4">
        <FormEquipmentStats formData={formData} setFormData={setFormData} />
      </div>
    </CardModal>
  );
};

export default EquipmentDetails;
