import { useEffect } from "react";
import { useActionData, useNavigate } from "react-router-dom";
import { processFormDataFromScheduler } from "@/logic/processFormDataFromScheduler";
import { createTrainingSchedule } from "@/data/schedules";
import { createRun } from "@/data/runs";
import { toast } from "react-toastify";

export const useSaveNewSchedule = (handleSetSchedule, handleSetRuns) => {
  // Form data from CreateTrainingBlock.jsx
  let createScheduleData = useActionData();

  const navigate = useNavigate();

  useEffect(() => {
    if (createScheduleData) {
      const { newSchedule, newRuns } =
        processFormDataFromScheduler(createScheduleData);

      const saveNewSchedule = async () => {
        try {
          const schedule = await createTrainingSchedule(newSchedule);
          const runs = await createRun(newRuns, schedule._id);

          handleSetSchedule(schedule);
          handleSetRuns(runs);
          toast.success("Schedule saved successfully!");
        } catch (error) {
          toast.error(`Error saving schedule: ${error.message}`);
        }
      };
      saveNewSchedule();
      localStorage.removeItem("currentCalendarIndex");

      navigate("/");
    }
    return () => {
      createScheduleData = null;
    };
  }, [createScheduleData]);
};
