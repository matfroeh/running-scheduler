import { Navigate, Outlet } from "react-router-dom";
// import { useLocation } from "react-router-dom";
import { useAuth } from "@/context";

const ProtectedLayout = () => {
  // const location = useLocation();
  const { auth } = useAuth();
  console.log(auth);

  return (
    <>
      {auth ? (
        <Outlet />
      ) : (
        <Navigate
          to="/login"
          // state={{ next: location.pathname }}
        />
      )}
    </>
  );
};

export default ProtectedLayout;
