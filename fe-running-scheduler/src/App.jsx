import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import CalendarView from "./pages/CalendarView";
import CreateTrainingBlockModal from "./pages/CreateTrainingBlockModal";
import RunDetailsModal from "./pages/RunDetailsModal";
import Error from "./pages/Error";
import NotFound from "./pages/NotFound";
import { action as getFormData } from "./actions/getFormData";
import { calendarLoader } from "./loader/calendarLoader";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <CalendarView />,
        errorElement: <Error />,
        action: getFormData,
        loader: calendarLoader,
        children: [
          {
            path: "new-schedule",
            element: <CreateTrainingBlockModal />,
          },
          {
            path: "runs/:runId",
            element: <RunDetailsModal />,
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
