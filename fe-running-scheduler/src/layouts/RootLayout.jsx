import NavBar from "../components/NavBar";
import { Outlet } from "react-router-dom";
import { useNavigation } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { Loading } from "@/components";

const RootLayout = () => {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";
  // console.log("RootLayout.jsx");

  // console.log("RootLayout, state:", navigation.state);

  return (
    <>
      <NavBar />
      {isLoading ? <Loading /> : <Outlet />}
    </>
  );
};

export default RootLayout;

// state={{ next: location.pathname }}
