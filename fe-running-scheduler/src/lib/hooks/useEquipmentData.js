import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getEquipmentListFromUser, getImageByIdFromApi } from "@/data";
import { useAuth } from "@/context";
import { ACTIVE, INACTIVE } from "@/lib/constants";

export const useEquipmentData = () => {
    const { user, setUser } = useAuth();

    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const {
        data: equipmentList,
        isLoading: equipmentListLoading,
        error: equipmentListError,
    } = useQuery({
        queryKey: ["equipmentList", user.userId],
        queryFn: async () => {
            const list = await getEquipmentListFromUser(user.userId);
            return sortedEquipmentList(list);
        },
        onSuccess: (list) => {
            setUser((prev) => ({ ...prev, equipmentList: list }));
        },
        enabled: !!user.userId,
    });

    const {
        data: images,
        isLoading: imagesLoading,
        error: imagesError,
    } = useQuery({
        queryKey: ["images", equipmentList],
        queryFn: async () => {
            const newImages = {};
            await Promise.allSettled(
                equipmentList.map(async (equipment) => {
                    if (equipment.image) {
                        const data = await getImageByIdFromApi(equipment.image);
                        newImages[equipment._id] = data;
                    }
                })
            );
            return newImages;
        },
        enabled: equipmentList?.length > 0,
    });

    const loading = equipmentListLoading || imagesLoading;
    const errors = equipmentListError || imagesError;

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

    const handleSetEquipmentList = useCallback(
        (newList) => {
            queryClient.setQueryData(["equipmentList", user.userId], newList);
        },
        [queryClient, user.userId]
    );

    const openEquipmentDetails = (equipmentId) => navigate(`${equipmentId}`);

    return {
        equipmentList,
        handleSetEquipmentList,
        images,
        loading,
        errors,
        openEquipmentDetails,
    };
};
