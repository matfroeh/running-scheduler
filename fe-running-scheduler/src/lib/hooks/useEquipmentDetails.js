import { useState, useRef, useEffect, useCallback } from "react";
import { useParams, useNavigate, useOutletContext } from "react-router-dom";
import { toast } from "react-toastify";
import { deleteEquipmentFromUserList, updateEquipment } from "@/data/user";
import { useAuth } from "@/context";
import { uploadImage } from "@/lib/fileHandling";
import { verifyUpdateEquipmentInput } from "@/lib/inputVerification";
import { getEquipmentById } from "@/data/user.js";
import { getImageByIdFromApi, deleteImageById } from "@/data/image.js";

export const useEquipmentDetails = (handleSetLoading) => {
  const { equipmentId } = useParams();
  const { user } = useAuth();
  const { handleSetEquipmentList } = useOutletContext();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({});
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [imageId, setImageId] = useState("");
  const [error, setError] = useState(null);
  const [image, setImage] = useState();

  const imgInputRef = useRef(null);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const loadDetails = async () => {
      try {
        const data = await getEquipmentById(user.userId, equipmentId);
        setFormData(data);

        const imageId = data.image;

        if (imageId) {
          setImageId(imageId);
          const fetchImage = async () => {
            try {
              const data = await getImageByIdFromApi(imageId, signal);
              setImage(data);
            } catch (error) {
              console.error(error);
            }
          };
          fetchImage();
        }
      } catch (error) {
        console.error(error);
        handleSetLoading(false);
      } finally {
        handleSetLoading(false);
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
      handleSetEquipmentList((prev) =>
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

    if (imageId) {
      await deleteImageById(imageId);
    }
    handleSetEquipmentList((prev) =>
      prev.filter((item) => item._id !== equipmentId)
    );
    toast.success("Deleted successfully");
    navigate(-1);
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

  const handleDeleteOldImage = useCallback(async (imageId) => {
    if (imageId) {
      await deleteImageById(imageId);
    }
  }, []);

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
    handleUpdate,
    handleDelete,
    imageProps: {
      imageUrl,
      handleImageChange,
      imgInputRef,
      imageId,
      image,
      handleImageUpload: async () => {
        if (!formData.name) {
          setError("Please specify a name first.");
          return;
        }
        const data = await uploadImage(selectedFile, user, formData.name);
        if (imageId && data) {
          await handleDeleteOldImage(imageId);
        }
        setImageId(data);
      },
    },
  };
};
