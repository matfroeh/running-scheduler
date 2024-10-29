import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  CalendarView,
  CreateTrainingBlockModal,
  RunDetailsModal,
  TrainingDayDetailsModal,
  EquipmentModal,
  Error,
  NotFound,
  Login,
  SignUp,
  Welcome,
  Overview,
  EquipmentDetails,
  CreateEquipment,
} from "@/pages";
import RootLayout from "./layouts/RootLayout";
import { action as getFormData } from "./actions/getFormData";
// import { authLoader } from "./loader/authLoader";
import { calendarLoader } from "./loader/calendarLoader";
import { overviewLoader } from "./loader/overviewLoader";
import { AuthContextProvider } from "@/context";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    // loader: authLoader,
    children: [
      {
        path: ":calendarId?",
        element: <CalendarView />,
        loader: calendarLoader,
        errorElement: <Error />,
        action: getFormData,
        children: [
          {
            path: "runs/:week/:day/:runId",
            element: <RunDetailsModal />,
          },
          {
            path: "schedule/:week/:day/:trainingDayId",
            element: <TrainingDayDetailsModal />,
          },
          {
            path: "new-schedule",
            element: <CreateTrainingBlockModal />,
          },
          {
            path: "equipment",
            element: <EquipmentModal />,
            children: [
              {
                path: ":equipmentId",
                element: <EquipmentDetails />,
              },
              {
                path: "new",
                element: <CreateEquipment />,
              }
            ],
          },
        ],
      },
      {
        path: "overview",
        element: <Overview />,
        loader: overviewLoader,
      },
    ],
  },
  {
    path: "welcome",
    element: <Welcome />,
    children: [
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
]);

function App() {
  return (
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
  );
}

export default App;
