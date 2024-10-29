import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "@/context";
import { getEquipmentListFromUser } from "../data/user";
import { useEffect, useState } from "react";
import { CardModal } from "@/components";

const EquipmentModal = () => {
  const { user } = useAuth();
  const [equipmentList, setEquipmentList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEquipmentList = async () => {
      const data = await getEquipmentListFromUser(user.userId);
      setEquipmentList(data);
    };
    fetchEquipmentList();
  }, [user.userId]);

  const openEquipmentDetails = (equipmentId) => {
    navigate(`/equipment/${equipmentId}`);
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-UK", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    });
  };

  console.log(equipmentList);

  return (
    <>
      <CardModal>
        <h2 className="card-title">Equipment</h2>
        <div className="grid grid-cols-1 gap-4 mt-4">
          {equipmentList.map((equipment) => (
            <div
              key={equipment._id}
              className="card bg-gray-900 shadow-lg cursor-pointer"
              onClick={() => openEquipmentDetails(equipment._id)}
            >
              <div className="card-body gap-1">
                <div className="flex justify-center items-center">IMAGE</div>
                <h2 className="card-title mb-2">{equipment.name}</h2>
                {/* <p>Type: {equipment.type}</p>
                {equipment.brand && <p>Brand: {equipment.brand}</p>}
                {equipment.model && <p>Model: {equipment.model}</p>} */}
                {equipment.picture && (
                  <img src={equipment.picture} alt={equipment.name} />
                )}
                <p>Distance: {Math.round(parseFloat(equipment.distance))} km</p>
                <p>Usage time: {equipment.time} h</p>
                {equipment.description && (
                  <p>Description: {equipment.description}</p>
                )}
                <p>In use since: {formatDate(equipment.inUseSince)}</p>
                <p
                  className={
                    equipment?.status == "active"
                      ? "text-red-700"
                      : "text-gray-600"
                  }
                >
                  {equipment.status}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-end">
          <Link className="btn btn-primary">Add Equipment</Link>
        </div>
      </CardModal>
      <Outlet context={{ setEquipmentList }} />
    </>
  );
};

export default EquipmentModal;
