import { Link } from "react-router-dom";
import { useAuth } from "@/context";
import { getEquipmentListFromUser } from "../data/user";
import { useEffect, useState } from "react";

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
    <div className="fixed overflow-hidden inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
      <div className="card container md:max-w-[75%] lg:max-w-[65%] xl:max-w-[50%] max-h-screen modal-window p-4 bg-base-100 rounded-lg border shadow-lg">
        <div className=" card-body overflow-y-auto h-max">
          <div className="card-actions justify-end">
            <Link className="btn btn-square btn-ghost btn-sm" to={-1}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </Link>
          </div>
          <h2 className="card-title">Equipment</h2>
          <div className="grid grid-cols-1 gap-4">
            {equipmentList.map((equipment) => (
              <div key={equipment.id} className="card shadow-lg">
                <div className="card-body">
                  <h2 className="card-title">{equipment.name}</h2>
                  <p>{equipment.description}</p>
                  <p>{equipment.type}</p>
                  <p>{equipment.distance} km</p>
                  <p>{equipment.inUseSince}()</p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-end">
            <Link className="btn  btn-primary">Add Equipment</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EquipmentModal;
