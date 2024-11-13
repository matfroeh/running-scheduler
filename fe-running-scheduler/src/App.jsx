import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  // CalendarView,
  CreateTrainingBlockModal,
  RunDetailsModal,
  TrainingDayDetailsModal,
  EquipmentModal,
  Error,
  NotFound,
  Login,
  SignUp,
  Welcome,
  // Overview,
  EquipmentDetails,
  CreateEquipment,
  Profile,
  CalendarEditModal,
} from "@/pages";
import { Loading } from "@/components";
// import RootLayout from "./layouts/RootLayout";
import { action as getFormData } from "./actions/getFormData";
import { calendarLoader } from "./loader/calendarLoader";
import { overviewLoader } from "./loader/overviewLoader";
import { AuthContextProvider } from "@/context";
import CookieConsent from "react-cookie-consent";
import { lazy, Suspense } from "react";

// Lazy loading the RootLayout
const RootLayout = lazy(() => import("./layouts/RootLayout"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    // async lazy() {
    // let { RootLayout } = await import("./layouts/RootLayout");
    // return { Component: RootLayout };
    // },
    children: [
      {
        path: ":calendarId?",
        async lazy() {
          let { CalendarView } = await import("@/pages");
          return {
            loader: calendarLoader,
            Component: CalendarView,
            errorElement: <Error />,
            action: getFormData,
          };
        },
        // element: <CalendarView />,

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
        async lazy() {
          let { Overview } = await import("@/pages");
          return {
            Component: Overview,
            loader: overviewLoader,
          };
        },
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
          Particularly, an authentication cookie is set to keep you logged in.
        </div>
      </CookieConsent>
      <AuthContextProvider>
        {/* <RouterProvider router={router} fallbackElement={<Loading />}  /> */}
        <Suspense fallback={<Loading />}>
          <RouterProvider router={router} />
        </Suspense>
      </AuthContextProvider>
    </>
  );
}

export default App;
