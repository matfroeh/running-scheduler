import { CardModal } from "@/components";
import { useAuth } from "@/context";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { updateUser, deleteUser } from "../data/user";
import { toast } from "react-toastify";
import { useFetchUserProfile } from "@/lib/hooks/miscDataHooks";
import { uploadImage, imageChange } from "../lib/fileHandling";
import { arrayBufferToBase64 } from "@/utils/arrayBufferToBase64";


const Profile = () => {
  const { user, setUser, logOut } = useAuth();
  const imgInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageId, setImageId] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const { image: images } = useFetchUserProfile(user);
  const navigate = useNavigate();

  const handleImageChange = async (e) => {
    await imageChange(e, setImageUrl, setSelectedFile);
  };

  const handleImageInputClick = () => {
    imgInputRef.current.click();
  };

  const setProfilePicture = async () => {
    const data = await uploadImage(selectedFile, user, "profilePicture");
    setImageId(data);
    setSelectedFile(null);
  };

  const update = async () => {
    const updatedUserData = { ...user };
    if (imageId) updatedUserData.profilePicture = imageId;
    const updatedUser = await updateUser(user.userId, updatedUserData);
    setUser(updatedUser);
    toast.success("Successfully updated profile");
    navigate(-1);
  };

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

  return (
    <CardModal>
      <h2 className="card-title text-xl">Profile </h2>
      <div className="flex space-x-2 justify-end">
        <button
          type="submit"
          className="btn btn-sm btn-success ml-2"
          onClick={update}
        >
          Save
        </button>
      </div>
      <div className="grid grid-cols-2">
        <div className="flex flex-col gap-2">
          {!imageUrl && images && (
            <img
              src={`data:${images.img.contentType};base64,${arrayBufferToBase64(
                images.img.data.data
              )}`}
              alt={images.name}
              className="w-1/3 mt-4"
            />
          )}
          <p>Username: {user.userName}</p>
          <p>Email: {user.email}</p>
          {/* <button className="btn btn-sm w-max btn-primary">
            Change Username/Email
          </button> */}
          {/* 
          <button className="btn btn-sm w-max btn-primary">
            Change Password
          </button> */}
        </div>
        <div className="flex flex-col gap-5 items-end">
          {imageUrl && (
            <>
              <img
                src={imageUrl}
                alt="Profile picture"
                className="w-1/2 mt-4"
              />

              <button
                className={
                  !imageId
                    ? "btn btn-primary btn-sm ring-1 justify-self-start"
                    : "hidden"
                }
                onClick={setProfilePicture}
              >
                Accept and Upload
              </button>
            </>
          )}

          {!imageId && (
            <div className="mt-4">
              <div
                className={
                  !imageUrl
                    ? "btn btn-sm btn-primary ring-1 justify-self-start"
                    : "btn btn-sm justify-self-start"
                }
                onClick={handleImageInputClick}
              >
                Select An Image
                <input
                  ref={imgInputRef}
                  type="file"
                  onChange={handleImageChange}
                  style={{ display: "none" }}
                  accept="image/*"
                />
              </div>
            </div>
          )}
        </div>
      </div>
      <button
        className="mx-auto btn btn-sm w-max btn-error"
        onClick={deleteAccount}
      >
        Delete Account
      </button>
    </CardModal>
  );
};

export default Profile;
