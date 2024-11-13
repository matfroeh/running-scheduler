import NavBar from "../components/NavBar";
import { Outlet, Navigate } from "react-router-dom";
// import { useNavigation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "@/context";
// import { Loading } from "@/components";

const RootLayout = () => {
  const { auth } = useAuth();
  // const navigation = useNavigation();
  // const isLoading = navigation.state === "loading";

  // authLoader works in that way better than the AuthContextProvider as it is loaded before anything is rendered in the RootLayout
  // but we still need the Context form the Provider
  // also big con: upon logout we have no access to the loader to change the output to set auth false
  // const auth = useLoaderData();

  return (
    <div className="container mx-auto">
      <ToastContainer
        position="bottom-right"
        autoClose={1500}
        theme="colored"
      />
      <NavBar />
      {/* {auth && isLoading && <Loading />} */}
      {auth ? <Outlet /> : <Navigate to="/welcome" />}
    </div>
  );
};

export default RootLayout;

// state={{ next: location.pathname }}
