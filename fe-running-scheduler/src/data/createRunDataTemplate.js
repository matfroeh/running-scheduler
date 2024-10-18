// Creates the template for the later insertion of the running data (uploaded gpx files)
// based on the TrainingBlockData
// By that, the process simplifies as follows:
// 1. from the gpx get the date
// 2. find the week and day that corresponds to the date (ToDo: we will later add error handling if the date is outside of the training block)
// 3. insert the extracted gpx data by simply accessing runData[week][date]
// the run data will be a react state (separate from the training block data) and will update accordingly

export const createRunDataTemplate = (trainingBlockData) => {
  let runDataTemplate = {
    meta: {
      //   blockId: trainingBlockData.blockId, // we will have this later when implementing the DB
      startDate: trainingBlockData.meta.startDate,
      title: trainingBlockData.meta.title,
    },
  };

  for (const week in trainingBlockData) {
    if (week !== "meta") {
      runDataTemplate[week] = {};
      for (const day in trainingBlockData[week]) {
        runDataTemplate[week][day] = {};
        runDataTemplate[week][day] = {
            date: trainingBlockData[week][day].date,
        }
      }
    }
  }
//   console.log("runDataTemplate", runDataTemplate);
return runDataTemplate;  
};
