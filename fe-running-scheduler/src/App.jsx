import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import CalendarView from "./pages/CalendarView";
import CreateTrainingBlockModal from "./pages/CreateTrainingBlockModal";
import RunDetailsModal from "./pages/RunDetailsModal";
import TrainingDayDetailsModal from "./pages/TrainingDayDetailsModal";
import Error from "./pages/Error";
import NotFound from "./pages/NotFound";
import { action as getFormData } from "./actions/getFormData";
import { calendarLoader } from "./loader/calendarLoader";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import ProtectedLayout from "./layouts/ProtectedLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    loader: calendarLoader,
    errorElement: <Error />,
    children: [
      // {
      //   path: "/protected",
      //   element: <ProtectedLayout />,
      //   children: [
      {
        path: ":calendarId",
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
          },
          {
            path: "schedule/:week/:day/:trainingDayId",
            element: <TrainingDayDetailsModal />,
          },
        ],
      },
      //   ],
      // },
      {
        path: "/",
        element: <CalendarView />,
        errorElement: <Error />,
        action: getFormData,
        children: [
          // {
          //   path: "new-schedule",
          //   element: <CreateTrainingBlockModal />,
          // },
          {
            path: "login",
            element: <Login />,
          },
          {
            path: "signup",
            element: <SignUp />,
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
