import { useState, useCallback } from "react";
import { useAuth } from "@/context";
import { useOutletContext, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createEquipment } from "@/data/user";
import { uploadImage } from "@/lib/fileHandling";
import { verifyCreateEquipmentInput } from "@/lib/inputVerification";
import dayjs from "dayjs";

export const useEquipmentForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    status: "active",
    type: "",
    brand: "",
    model: "",
    distance: 0,
    time: 0,
    description: "",
    inUseSince: dayjs().format("YYYY-MM-DD"),
  });
  const [error, setError] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  const { user } = useAuth();
  const { handleSetEquipmentList } = useOutletContext();
  const navigate = useNavigate();

  const handleCreate = async () => {
    if (!verifyCreateEquipmentInput(formData, setError)) return;

    let imageId = null;
    try {
      if(selectedFile) {
        imageId = await handleImageUpload();
        if (!imageId) throw new Error("Error uploading image");
      }
      const newEquipment = { ...formData, image: imageId };
      const addedEquipment = await createEquipment(user.userId, newEquipment);
      
      if (addedEquipment.error) throw new Error(addedEquipment.error);
      handleSetEquipmentList((prev) => [...prev, addedEquipment]);
      toast.success("Equipment successfully created");
      navigate(-1);
    } catch (error) {
      toast.error(`Error creating equipment: ${error.message}`);
    }
  };

  const handleImageUpload = async () => {
    const data = await uploadImage(selectedFile, user, formData.name);
    setSelectedFile(null);
    return data;
  };

  const handleChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value,
      });
    },
    [formData]
  );

  const handleImageChange = useCallback(async (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setImageUrl(reader.result);
    };
    reader.readAsDataURL(file);
    setSelectedFile(file);
  }, []);

  return {
    formData,
    handleChange,
    error,
    handleCreate,
    imageUrl,
    handleImageChange,
  };
};
