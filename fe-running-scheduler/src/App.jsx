import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import {
  Welcome,
  Login,
  SignUp,
  NotFound,
  Error,
  Datenschutz,
  Impressum,
  CookieNote,
  RootLayout,
  AuthLayout,
  Profile,
  Overview,
  CalendarView,
  CalendarEditModal,
  CreateScheduleModal,
  RunDetailsModal,
  TrainingDayDetailsModal,
  EquipmentModal,
  EquipmentDetails,
  CreateEquipment,
} from "@/components/pages";

import { action as getFormData } from "@/actions";
import { calendarIndexLoader, overviewLoader } from "@/loader";
import { AuthContextProvider } from "@/context";

const router = createBrowserRouter([
  {
    path: "/",
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
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "/auth",
        element: <RootLayout />,
        loader: calendarIndexLoader,
        // This is momentarily necessary, because the way of providing a loading feedback upon loading CalendarView and Overview will cause constant reloading of the data.
        shouldRevalidate: () => {
          return false;
        },
        children: [
          {
            index: true,
            element: <Navigate to={"calendar"} replace />,
          },
          {
            path: "calendar/:calendarId?",
            element: <CalendarView />,
            action: getFormData,
            errorElement: <Error />,
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
                element: <CreateScheduleModal />,
              },
              {
                path: "edit-schedule",
                element: <CalendarEditModal />,
              },
            ],
          },
          {
            path: "overview",
            element: <Overview />,
            loader: overviewLoader,
            errorElement: <Error />,
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
              },
            ],
          },
          {
            path: "profile",
            element: <Profile />,
          },
        ],
      },
    ],
  },
  {
    path: "datenschutz",
    element: <Datenschutz />,
  },
  {
    path: "impressum",
    element: <Impressum />,
  },
]);

function App() {
  return (
    <>
      <CookieNote />
      <AuthContextProvider>
        <RouterProvider router={router} />
      </AuthContextProvider>
    </>
  );
}

export default App;