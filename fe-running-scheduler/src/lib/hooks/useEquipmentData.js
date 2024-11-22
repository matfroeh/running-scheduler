import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getEquipmentListFromUser } from "@/data/user";
import { getImageByIdFromApi } from "@/data/image";
import { useAuth } from "@/context";
import { ACTIVE, INACTIVE } from "@/lib/logicConstants";

export const useEquipmentData = () => {
  const { user, setUser } = useAuth();
  const [equipmentList, setEquipmentList] = useState([]);
  const [images, setImages] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEquipmentList = async () => {
      const list = await getEquipmentListFromUser(user.userId);
      setUser((prev) => ({ ...prev, equipmentList: list }));
      setEquipmentList(sortedEquipmentList(list));
      setLoading(false);
    };

    fetchEquipmentList();
  }, []);

  useEffect(() => {
    const fetchImages = async () => {
      const newImages = {};
      await Promise.all(
        equipmentList.map(async (equipment) => {
          if (equipment.image) {
            const data = await getImageByIdFromApi(equipment.image);
            newImages[equipment._id] = data;
          }
        })
      );
      setImages(newImages);
    };

    if (equipmentList.length) fetchImages();
  }, [equipmentList]);

  const sortedEquipmentList = (equipmentList) => {
    let sortedList = [];
    for (let i = 0; i < equipmentList.length; i++) {
      if (equipmentList[i].status === ACTIVE) {
        sortedList.unshift(equipmentList[i]);
      }
      if (equipmentList[i].status === INACTIVE) {
        sortedList.push(equipmentList[i]);
      }
    }
    return sortedList;
  };

  const openEquipmentDetails = (equipmentId) => navigate(`${equipmentId}`);

  return {
    equipmentList,
    setEquipmentList,
    images,
    loading,
    openEquipmentDetails,
  };
};
