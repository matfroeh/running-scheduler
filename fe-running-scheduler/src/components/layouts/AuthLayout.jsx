import { useAuth } from "@/context";
import { Outlet, Navigate } from "react-router-dom";

const AuthLayout = () => {
    const { auth } = useAuth();

    // console.log("AuthLayout.jsx");

    return <>{auth ? <Outlet /> : <Navigate to="../login" />}</>;
};

export default AuthLayout;

// if (auth) return <Navigate to={location.state?.next || "/auth"} />;
