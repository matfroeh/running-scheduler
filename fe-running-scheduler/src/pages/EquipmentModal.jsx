import { Link } from "react-router-dom";
import { useAuth } from "@/context";
import { getEquipmentListFromUser } from "../data/user";
import { useEffect, useState } from "react";
import CardModal from "../components/CardModal";

const EquipmentModal = () => {
  const { user } = useAuth();
  // console.log(user.id);

  // const equipmentList = await getEquipmentListFromUser(user.userId);
  const [equipmentList, setEquipmentList] = useState([]);

  useEffect(() => {
    const fetchEquipmentList = async () => {
      const data = await getEquipmentListFromUser(user.userId);
      setEquipmentList(data);
    };
    fetchEquipmentList();
  }, [user.userId]);

  console.log(equipmentList);

  // console.log(equipmentList);

  // console.log(equipmentList);

  return (
    <CardModal>
      <h2 className="card-title">Equipment</h2>
      <div className="grid grid-cols-1 gap-4">
        {equipmentList.map((equipment) => (
          <div key={equipment._id} className="card shadow-lg">
            <div className="card-body">
              <h2 className="card-title">{equipment.name}</h2>
              <p>{equipment.description}</p>
              <p>{equipment.type}</p>
              <p>{Math.round(parseFloat(equipment.distance))} km</p>
              <p>{equipment.inUseSince}()</p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-end">
        <Link className="btn  btn-primary">Add Equipment</Link>
      </div>
    </CardModal>
  );
};

export default EquipmentModal;
