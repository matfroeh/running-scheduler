import { CardModal } from "@/components";
import { useState, useEffect } from "react";
import { useParams, useOutletContext, useNavigate } from "react-router-dom";
import {
  getEquipmentById,
  updateEquipment,
  deleteEquipmentFromUserList,
} from "../data/user";
import { useAuth } from "@/context";
import { toast } from "react-toastify";
import dayjs from "dayjs";

const EquipmentDetails = () => {
  const { equipmentId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState("");
  const { user } = useAuth();
  const { setEquipmentList } = useOutletContext();
 
  const formatDate = (date) => {
    return dayjs(date).format("YYYY-MM-DD");
  };

  useEffect(() => {
    const fetchEquipment = async () => {
      const data = await getEquipmentById(user.userId, equipmentId);
      setFormData(data);
    };
    fetchEquipment();
  }, [equipmentId, user.userId]);

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
    setEquipmentList((prev) => prev.filter((equipment) => equipment._id !== equipmentId));
    toast.success("Equipment deleted successfully");
    navigate(-1);
    // deleteEquipment(user.userId, equipmentId);
  };


  const update = async () => {
    // ToDo: Error handling
    const updatedEquipmentData = { ...formData };
    await updateEquipment(user.userId, equipmentId, updatedEquipmentData);
    setEquipmentList((prev) => prev.map((equipment) => (equipment._id === equipmentId ? updatedEquipmentData : equipment)));
    toast.success("Equipment updated successfully");
    navigate(-1);
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
        <button type="submit" className="btn btn-sm btn-success ml-2" onClick={update}>
          Save
        </button>
      </div>
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
            value={parseFloat(formData.distance).toFixed(1)}
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
