import { ImageContainer } from "@/components/Equipment";
import formatDate from "@/utils/formatDate";
import Icons from "@/components/Icons";

const EquipmentCard = ({ equipment, image, onClick }) => {
  return (
    <div
      className="card bg-gray-900 shadow-lg overflow-clip cursor-pointer"
      onClick={onClick}
    >
      <div className="card-body">
        <h2 className="card-title mb-2">{equipment.name}</h2>
        <div className="flex flex-row gap-10 justify-start">
          <div>
            <ImageContainer imageUrl={null} image={image} />
          </div>
          <div className="flex flex-col">
            <p className="flex items-center gap-x-2">
              <Icons type="distance" />
              {parseFloat(equipment.distance).toFixed(1)} km
            </p>
            <p className="flex items-center gap-x-3">
              <Icons type="time" />
              {parseFloat(equipment.time).toFixed(1)} h
            </p>
            <p className="flex items-center gap-x-3">
              <Icons type="date" />
              {formatDate(equipment.inUseSince)}
            </p>
            {equipment.description && <p>{equipment.description}</p>}
            <p
              className={
                equipment.status === "active" ? "text-red-700" : "text-gray-600"
              }
            >
              {equipment.status}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EquipmentCard;
