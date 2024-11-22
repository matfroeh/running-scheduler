import { useState, useRef, useEffect } from "react";
import { useParams, useNavigate, useOutletContext } from "react-router-dom";
import { toast } from "react-toastify";
import { deleteEquipmentFromUserList, updateEquipment } from "@/data/user";
import { useAuth } from "@/context";
import { uploadImage } from "@/lib/fileHandling";
import { verifyUpdateEquipmentInput } from "@/lib/inputVerification";
import { getEquipmentById } from "@/data/user.js";
import { getImageByIdFromApi } from "@/data/image.js";

export const useEquipmentDetails = () => {
  const { equipmentId } = useParams();
  const { user } = useAuth();
  const { setEquipmentList } = useOutletContext();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({});
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [imageId, setImageId] = useState("");
  const [error, setError] = useState(null);
  const [image, setImage] = useState();
  const [loading, setLoading] = useState(true);

  const imgInputRef = useRef(null);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const loadDetails = async () => {
      //   const data = await fetchEquipmentDetails(user, equipmentId);
      //   setFormData(data);
      const data = await getEquipmentById(user.userId, equipmentId);
      setFormData(data);

      const imageId = data.image;

      if (imageId) {
        const fetchImage = async () => {
          setLoading(true);
          try {
            const data = await getImageByIdFromApi(imageId, signal);
            setImage(data);
            // ToDo: Check if this is the correct way to handle this
          } catch (error) {
            console.error(error);
          } finally {
            setLoading(false);
          }
        };
        fetchImage();
      }
    };
    loadDetails();

    return () => {
      controller.abort();
    };
  }, [user, equipmentId]);

  const handleUpdate = async () => {
    if (!verifyUpdateEquipmentInput(formData, setError)) return;
    try {
      const updatedData = { ...formData, image: imageId || formData.image };
      await updateEquipment(user.userId, equipmentId, updatedData);
      setEquipmentList((prev) =>
        prev.map((item) => (item._id === equipmentId ? updatedData : item))
      );
      toast.success("Equipment updated successfully");
      navigate(-1);
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this equipment?"))
      return;
    await deleteEquipmentFromUserList(user.userId, equipmentId);
    setEquipmentList((prev) => prev.filter((item) => item._id !== equipmentId));
    toast.success("Deleted successfully");
    navigate(-1);
  };

  return {
    formData,
    setFormData,
    error,
    handleUpdate,
    handleDelete,
    loading,
    imageProps: {
      imageUrl,
      setSelectedFile,
      setImageUrl,
      imgInputRef,
      imageId,
      image,
      handleImageUpload: async () => {
        if (!formData.name) {
          setError("Please specify a name first.");
          return;
        }
        const data = await uploadImage(selectedFile, user, formData.name);
        setImageId(data);
      },
    },
  };
};
