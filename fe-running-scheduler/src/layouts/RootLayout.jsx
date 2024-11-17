import NavBar from "../components/NavBar";
import { Outlet } from "react-router-dom";
import { useNavigation } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { Loading } from "@/components";

const RootLayout = () => {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";
  // console.log("RootLayout.jsx");

  if (isLoading) {
    console.log("RootLayout, state:", navigation.state);
  }

  // authLoader works in that way better than the AuthContextProvider as it is loaded before anything is rendered in the RootLayout
  // but we still need the Context form the Provider
  // also big con: upon logout we have no access to the loader to change the output to set auth false
  // const auth = useLoaderData();

  return (
    <>
      <NavBar />
      {/* {isLoading ? <Loading /> : <Outlet />} */}
      <Outlet />
    </>
  );
};

export default RootLayout;

// state={{ next: location.pathname }}
