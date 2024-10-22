import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import CalendarView from "./pages/CalendarView";
import CreateTrainingBlockModal from "./pages/CreateTrainingBlockModal";
import RunDetailsModal from "./pages/RunDetailsModal";
import Error from "./pages/Error";
import NotFound from "./pages/NotFound";
import { action as getFormData } from "./actions/getFormData";
import { calendarLoader } from "./loader/calendarLoader";
import { getRunByParams } from "./data/runs";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    loader: calendarLoader,
    errorElement: <Error />,
    children: [
      {
        path: "/:calendarId",
        element: <CalendarView />,
        errorElement: <Error />,
        action: getFormData,
        children: [
          {
            path: "new-schedule",
            element: <CreateTrainingBlockModal />,
          },
          {
            path: "runs/:week/:day/:runId",
            element: <RunDetailsModal />,
            // loader: async ({ params }) => {
            //   const { week, day, runId } = params;
            //   const data = await getRunByParams(week, day, runId);
            //   console.log(data);

            //   return data ? { data } : { error: "Run not found" };
            // },
          },

        ],
      },
      {
        path: "/",
        element: <CalendarView />,
        errorElement: <Error />,
        action: getFormData,
        children: [
          {
            path: "new-schedule",
            element: <CreateTrainingBlockModal />,
          },
        ],
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
