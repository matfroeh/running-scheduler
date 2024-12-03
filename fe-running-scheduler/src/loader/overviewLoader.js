import { getAllRuns } from "@/data";

export const overviewLoader = (queryClient) => async () => {
const query = getAllRunsQuery();
return queryClient.getQueryData(query.queryKey) ?? (await queryClient.fetchQuery(query));
};

export const getAllRunsQuery = () => ({
  queryKey: ["runs"],
  queryFn: async () => {
    const loadedRuns = getAllRuns()
    return loadedRuns;
  },
});


// without react-query:
// export const overviewLoader = async () => {
//   try {
//     const loadedRuns = await getAllRuns();

//     return {
//       loadedRuns,
//     };
//   } catch (error) {
//     console.error(error);
//     return {
//       loadedRuns: {},
//     };
//   }
// };
