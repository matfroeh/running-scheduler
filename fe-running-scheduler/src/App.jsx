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
} from "@/pages";
import RootLayout from "./layouts/RootLayout";
import { action as getFormData } from "./actions/getFormData";
import { calendarLoader } from "./loader/calendarLoader";
import { AuthContextProvider } from "@/context";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
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
          },
        ],
      },
      // {
      //   path: "/",
      //   element: <CalendarView />,
      //   loader: calendarLoader,
      //   errorElement: <Error />,
      //   action: getFormData,
      //   children: [
      //     {
      //       path: "new-schedule",
      //       element: <CreateTrainingBlockModal />,
      //     },
      //     {
      //       path: "equipment",
      //       element: <EquipmentModal />,
      //     },
      //   ],
      // },
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
