import { useEffect, useState } from "react";
import { processGpxData } from "@/lib";
import { findDayObjectByDate, readMultipleFiles } from "@/lib/utils";
import { updateRunCalendar } from "@/data";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

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
                        // Check if the day already has a run by at least checking the distance
                        if (runningData.weeks[week].days[day].distance > 0) {
                            const confirm = window.confirm(
                                `There is already a run on ${newRunningData.date.slice(
                                    0,
                                    10
                                )}. Do you want to overwrite it?`
                            );
                            if (!confirm) {
                                continue;
                            }
                        }
                        const updatedRunningData = { ...runningData };
                        updatedRunningData.weeks[week].days[day] =
                            newRunningData;
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
