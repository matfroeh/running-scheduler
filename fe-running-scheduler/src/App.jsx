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
    StartPageLayout,
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

const router = createBrowserRouter([
    {
        path: "/",
        element: <StartPageLayout />,
        errorElement: <ErrorPage />,
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
]);

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

// const router = createBrowserRouter(
//     createRoutesFromElements(
//         <>
//             <Route path="/" element={<Welcome />}>
//                 <Route
//                     path="login"
//                     element={<Login />}
//                     errorElement={<ErrorPage />}
//                 />
//                 <Route path="signup" element={<SignUp />} />
//             </Route>
//             <Route path="datenschutz" element={<Datenschutz />} />
//             <Route path="impressum" element={<Impressum />} />
//             <Route path="error" element={<ErrorPage />} />
//             <Route path="*" element={<NotFound />} />
//             <Route
//                 path="/auth"
//                 element={<AuthLayout />}
//                 errorElement={<ErrorPage />}
//             >
//                 <Route
//                     path="/auth"
//                     element={<RootLayout />}
//                     loader={calendarIndexLoader}
//                     // This is momentarily necessary, because the way of providing a loading feedback upon loading CalendarView and Overview will cause constant reloading of the data.
//                     shouldRevalidate={() => false}
//                     errorElement={<ErrorPage />}
//                 >
//                     <Route
//                         index
//                         element={<Navigate to="../calendar" replace />}
//                     />
//                     <Route
//                         path="calendar/:calendarId?"
//                         element={<CalendarView />}
//                         action={getFormData}
//                         errorElement={<ErrorPage />}
//                     >
//                         <Route
//                             path="runs/:week/:day/:runId"
//                             element={<RunDetailsModal />}
//                         />

//                         <Route
//                             path="schedule/:week/:day/:trainingDayId"
//                             element={<TrainingDayDetailsModal />}
//                         />

//                         <Route
//                             path="new-schedule"
//                             element={<CreateScheduleModal />}
//                         />

//                         <Route
//                             path="edit-schedule"
//                             element={<CalendarEditModal />}
//                         />
//                     </Route>

//                     <Route
//                         path="overview"
//                         element={<Overview />}
//                         errorElement={<ErrorPage />}
//                         loader={overviewLoader(queryClient)}
//                     />

//                     <Route
//                         path="equipment"
//                         element={<EquipmentModal />}
//                         errorElement={<ErrorPage />}
//                     >
//                         <Route
//                             path=":equipmentId"
//                             element={<EquipmentDetails />}
//                         />

//                         <Route path="new" element={<CreateEquipment />} />
//                     </Route>

//                     <Route
//                         path="profile"
//                         element={<Profile />}
//                         errorElement={<ErrorPage />}
//                     />
//                 </Route>
//             </Route>
//         </>
//     )
// );
