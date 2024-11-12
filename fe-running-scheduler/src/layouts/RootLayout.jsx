import NavBar from "../components/NavBar";
import { Outlet, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "@/context";
import { Suspense, lazy } from "react";
import { Loading } from "@/components";
// const NavBar = lazy(() => import("../components/NavBar"));
// const Outlet = lazy(() => import("react-router-dom").then((mod) => ({ Outlet: mod.Outlet })));

const RootLayout = () => {
  const { auth } = useAuth();

  // authLoader works in that way better than the AuthContextProvider as it is loaded before anything is rendered in the RootLayout
  // but we still need the Context form the Provider
  // also big con: upon logout we have no access to the loader to change the output to set auth false
  // const auth = useLoaderData();

  return (
    <>
      {/* <Suspense fallback={<Loading />}> */}
      <div className="container mx-auto">
        <ToastContainer
          position="bottom-right"
          autoClose={1500}
          theme="colored"
        />
        {/* <Suspense><NavBar /></Suspense> */}
        <NavBar />

        {auth ? <Outlet /> : <Navigate to="/welcome" />}
      </div>
      {/* </Suspense> */}
    </>
  );
};

export default RootLayout;

// state={{ next: location.pathname }}
