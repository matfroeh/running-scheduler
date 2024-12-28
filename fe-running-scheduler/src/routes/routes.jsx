import {
    Welcome,
    Login,
    SignUp,
    NotFound,
    ErrorPage,
    Datenschutz,
    Impressum,
    StartPageLayout,
} from "@/components/pages";

export const startPageRoutes = [
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
];

export const auxPagesRoutes = [
    {
        path: "*",
        element: <NotFound />,
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
];
