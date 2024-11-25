import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import {
  CalendarView,
  CreateScheduleModal,
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
  Profile,
  CalendarEditModal,
  Datenschutz,
} from "@/pages";
import { RootLayout, AuthLayout } from "@/layouts";
import { action as getFormData } from "./actions/getFormData";
import { overviewLoader } from "./loader/overviewLoader";
import { calendarIndexLoader } from "./loader/calendarIndexLoader";
import { AuthContextProvider } from "@/context";
import { CookieNote } from "@/components";

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
            // This is a workaround to prevent revalidation of the loader when the params change
            // with the upcoming revised data model this will be unnecessary
            // shouldRevalidate: ({ currentParams, nextParams }) => {
            // shouldRevalidate: () => {
            //   return false;
            // },
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
