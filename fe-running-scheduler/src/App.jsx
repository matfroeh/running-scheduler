import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import CalendarView from "./pages/CalendarView";
import CreateTrainingBlockModal from "./pages/CreateTrainingBlockModal";
import { action as getFormData } from "./actions/getFormData";
import { calendarLoader } from "./loader/calendarLoader";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <CalendarView />,
        action: getFormData,
        loader: calendarLoader,
        children: [
          {
            path: "new-schedule",
            element: <CreateTrainingBlockModal />,
          },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
