import { useEffect, useState } from "react";
import processGpxData from "@/logic/processGpxData.js";
import { findDayObjectByDate } from "@/utils/processRunningDataHelper.js";
import { updateRunCalendar } from "@/data/runs.js";
import { readMultipleFiles } from "@/lib/fileHandling.js";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const useProcessGpxData = (runningData, setRunningData) => {
  const [fileContents, setFileContents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  // This function reads the content of multiple files and sets them to the state
  const handleGpxFileChange = (event) => {
    const readers = readMultipleFiles(event);

    // Wait until all files are read and set the results to fileContents
    Promise.all(readers).then((contents) => setFileContents(contents));
  };

  // Process each file's content once it is updated
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const processData = async () => {
      setIsLoading(true);
      for (const content of fileContents) {
        try {
          const newRunningData = processGpxData(content);
          // check if the date is within the current calendar
          const [week, day] = findDayObjectByDate(
            newRunningData.date,
            runningData
          );

          if (week && day) {
            const updatedRunningData = { ...runningData };
            updatedRunningData.weeks[week].days[day] = newRunningData;
            const response = await updateRunCalendar(
              updatedRunningData,
              runningData._id,
              signal
            );
            // console.log(response);
            if (response) {
              setRunningData(updatedRunningData);
              toast.success(
                `New run from ${newRunningData.date.slice(
                  0,
                  10
                )} added successfully`
              );
              // Single uploaded file: directly go to run details modal
              if (fileContents.length === 1) {
                navigate(`runs/${week}/${day}/new`);
              }
            }
          } else {
            toast.error(
              `${newRunningData.date.slice(
                0,
                10
              )} is outside of the current calendar`
            );
          }
        } catch (error) {
          toast.error(`Error adding run: ${error.message}`);
          console.error(error);
        }
      }
      setIsLoading(false);
      setFileContents([]);
    };

    if (fileContents.length > 0) {
      processData();
    }

    return () => {
      controller.abort();
    };
  }, [fileContents]);

  return {
    handleGpxFileChange,
    isLoading,
  };
};