import NavBar from "@/components/NavBar/NavBar";
import { Outlet } from "react-router-dom";
import { useNavigate, useLocation, useNavigation } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { Loading, Footer } from "@/components";
import { useGetCalendarOrder } from "../lib/hooks/useGetCalendarOrder";
import { ToastContainer } from "react-toastify";

const RootLayout = () => {
  // console.log("RootLayout");
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";
  // console.log(navigation.state);

  const navigate = useNavigate();
  const location = useLocation();

  // Custom hook to get the current calendar index and the list of calendar ids
  // that will be used for cycling through the calendars
  const { calendarIndexList, currentIndex } = useGetCalendarOrder();
  const currentCalendarId = calendarIndexList[currentIndex];

  // Serves as a re-direct to the calendar view displaying the current calendar
  // if no calendar is created yet, the url remains at /auth/calendar and the CalendarBody is empty showing only the CalendarBar for creating a new schedule
  location.pathname == "/auth/calendar" &&
    currentCalendarId &&
    navigate(`calendar/${currentCalendarId}`);

  return (
    <div className="container flex flex-col min-h-screen zoomable mx-auto min-w-[680px] max-w-[1400px]">
      <ToastContainer
        position="bottom-right"
        autoClose={2500}
        theme="colored"
      />
      <NavBar />
      {isLoading ? (
        <Loading />
      ) : (
        <Outlet context={{ calendarIndexList, currentIndex }} />
      )}
      {/* <Outlet context={{ calendarIndexList, currentIndex }} /> */}
      <Footer />
    </div>
  );
};

export default RootLayout;

// state={{ next: location.pathname }}
