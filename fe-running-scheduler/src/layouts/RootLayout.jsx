import NavBar from "../components/NavBar";
import { Outlet, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "@/context";

const RootLayout = () => {
  const { auth } = useAuth();

  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={1500}
        theme="colored"
      />
      <NavBar />
      {/* {auth ? <Outlet /> : <Navigate to="/login" />} */}
      {auth ? <Outlet /> : <Navigate to="/welcome" />}

    </>
  );
};

export default RootLayout;


// state={{ next: location.pathname }}
