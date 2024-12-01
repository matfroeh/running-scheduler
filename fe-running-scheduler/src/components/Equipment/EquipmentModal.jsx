import { Link, Outlet } from "react-router-dom";
import { useEquipmentData } from "@/lib/hooks";
import { EquipmentCard } from "@/components/Equipment";
import { Loading } from "@/components/generic";
import { ErrorPage } from "@/components/misc";


// Not a modal anymore, but a page
const EquipmentModal = () => {
  const {
    equipmentList,
    handleSetEquipmentList,
    loading,
    errors,
    images,
    openEquipmentDetails,
  } = useEquipmentData();

  if (loading) return <Loading />;

  if (errors) {
    return <ErrorPage />;
  }

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
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-2">
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
      <Outlet context={{ handleSetEquipmentList }} />
    </>
  );
};

export default EquipmentModal;