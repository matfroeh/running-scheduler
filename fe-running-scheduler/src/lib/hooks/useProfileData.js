import { useAuth } from "@/context";
import { useState, useCallback } from "react";
import { useNavigate } from "react-router";
import { updateUser, deleteUser, deleteImageById } from "@/data";
import { useFetchUserProfile } from "@/lib/hooks";
import { uploadImage } from "@/lib/utils";
import { toast } from "react-toastify";

export const useProfileData = () => {
  const { user, setUser, logOut } = useAuth();
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const { image } = useFetchUserProfile(user);
  const navigate = useNavigate();

  const handleImageChange = useCallback(async (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setImageUrl(reader.result);
    };
    reader.readAsDataURL(file);
    setSelectedFile(file);
  }, []);

  const handleImageUpload = async () => {
    const data = await uploadImage(selectedFile, user, "profilePicture");
    setSelectedFile(null);
    return data;
  };

  const handleUpdate = async () => {
    let newImageId = null;

    try {
      // upload new image, get new image id, and delete old image (ToDo: avoid in future by simply updating image)
      if (selectedFile) {
        newImageId = await handleImageUpload();

        if (!newImageId) throw new Error("Error uploading image");
        if (user.profilePicture) handleDeleteOldImage(user.profilePicture);
      }
      const updatedUserData = { ...user };
      if (newImageId) updatedUserData.profilePicture = newImageId;

      const updatedUser = await updateUser(user.userId, updatedUserData);
      if (updatedUser.error) throw new Error("Error updating user" + updatedUser.error);

      setUser(updatedUser);
      toast.success("Successfully updated profile");
      navigate(-1);
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    }
  };

  const handleDeleteOldImage = useCallback(async (imageId) => {
    if (imageId) {
      await deleteImageById(imageId);
    }
  }, []);

  const deleteAccount = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete your account including all your date?"
    );
    if (!confirmDelete) return;
    else {
      const confirmDelete = window.confirm(
        "Please confirm that you want to delete your account. This action cannot be undone."
      );
      if (!confirmDelete) return;
    }
    const response = await deleteUser(user.userId);
    // console.log("response", response);

    if (response.status === 200) {
      toast.success("Account deleted successfully");
      logOut();
    } else {
      toast.error("Error deleting account");
    }
  };

  return {
    user,
    handleUpdate,
    deleteAccount,
    imageUrl,
    image,
    handleImageChange,
  };
};
