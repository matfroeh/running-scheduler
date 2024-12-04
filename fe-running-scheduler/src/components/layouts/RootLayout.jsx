import { Outlet } from "react-router-dom";
import { useNavigate, useLocation, useNavigation } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { NavBar } from "@/components/NavBar";
import { Loading } from "@/components/generic";
import { Footer } from "@/components/Footer";
import { useGetCalendarOrder } from "@/lib/hooks";
import { ToastContainer } from "react-toastify";

const RootLayout = () => {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  const navigate = useNavigate();
  const location = useLocation();

  // Custom hook to get the current calendar index and the list of calendar ids
  // that will be used for cycling through the calendars
  const {
    calendarIndexList,
    currentIndex,
    calendarTitleList,
    handleAddCalendarToMetaDataList,
  } = useGetCalendarOrder();
  const currentCalendarId = calendarIndexList[currentIndex];

  // Serves as a re-direct to the calendar view displaying the current calendar
  // if no calendar is created yet, the url remains at /auth/calendar and the CalendarBody is empty showing only the CalendarBar for creating a new schedule
  location.pathname == "/auth/calendar" &&
    currentCalendarId &&
    navigate(`calendar/${currentCalendarId}`);

  return (
    <div className="container flex flex-col min-h-screen zoomable mx-auto min-w-[320px] max-w-[1300px]">
      <ToastContainer position="top-right" autoClose={3000} theme="colored" />
      <NavBar />
      {isLoading ? (
        <Loading />
      ) : (
        <Outlet
          context={{
            calendarIndexList,
            currentIndex,
            calendarTitleList,
            handleAddCalendarToMetaDataList,
          }}
        />
      )}
      {/* <Outlet context={{ calendarIndexList, currentIndex }} /> */}
      <Footer />
    </div>
  );
};

export default RootLayout;

// state={{ next: location.pathname }}
