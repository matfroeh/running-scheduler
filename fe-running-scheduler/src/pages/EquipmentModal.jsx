import { Link, Outlet } from "react-router-dom";
import { useEquipmentData } from "@/lib/hooks/useEquipmentData";
import { EquipmentCard } from "@/components/Equipment";
import { Loading } from "@/components";

const EquipmentModal = () => {
  const {
    equipmentList,
    setEquipmentList,
    loading,
    images,
    openEquipmentDetails,
  } = useEquipmentData();

  if (loading) return <Loading />;

  return (
    <>
      <div className="card-body relative overflow-y-auto h-max">
        <div className="card-actions justify-start mt-4">
          <Link className="btn btn-primary" to={-1}>
            Back
          </Link>
          <Link to={`new`} className="btn btn-primary">
            Add Equipment
          </Link>
        </div>
        <div className="grid grid-cols-3 gap-8 mt-2">
          {equipmentList.map((equipment) => (
            <EquipmentCard
              key={equipment._id}
              equipment={equipment}
              image={images[equipment._id]}
              onClick={() => openEquipmentDetails(equipment._id)}
            />
          ))}
        </div>
      </div>
      <Outlet context={{ setEquipmentList }} />
    </>
  );
};

export default EquipmentModal;