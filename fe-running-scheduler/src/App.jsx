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
  Profile,
  CalendarEditModal,
} from "@/pages";
import RootLayout from "./layouts/RootLayout";
import { action as getFormData } from "./actions/getFormData";
// import { authLoader } from "./loader/authLoader";
import { calendarLoader } from "./loader/calendarLoader";
import { overviewLoader } from "./loader/overviewLoader";
import { AuthContextProvider } from "@/context";
import CookieConsent from "react-cookie-consent";

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
            path: "edit-schedule",
            element: <CalendarEditModal />,
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
      {
        path: "overview",
        element: <Overview />,
        loader: overviewLoader,
        children: [
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
    <>
      <CookieConsent debug={false} location="top" expires={3}>
        <div className="">
          This website uses functional cookies to enhance the user experience.
          Particularly, due to the developmental character of this project, an
          authentication cookie is classified as a third party cookie, as right
          now the backend server shares not the same domain as the deployed
          frontend side. If you are using third party cookie blocking tools, you
          will not be able to log in. This will be fixed soon. Thank you for your
          understanding.
        </div>
      </CookieConsent>
      <AuthContextProvider>
        <RouterProvider router={router} />
      </AuthContextProvider>
    </>
  );
}

export default App;
