import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate, useOutletContext } from "react-router";
import { toast } from "react-toastify";
import {
  deleteEquipmentFromUserList,
  updateEquipment,
  getEquipmentById,
  getImageByIdFromApi,
  deleteImageById,
} from "@/data";
import { useAuth } from "@/context";
// ToDo: needs to put somewhere else in the folder structure
import { uploadImage } from "@/lib/utils";
import { verifyEquipmentInput } from "@/lib";

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
  const [isUpdating, setIsUpdating] = useState(false);

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
    if (!verifyEquipmentInput(formData, setError)) return;

    let newImageId = null;

    try {
      setIsUpdating(true);

      // upload new image, get new image id, and delete old image (ToDo: avoid in future by simply updating image)
      if (selectedFile) {
        newImageId = await handleImageUpload();
        if (!newImageId) throw new Error("Error uploading image");
        handleDeleteOldImage(imageId);
      }
      // if no image change or image upload failed, use old image id
      const updatedData = { ...formData, image: newImageId || formData.image };
      const res = await updateEquipment(user.userId, equipmentId, updatedData);

      if (res.error) throw new Error(res.error);
      handleSetEquipmentList((prev) =>
        prev.map((item) => (item._id === equipmentId ? updatedData : item))
      );
      toast.success("Equipment updated successfully");
      navigate(-1);
    } catch (error) {
      toast.error(`Error: ${error.message}`);
      setIsUpdating(false);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this equipment?"))
      return;

    try {
      setIsUpdating(true);
      await deleteEquipmentFromUserList(user.userId, equipmentId);

      if (imageId) {
        await deleteImageById(imageId);
      }
      handleSetEquipmentList((prev) =>
        prev.filter((item) => item._id !== equipmentId)
      );
      toast.success("Deleted successfully");
      navigate(-1);
    } catch (error) {
      toast.error(`Error deleting equipment: ${error.message}`);
      setIsUpdating(false);
    } finally {
      setIsUpdating(false);
    }
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

  // returns the image id
  const handleImageUpload = async () => {
    const data = await uploadImage(selectedFile, user, formData.name);
    setSelectedFile(null);
    return data;
  };

  return {
    formData,
    handleChange,
    error,
    handleUpdate,
    handleDelete,
    handleImageChange,
    imageUrl,
    image,
    isUpdating,
  };
};
