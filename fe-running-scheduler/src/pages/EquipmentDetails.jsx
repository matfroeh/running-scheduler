import { CardModal } from "@/components";
import { useState, useEffect } from "react";
import { useParams, useOutletContext, useNavigate } from "react-router-dom";
import {
  getEquipmentById,
  updateEquipment,
  getEquipmentListFromUser,
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
  }, [equipmentId]);

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
    // deleteEquipment(user.userId, equipmentId);
  };

  const update = async () => {
    // ToDo: Error handling
    const updatedEquipmentData = { ...formData };
    await updateEquipment(user.userId, equipmentId, updatedEquipmentData);
    const updatedEquipmentList = await getEquipmentListFromUser(user.userId);
    setEquipmentList(updatedEquipmentList);
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
          <div>Distance: </div>
          <input
            type="text"
            name="distance"
            value={formData.distance}
            onChange={handleChange}
            className="input input-bordered w-full mt-2"
          />
        </div>
        <div>
          <div>Usage time: </div>
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