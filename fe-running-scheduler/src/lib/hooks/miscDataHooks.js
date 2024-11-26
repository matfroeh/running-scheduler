import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getImageByIdFromApi } from "@/data/image.js";
// import { updateRunCalendar } from "@/data/runs.js"; // Adjust the import path as necessary
// import processGpxData from "@/logic/processGpxData.js";
// import { findDayObjectByDate } from "@/utils/processRunningDataHelper.js";


export function useFetchUserProfile(user) {
  const [image, setImage] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    if (!user?.profilePicture) {
      // check for profile picture
      return;
    }
    const fetchImage = async () => {
      setLoading(true);
      try {
        const data = await getImageByIdFromApi(user.profilePicture, signal);
        setImage(data);
        // ToDo: Check if this is the correct way to handle this
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchImage();

    return () => {
      controller.abort();
    };
  }, [user]);

  return { image, loading };
}

export function useCurrentPath() {
  const location = useLocation();
  const currentPath = location.pathname;
  return { currentPath };
}

// export function useProcessGpxData(
//   runningData,
//   setRunningData,
//   fileContents,
//   setFileContents,
//   setIsLoading,
//   toast,
//   navigate
// ) {
//   // Process each file's content once it is updated
//   useEffect(() => {
//     const controller = new AbortController();
//     const signal = controller.signal;

//     const processData = async () => {
//       setIsLoading(true);
//       for (const content of fileContents) {
//         try {
//           const newRunningData = processGpxData(content);
//           // check if the date is within the current calendar
//           const [week, day] = findDayObjectByDate(
//             newRunningData.date,
//             runningData
//           );

//           if (week && day) {
//             const updatedRunningData = { ...runningData };
//             updatedRunningData.weeks[week].days[day] = newRunningData;
//             const response = await updateRunCalendar(
//               updatedRunningData,
//               runningData._id,
//               signal
//             );
//             // console.log(response);
//             if (response) {
//               setRunningData(updatedRunningData);
//               toast.success("New run(s) added successfully");
//               // Single uploaded file: directly go to run details modal
//               if (fileContents.length === 1) {
//                 navigate(`runs/${week}/${day}/new`);
//               }
//             }
//           } else {
//             toast.error(
//               `${newRunningData.date.slice(
//                 0,
//                 10
//               )} is outside of the current calendar`
//             );
//           }
//         } catch (error) {
//           toast.error(`Error adding run: ${error.message}`);
//           console.error(error);
//         }
//       }
//       setIsLoading(false);
//       setFileContents([]);
//     };

//     if (fileContents.length > 0) {
//       processData();
//     }

//     return () => {
//       controller.abort();
//     };
//   }, [fileContents]);
// }
