import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/context";
import { useEffect, useState } from "react";
import { CardModal } from "@/components";
import { getEquipmentListFromUser } from "../data/user";
import axios from "axios";
import LoadingOverlay from "react-loading-overlay-ts";

const EquipmentModal = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const { user, setUser } = useAuth();
  const [equipmentList, setEquipmentList] = useState(user.equipmentList);
  const navigate = useNavigate();
  const [images, setImages] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch images from the server when the component mounts
    const fetchImages = async () => {
      try {
        // console.log(loading);

        // console.log("fetching images");
        for (const equipment of equipmentList) {
          if (!equipment.image) {
            continue;
          }
          const response = await axios.get(
            `http://localhost:3000/uploads/${equipment.image}`,
            {
              withCredentials: true,
            }
          );
          // console.log(response.data);
          setImages((prev) => ({ ...prev, [equipment._id]: response.data }));
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchImages();
    // setLoading(false);
  }, [equipmentList]);

  useEffect(() => {
    const fetchEquipmentList = async () => {
      // console.log("fetching equipment list");
      setLoading(true);

      const equipmentList = await getEquipmentListFromUser(user.userId);
      // console.log(equipmentList);
      setUser((prev) => ({ ...prev, equipmentList }));
      setEquipmentList(equipmentList);
    };
    fetchEquipmentList();
  }, []);

  const openEquipmentDetails = (equipmentId) => {
    navigate(`${currentPath}/${equipmentId}`);
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-UK", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    });
  };

  const sortedEquipmentList = (equipmentList) => {
    let sortedList = [];
    for (let i = 0; i < equipmentList.length; i++) {
      if (equipmentList[i].status === "active") {
        sortedList.unshift(equipmentList[i]);
      }
      if (equipmentList[i].status === "inactive") {
        sortedList.push(equipmentList[i]);
      }
    }
    return sortedList;
  };

  // console.log(images);

  // console.log(user.equipmentList);
  // console.log(equipmentList);
  // console.log(images?.length);

  // useEffect(() => {
  //   setUser((prev) => ({ ...prev, equipmentList }));
  // }, [equipmentList]);

  const arrayBufferToBase64 = (buffer) => {
    let binary = "";
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  };

  return (
    <>
      <CardModal>
        <h2 className="card-title">Equipment</h2>
        {loading && (
          <div className="flex justify-center content-center items-center w-full">
            <LoadingOverlay active={true} spinner text="Loading..." />
          </div>
        )}
        <div className="grid grid-cols-3 gap-8 mt-8">
          {!loading &&
            images &&
            sortedEquipmentList(equipmentList).map((equipment) => (
              <div
                key={equipment._id}
                className="card bg-gray-900 shadow-lg overflow-clip cursor-pointer h-96"
                onClick={() => openEquipmentDetails(equipment._id)}
              >
                <div className="card-body gap-1 w-full">
                  <div className="h-1/3">
                    {images[equipment?._id] && (
                      <img
                        src={`data:${
                          images[equipment._id].img.contentType
                        };base64,${arrayBufferToBase64(
                          images[equipment._id].img.data.data
                        )}`}
                        alt={equipment.name}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  <h2 className="card-title mb-2 mt-2">{equipment.name}</h2>
                  <div>
                    <p>
                      Distance: {parseFloat(equipment.distance).toFixed(1)} km
                    </p>
                    <p>Usage time: {parseFloat(equipment.time).toFixed(1)} h</p>
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
              </div>
            ))}
        </div>
        <div className="flex justify-end">
          <Link to={`${currentPath}/new`} className="btn btn-primary">
            Add Equipment
          </Link>
        </div>
      </CardModal>
      <Outlet context={{ setEquipmentList }} />
    </>
  );
};

export default EquipmentModal;
