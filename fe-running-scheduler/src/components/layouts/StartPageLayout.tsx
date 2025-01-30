import { ToastContainer } from "react-toastify";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { Outlet } from "react-router";

const StartPageLayout = () => {
    return (
        <div className="container flex flex-col min-h-screen zoomable mx-auto min-w-[320px] max-w-[1300px]">
            <ToastContainer
                position="top-right"
                autoClose={2000}
                theme="colored"
            />
            <NavBar />
            <Outlet />
            <Footer className={""} />
        </div>
    );
};

export default StartPageLayout;
