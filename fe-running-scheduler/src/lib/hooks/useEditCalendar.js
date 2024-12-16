// custom hook to edit calendar title and delete calendar
import { useState } from "react";
import {
    updateRunCalendar,
    deleteRunCalendar,
    updateTrainingSchedule,
    deleteTrainingSchedule,
} from "@/data";
import { useOutletContext, useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useEditCalendar = () => {
    const navigate = useNavigate();
    const { schedule, runs, handleSetSchedule, handleSetRuns } =
        useOutletContext();
    const [title, setTitle] = useState(schedule?.meta?.title);
    const calendarId = schedule?._id;

    const queryClient = useQueryClient();

    const handleChange = (e) => {
        setTitle(e.target.value);
    };

    const updateCalendarTitle = async () => {
        if (!title) {
            toast.error("Title cannot be empty!");
            return;
        }
        try {
            const updatedTrainingSchedule = {
                ...schedule,
                meta: { ...schedule.meta, title },
            };
            const updatedRunningLog = {
                ...runs,
                meta: { ...runs.meta, title },
            };
            await updateTrainingSchedule(updatedTrainingSchedule, calendarId);
            await updateRunCalendar(updatedRunningLog, calendarId);

            handleSetSchedule(updatedTrainingSchedule);
            handleSetRuns(updatedRunningLog);

            toast.success("Title updated successfully!");
            navigate(-1);
        } catch (error) {
            toast.error(`Error editing title: ${error.message}`);
        }
    };

    const deleteCalendar = async () => {
        const confirmDelete = window.confirm(
            `Are you sure you want to delete the Calendar ${title}?`
        );
        if (!confirmDelete) return;
        else {
            const confirmDelete = window.confirm(
                `Please confirm that you want to delete the complete Calendar ${title} including the running and schedule data contained therein. This action cannot be undone.`
            );
            if (!confirmDelete) return;
        }
        try {
            await deleteTrainingSchedule(calendarId);
            await deleteRunCalendar(calendarId);
            handleSetRuns(null);
            handleSetSchedule(null);
            toast.success("Calendar deleted successfully!");
            // navigate("/");
        } catch (error) {
            toast.error(`Error deleting calendar: ${error.message}`);
        }
    };

    const updateCalendarTitleMutation = useMutation({
        mutationFn: updateCalendarTitle,
        onError: (error) => {
            toast.error(`Error updating title: ${error.message}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["trainingSchedule", calendarId]);
            queryClient.invalidateQueries(["runs", calendarId]);
        },
    });

    const deleteCalendarMutation = useMutation({
        mutationFn: deleteCalendar,
        onError: (error) => {
            toast.error(`Error deleting calendar: ${error.message}`);
        },
        onSuccess: async () => {
            // invalidateQueries is not working to update the cache as useQuery will only be called when there is a valid calendarId
            queryClient.removeQueries(["trainingSchedule", calendarId]);
            queryClient.removeQueries(["runs", calendarId]);

            // navigate to root as url needs to be updated, else it would remain on the deleted calendarId
            navigate("../");
        },
    });

    return {
        handleChange,
        updateCalendarTitleMutation,
        deleteCalendarMutation,
        title,
    };
};
