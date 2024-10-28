import NavBar from "../components/NavBar";
import { Outlet, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "@/context";

const RootLayout = () => {
  const { auth } = useAuth();
  
  // authLoader works in that way better than the AuthContextProvider as it is loaded before anything is rendered in the RootLayout
  // but we still need the Context form the Provider
  // also big con: upon logout we have no access to the loader to change the output to set auth false
  // const auth = useLoaderData();

  return (
    <>
      <div className="">
        <ToastContainer
          position="bottom-right"
          autoClose={1500}
          theme="colored"
        />
        <NavBar />
        {auth ? <Outlet /> : <Navigate to="/welcome" />}
      </div>
    </>
  );
};

export default RootLayout;

// state={{ next: location.pathname }}
