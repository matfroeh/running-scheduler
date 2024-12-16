import { useEffect } from "react";
import { useActionData, useNavigate } from "react-router-dom";
import { processFormDataFromScheduler } from "@/lib";
import { createTrainingSchedule, createRun } from "@/data";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useSaveNewSchedule = (
    handleSetSchedule,
    handleSetRuns,
    handleAddCalendarToMetaDataList
) => {
    // Form data from CreateTrainingBlock.jsx
    let createScheduleData = useActionData();
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const saveNewSchedule = async () => {
        const { newSchedule, newRuns } =
            processFormDataFromScheduler(createScheduleData);
        // console.log("processedFormData:", newSchedule, newRuns);
        if (newSchedule && newRuns) {
            const schedule = await createTrainingSchedule(newSchedule);
            const runs = await createRun(newRuns, schedule._id);
            // console.log("createdData:", schedule, runs);
            handleSetRuns(runs);
            handleSetSchedule(schedule);
            const newCalendarMetaData = {
                _id: schedule._id,
                meta: schedule.meta,
            };
            handleAddCalendarToMetaDataList(newCalendarMetaData);
        } else throw new Error("Error processing form data");
    };

    const createNewCalendarMutation = useMutation({
        mutationFn: saveNewSchedule,
        onSuccess: () => {
            // queryClient.invalidateQueries(["trainingSchedule"]);
            // queryClient.invalidateQueries(["runs"]);
            queryClient.removeQueries(["trainingSchedule"]);
            queryClient.removeQueries(["runs"]);
            toast.success("Schedule saved successfully!");
            // Not very elegant, but we need to navigate to the root to refresh the calendar order
            navigate("../");
        },
        onError: (error) => {
            toast.error(`Error saving schedule: ${error.message}`);
        },
    });

    useEffect(() => {
        if (createScheduleData) {
            createNewCalendarMutation.mutate();
            // ToDo: useQuery for CalendarOrder; right now we need to navigate to the root to refresh the calendar order
            // and to set the url to the new calendar
            navigate("../");
        }
        // return () => {
        //   createScheduleData = null;
        // };
    }, [createScheduleData]);
};
