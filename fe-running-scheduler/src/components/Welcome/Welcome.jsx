import { Link, Outlet, Navigate } from "react-router";
import { StartupDelay, CarouselComponent } from "@/components/Welcome";
import { useAuth } from "@/context";
import { bodyGradient } from "@/components/misc/tailwind-classes";
const WelcomePage = () => {
    const { auth } = useAuth();

    if (auth) return <Navigate to={location.state?.next || "../auth"} />;

    return (
        <div
            className={
                `flex flex-col items-center justify-center min-h-screen text-center ` +
                bodyGradient
            }
        >
            <div className="hero flex flex-col divide-y-4 gap-4  p-10 rounded-lg">
                <h1 className="text-4xl font-bold">Running Journal</h1>
                <p className="text-lg">
                    Plan, track, and achieve your running goals.
                </p>
            </div>
            {/* Startup Delay Info */}
            <StartupDelay />
            <div className="mt-8 space-x-4 shadow-lg">
                <Link to="../login" className="btn btn-primary">
                    Log In
                </Link>
                <Link to="../signup" className="btn btn-secondary">
                    Sign Up
                </Link>
            </div>
            <div className="my-10 p-5 w-full md:w-3/4 lg:w-2/3 bg-base-300 rounded-lg shadow-md">
                <ul className="list-none space-y-3 text-base">
                    <li>📅 Schedule whole training cycles</li>
                    <li>🏃 Upload .gpx data easily and track your runs</li>
                    <li>
                        📝 Add details to your runs (Perceived effort,
                        equipment, notes)
                    </li>
                    <li>📈 Monitor your progress over time</li>
                </ul>
            </div>

            {/* Demo User Info */}
            <div className="mt-2 mb-6 p-2 w-full md:w-3/4 lg:w-2/3 bg-info rounded-lg text-info-content shadow-md">
                <p className="text-lg font-semibold">Try the Demo Account</p>
                <p>
                    Log in with the following credentials to explore the App
                    with live data (restricted access)
                </p>
                <p>
                    Email: <strong>demo@user.com</strong>
                </p>
                <p>
                    Password: <strong>demouser</strong>
                </p>
            </div>

            {/* Screenshot container*/}
            <h2 className="text-2xl mt-2 font-bold">Explore the App</h2>
            <div className="my-10 bg-base-200 rounded-lg shadow-md mx-6 w-3/5">
                <CarouselComponent />
            </div>

            {/* Social Media Links */}
            {/* <SocialMedia /> */}
            <Outlet />
        </div>
    );
};

export default WelcomePage;
