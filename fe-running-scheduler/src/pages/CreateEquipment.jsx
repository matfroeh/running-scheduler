import { CardModal, InputErrorBar } from "@/components";
import { useState, useRef } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import { useAuth } from "@/context";
import { toast } from "react-toastify";
import { createEquipment } from "@/data/user";
import { imageChange, uploadImage } from "@/lib/fileHandling";
import { verifyCreateEquipmentInput } from "@/lib/inputVerification";
import {
  FormEquipmentStats,
  ButtonSubmit,
  ButtonHiddenInput,
  ImagePreviewGroup,
} from "@/components/Equipment";
import dayjs from "dayjs";

const CreateEquipment = () => {
  const [formData, setFormData] = useState({
    name: "",
    status: "active",
    type: "",
    brand: "",
    model: "",
    distance: 0,
    time: 0,
    description: "",
    inUseSince: dayjs(new Date(Date.now())).format("YYYY-MM-DD"),
  });
  const navigate = useNavigate();
  const imgInputRef = useRef(null);

  const [selectedFile, setSelectedFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [imageId, setImageId] = useState(null);
  const { user } = useAuth();
  const { setEquipmentList } = useOutletContext();
  const [error, setError] = useState(null);

  const handleImageInputClick = () => {
    imgInputRef.current.click();
  };

  const handleImageChange = async (e) => {
    await imageChange(e, setImageUrl, setSelectedFile);
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

  const create = async () => {
    if (!verifyCreateEquipmentInput(formData, setError)) return;
    try {
      const newEquipment = { ...formData };
      if (imageId) newEquipment.image = imageId;
      const addedEquipment = await createEquipment(user.userId, newEquipment);
      // console.log(addedEquipment);
      if (addedEquipment.error) throw new Error(addedEquipment.error);
      setEquipmentList((prev) => [...prev, addedEquipment]);
      toast.success("Equipment successfully created");
      navigate(-1);
    } catch (error) {
      toast.error(`Error creating equipment: ${error.message}`);
    }
  };

  return (
    <CardModal>
      <h2 className="card-title text-xl">Add New Equipment </h2>
      <div className="flex space-x-2 justify-end">
        <ButtonSubmit onClick={create} />
      </div>
      <InputErrorBar error={error} />
      <div className="flex flex-wrap gap-4">
        <FormEquipmentStats formData={formData} setFormData={setFormData} />

        <div className="flex flex-col">
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

          {imageUrl && (
            <ImagePreviewGroup
              imageId={imageId}
              setImage={setImage}
              imageUrl={imageUrl}
            />
          )}
        </div>
      </div>
    </CardModal>
  );
};

export default CreateEquipment;
