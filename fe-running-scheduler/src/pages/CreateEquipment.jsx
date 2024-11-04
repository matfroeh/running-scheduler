import { CardModal } from "@/components";
import { useState, useRef } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import { useAuth } from "@/context";
import { toast } from "react-toastify";
import { createEquipment } from "../data/user";
import dayjs from "dayjs";

const CreateEquipment = () => {
  const navigate = useNavigate();
  const imgInputRef = useRef(null);
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
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [imageId, setImageId] = useState(null);
  const { user } = useAuth();
  const { setEquipmentList } = useOutletContext();
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // console.log(formData);
  // console.log(imageId);

  const handleImageInputClick = () => {
    imgInputRef.current.click();
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

  const create = async () => {
    if (!handleInputVerification()) return;
    try {
      const newEquipment = { ...formData };
      if (imageId) newEquipment.image = imageId;
      const addedEquipment = await createEquipment(user.userId, newEquipment);
      console.log(addedEquipment);
      if (addedEquipment.error) throw new Error(addedEquipment.error);
      setEquipmentList((prev) => [...prev, addedEquipment]);
      toast.success("Equipment successfully created");
      navigate(-1);
    } catch (error) {
      toast.error(`Error creating equipment: ${error.message}`);
    }
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
      setError("Please specify the distance the equipment has covered.");
      return false;
    }
    if (isNaN(formData.time) || formData.time < 0) {
      setError("Please specify the time the equipment has been used.");
      return false;
    }

    setError(null);
    return true;
  };

  return (
    <CardModal>
      <h2 className="card-title text-xl">Add New Equipment </h2>
      <div className="flex space-x-2 justify-end">
        <button
          type="submit"
          className="btn btn-sm btn-success ml-2"
          onClick={create}
        >
          Save
        </button>
      </div>
      {error && (
        <p className="text-red-500 text-sm flex justify-end mt-4">{error}</p>
      )}
      <div className="flex flex-wrap gap-4">
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
          <div>Status: </div>
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
          <div>(Starting)-Distance: </div>
          <input
            type="text"
            name="distance"
            value={formData.distance}
            onChange={handleChange}
            className="input input-bordered w-full mt-2"
          />
        </div>
        <div>
          <div>Usage time until now (hours): </div>
          <input
            type="text"
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
            value={formData.inUseSince}
            onChange={handleChange}
            className="input input-bordered w-full mt-2"
          />
        </div>
        <div className="flex flex-col">
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

          {imageUrl && (
            <div className="flex flex-col justify-start mt-4">
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
              <img
                src={imageUrl}
                alt="Equipment picture"
                className="w-1/3 mt-4"
              />
            </div>
          )}
        </div>
      </div>
    </CardModal>
  );
};

export default CreateEquipment;
