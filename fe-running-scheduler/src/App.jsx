import { createBrowserRouter, Navigate } from "react-router";
import { RouterProvider } from "react-router/dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
    Welcome,
    Login,
    SignUp,
    NotFound,
    ErrorPage,
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

// For handling data fetching
const queryClient = new QueryClient();

const router = createBrowserRouter(
    [
        {
            path: "/",
            element: <Welcome />,
            errorElement: <ErrorPage />,
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
            errorElement: <ErrorPage />,
            children: [
                {
                    path: "/auth",
                    element: <RootLayout />,
                    loader: calendarIndexLoader,
                    // This is momentarily necessary, because the way of providing a loading feedback upon loading CalendarView and Overview will cause constant reloading of the data.
                    shouldRevalidate: () => {
                        return false;
                    },
                    errorElement: <ErrorPage />,
                    children: [
                        {
                            index: true,
                            element: <Navigate to={"calendar"} replace />,
                        },
                        {
                            path: "calendar/:calendarId?",
                            element: <CalendarView />,
                            action: getFormData,
                            errorElement: <ErrorPage />,
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
                            loader: overviewLoader(queryClient),
                            errorElement: <ErrorPage />,
                        },
                        {
                            path: "equipment",
                            element: <EquipmentModal />,
                            errorElement: <ErrorPage />,
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
                            errorElement: <ErrorPage />,
                        },
                    ],
                },
            ],
        },
        {
            path: "datenschutz",
            element: <Datenschutz />,
            errorElement: <ErrorPage />,
        },
        {
            path: "impressum",
            element: <Impressum />,
            errorElement: <ErrorPage />,
        },
    ],
    {
        future: {
            v7_relativeSplatPath: true,
            v7_normalizeFormMethod: true,
            v7_skipActionErrorRevalidation: true,
            v7_startTransition: true,
            v7_fetcherPersist: true,
            v7_partialHydration: true,
        },
    }
);

function App() {
    return (
        <>
            <CookieNote />
            <AuthContextProvider>
                <QueryClientProvider client={queryClient}>
                    <RouterProvider router={router} />
                </QueryClientProvider>
            </AuthContextProvider>
        </>
    );
}

export default App;
