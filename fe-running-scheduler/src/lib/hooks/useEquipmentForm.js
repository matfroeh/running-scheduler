import { useState, useRef } from "react";
import { useAuth } from "@/context";
import { useOutletContext, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createEquipment } from "@/data/user";
import {  uploadImage } from "@/lib/fileHandling";
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
  const [imageId, setImageId] = useState(null);

  const imgInputRef = useRef(null);
  const { user } = useAuth();
  const { setEquipmentList } = useOutletContext();
  const navigate = useNavigate();

  const handleCreate = async () => {
    if (!verifyCreateEquipmentInput(formData, setError)) return;
    try {
      const newEquipment = { ...formData, image: imageId };
      const addedEquipment = await createEquipment(user.userId, newEquipment);
      if (addedEquipment.error) throw new Error(addedEquipment.error);
      setEquipmentList((prev) => [...prev, addedEquipment]);
      toast.success("Equipment successfully created");
      navigate(-1);
    } catch (error) {
      toast.error(`Error creating equipment: ${error.message}`);
    }
  };

  const handleImageUpload = async () => {
    if (!formData.name) {
      setError("Please specify a name for the equipment first.");
      return;
    }
    const data = await uploadImage(selectedFile, user, formData.name);
    setImageId(data);
    setSelectedFile(null);
  };

  return {
    formData,
    setFormData,
    error,
    handleCreate,
    handleImageUpload,
    imageProps: {
      imageUrl,
      setSelectedFile,
      setImageUrl,
      imgInputRef,
      imageId,
    },
  };
};
