import { Outlet, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "@/context";

const RootRootLayout = () => {

  const { auth } = useAuth();

  return (
    <>
      <div className="">
        <ToastContainer
          position="bottom-right"
          autoClose={1500}
          theme="colored"
        />
        {/* {auth ? <Outlet /> : <Navigate to="/login" />} */}
        {auth ? <Outlet /> : <Navigate to="/welcome" />}
      </div>
    </>
  );
};

export default RootRootLayout