import { useAuth } from "@/context";
import { Outlet, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const AuthLayout = () => {
  const { auth } = useAuth();

  // console.log("AuthLayout.jsx");

  return (
    <div className="container mx-auto">
      <ToastContainer
        position="bottom-right"
        autoClose={1500}
        theme="colored"
      />
      {auth ? <Outlet /> : <Navigate to="/login" />}
    </div>
  );
};

export default AuthLayout;
