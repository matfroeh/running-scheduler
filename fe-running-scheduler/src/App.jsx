import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import CalenderView from "./pages/CalenderView";
import CreateTrainingBlockModal from "./pages/CreateTrainingBlockModal";
import { action as getFormData } from "./actions/getFormData";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <CalenderView />,
        action: getFormData,
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
