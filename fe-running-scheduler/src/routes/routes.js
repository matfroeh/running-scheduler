// import {
//     Welcome,
//     Login,
//     SignUp,
//     NotFound,
//     ErrorPage,
//     Datenschutz,
//     Impressum,
//     CookieNote,
//     RootLayout,
//     AuthLayout,
//     StartPageLayout,
//     Profile,
//     Overview,
//     CalendarView,
//     CalendarEditModal,
//     CreateScheduleModal,
//     RunDetailsModal,
//     TrainingDayDetailsModal,
//     EquipmentModal,
//     EquipmentDetails,
//     CreateEquipment,
// } from "@/components/pages";
// import { action as getFormData } from "@/actions";
// import { calendarIndexLoader, overviewLoader } from "@/loader";
// import { AuthContextProvider } from "@/context";
// import { createBrowserRouter } from "react-router";

import StartPageLayout from "@/components/layouts/StartPageLayout";
import Welcome from "@/components/Welcome";
import Login from "@/components/Welcome/Login";
import SignUp from "@/components/Welcome/SignUp";

// not working as intended
const startPageRoutes = [
    {
        path: "/",
        element: <StartPageLayout />,
        // errorElement: <ErrorPage />,
        children: [
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
        ],
    },
];

export default startPageRoutes;
