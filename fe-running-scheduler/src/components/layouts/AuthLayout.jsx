import { useAuth } from "@/context";
import { Outlet, Navigate } from "react-router";

const AuthLayout = () => {
    // console.log("AuthLayout.jsx");
    const { auth } = useAuth();

    return <>{auth ? <Outlet /> : <Navigate to="../login" />}</>;
};

export default AuthLayout;

// if (auth) return <Navigate to={location.state?.next || "/auth"} />;
