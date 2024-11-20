import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
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
  Profile,
  CalendarEditModal,
  Datenschutz
} from "@/pages";
import { RootLayout, AuthLayout } from "@/layouts";
import { action as getFormData } from "./actions/getFormData";
import { calendarLoader } from "./loader/calendarLoader";
import { overviewLoader } from "./loader/overviewLoader";
import { AuthContextProvider } from "@/context";
// import { ModalContextProvider } from "./context";
import CookieConsent from "react-cookie-consent";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Welcome />,
    children: [
      {
        path: "/login",
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
    path: "auth",
    element: <AuthLayout />,
    children: [
      {
        path: "/auth",
        element: <RootLayout />,
        children: [
          {
            index: true,
            element: <Navigate to="/auth/calendar" replace />,
          },
          {
            path: "calendar/:calendarId?",
            // path: "calendar",
            element: <CalendarView />,
            loader: calendarLoader,
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
                element: <CreateTrainingBlockModal />,
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
  }
]);

function App() {
  return (
    <>
      <CookieConsent
        debug={false}
        location="top"
        buttonText="Allow functional cookies."
        expires={7}
      >
        <div className="">
          This website uses functional cookies to enhance the user experience.
          Particularly, an authentication cookie will be set to verify your
          credentials and keep you logged in.
        </div>
      </CookieConsent>
      <AuthContextProvider>
        <RouterProvider router={router} />
      </AuthContextProvider>
    </>
  );
}

export default App;
