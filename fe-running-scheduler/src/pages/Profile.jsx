import { CardModal } from "@/components";
import { useAuth } from "@/context";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { updateUser } from "../data/user";
import { toast } from "react-toastify";

const Profile = () => {
  const { user, setUser } = useAuth();
  const imgInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageId, setImageId] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [images, setImages] = useState(null);
  const navigate = useNavigate();


  console.log(user);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setImageUrl(reader.result);
    };
    reader.readAsDataURL(file);
    setSelectedFile(file);
  };

  const handleImageInputClick = () => {
    imgInputRef.current.click();
  };

  const uploadImage = async () => {
    const formData = new FormData();
    formData.append("image", selectedFile);
    // console.log(formData);
    // console.log(selectedFile);
    const response = await fetch("http://localhost:3000/uploads", {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    // console.log(data);
    setImageId(data);
  };

  const update = async () => {
    const updatedUserData = { ...user };
    if (imageId) updatedUserData.profilePicture = imageId;
    const updatedUser = await updateUser(user.userId, updatedUserData);
    setUser(updatedUser);
    toast.success("Equipment updated successfully");
    navigate(-1);
  };

  const arrayBufferToBase64 = (buffer) => {
    let binary = "";
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  };

  useEffect(() => {
    if (!user.profilePicture) {
      return;
    }
    // Fetch images from the server when the component mounts
    const fetchImage = async () => {
      const response = await axios.get(
        `http://localhost:3000/uploads/${user.profilePicture}`
      );
      setImages(response.data);
    };

    fetchImage();
  }, [user.profilePicture]);

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
      <div className="flex flex-col gap-2">
        <p>User Name: {user.userName}</p>
        <p>Email: {user.email}</p>
      </div>
      {imageUrl && (
        <div className="flex justify-start items-center gap-10">
          <img src={imageUrl} alt="Equipment picture" className="w-1/4 mt-4" />

          <div>
            <button
              className={
                !imageId
                  ? "btn btn-primary btn-sm ring-1 justify-self-start"
                  : "hidden"
              }
              onClick={uploadImage}
            >
              Accept and Upload
            </button>
          </div>
        </div>
      )}
      {!imageUrl && images && (
        <img
          src={`data:${images.img.contentType};base64,${arrayBufferToBase64(
            images.img.data.data
          )}`}
          alt={images.name}
          className="w-1/4 mt-4"
        />
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
    </CardModal>
  );
};

export default Profile;
