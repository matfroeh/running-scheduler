import { CardModal } from "@/components";
import { useState, useEffect, useRef } from "react";
import { useParams, useOutletContext, useNavigate } from "react-router-dom";
import {
  getEquipmentById,
  updateEquipment,
  deleteEquipmentFromUserList,
} from "../data/user";
import { useAuth } from "@/context";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import axios from "axios";


const EquipmentDetails = () => {
  const API_URL = import.meta.env.VITE_APP_RUNNING_SCHEDULER_API_URL;
  const { equipmentId } = useParams();
  const imgInputRef = useRef(null);

  const navigate = useNavigate();
  const [formData, setFormData] = useState("");
  const { user } = useAuth();
  const { setEquipmentList } = useOutletContext();
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageId, setImageId] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [images, setImages] = useState(null);
  const [error, setError] = useState(null);

  const formatDate = (date) => {
    return dayjs(date).format("YYYY-MM-DD");
  };

  useEffect(() => {
    const fetchEquipment = async () => {
      const data = await getEquipmentById(user.userId, equipmentId);
      setFormData(data);

      const imageId = data.image;
      // check if an image is available
      if (imageId) {
        const imageData = await axios.get(
          `${API_URL}/uploads/${imageId}`, {
            withCredentials: true,
          }
        );
        if (imageData) {
          setImages(imageData.data);
        }
      }
    };
    fetchEquipment();
  }, [equipmentId, user.userId]);

  const arrayBufferToBase64 = (buffer) => {
    let binary = "";
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

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
    if (!handleInputVerification()) return;
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
    const response = await fetch(`${API_URL}/uploads`, {
      method: "POST",
      credentials: "include",
      body: formData,
    });
    const data = await response.json();
    setImageId(data);
  };

  const handleInputVerification = () => {
    if (!formData.name) {
      setError("Please specify a name for the equipment.");
      return false;
    }
    if (!formData.type) {
      setError("Please specify a type for the equipment.");
      return false;
    }
    if (!formData.inUseSince) {
      setError("Please specify when the equipment was put into use.");
      return false;
    }
    if (isNaN(formData.distance) || formData.distance < 0) {
      setError("Please specify a valid distance the equipment has covered.");
      return false;
    }
    if (isNaN(formData.time) || formData.time < 0) {
      setError("Please specify time the equipment has been used.");
      return false;
    }
    setError(null);
    return true;
  };

  return (
    <CardModal key={equipmentId}>
      <h2 className="card-title text-xl">Equipment Details </h2>
      <div className="flex space-x-2 justify-end">
        <button
          className="btn btn-sm btn-neutral hover:btn-error"
          onClick={handleDelete}
        >
          Delete
        </button>
        <button
          type="submit"
          className="btn btn-sm btn-success ml-2"
          onClick={update}
        >
          Save
        </button>
      </div>
      {error && (
        <p className="text-red-500 text-sm flex justify-end mt-4">{error}</p>
      )}
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

      <div>
        <div className="text-red-500">Status: </div>
        <select
          type="text"
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="select select-bordered max-w-min mt-2"
        >
          <option defaultValue="active" value="active">
            Active
          </option>
          <option value="inactive">Inactive</option>
        </select>
      </div>
      <div className="flex flex-wrap gap-4 mt-4">
        <div>
          <div>Name: </div>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="input input-bordered w-full mt-2"
          />
        </div>
        <div>
          <div>Type: </div>
          <input
            type="text"
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="input input-bordered w-full mt-2"
          />
        </div>
        <div>
          <div>Brand: </div>
          <input
            type="text"
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            className="input input-bordered w-full mt-2"
          />
        </div>
        <div>
          <div>Model: </div>
          <input
            type="text"
            name="model"
            value={formData.model}
            onChange={handleChange}
            className="input input-bordered w-full mt-2"
          />
        </div>
        <div>
          <div>Distance (km): </div>
          <input
            type="number"
            name="distance"
            value={formData.distance}
            onChange={handleChange}
            className="input input-bordered w-full mt-2"
          />
        </div>
        <div>
          <div>Usage time (h): </div>
          <input
            type="number"
            name="time"
            value={formData.time}
            onChange={handleChange}
            className="input input-bordered w-full mt-2"
          />
        </div>
        <div>
          <div>Description: </div>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="input input-bordered w-full mt-2"
          />
        </div>
        <div>
          <div>In use since: </div>
          <input
            type="date"
            name="inUseSince"
            value={formatDate(formData.inUseSince)}
            onChange={handleChange}
            className="input input-bordered w-full mt-2"
          />
        </div>
      </div>
    </CardModal>
  );
};

export default EquipmentDetails;
