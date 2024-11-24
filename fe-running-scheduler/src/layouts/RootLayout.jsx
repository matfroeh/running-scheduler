import NavBar from "@/components/NavBar/NavBar";
import { Outlet } from "react-router-dom";
import { useNavigation, useNavigate, useLocation } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { Loading, Footer } from "@/components";
import { useGetCalendarOrder } from "../lib/hooks/useGetCalendarOrder";

const RootLayout = () => {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";
  const navigate = useNavigate();
  const location = useLocation();

  const { calendarIndexList, currentIndex } = useGetCalendarOrder();
  // console.log("RootLayout calendars", calendarIndexList);
  // console.log("RootLayout currentIndex", currentIndex);
  
  // console.log("RootLayout calendars", calendarIndexList[currentIndex]);

  const currentCalendarId = calendarIndexList[currentIndex];
// console.log(location.pathname);

  location.pathname == "/auth/calendar" && currentCalendarId && navigate(`calendar/${currentCalendarId}`);

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      {isLoading ? <Loading /> : <Outlet context={{calendarIndexList}} />}
      {/* <Outlet /> */}
      <Footer />
    </div>
  );
};

export default RootLayout;

// state={{ next: location.pathname }}
