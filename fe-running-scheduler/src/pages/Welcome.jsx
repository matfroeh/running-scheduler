// WelcomePage.jsx
import { Link, Outlet, useNavigation, Navigate } from "react-router-dom";
// import LoadingOverlay from "react-loading-overlay-ts";
import { Loading, Footer, StartupDelay } from "@/components";
import { useAuth } from "@/context";

const WelcomePage = () => {
  const { auth } = useAuth();
  const navigation = useNavigation();

  if (auth) return <Navigate to={location.state?.next || "/auth"} />;

  return (
    <>
      {navigation.state === "loading" && <Loading />}
      {/* <div className="flex justify-center text-nowrap h-full w-full mt-14">
          <LoadingOverlay active={true} spinner text="Loading..." />
        </div>
      )} */}
      <div className="flex flex-col items-center justify-center min-h-screen bg-base-200 text-center">
        <div className="hero flex flex-col divide-y-4 gap-4 bg-base-100 shadow-lg p-10 rounded-lg">
          <h1 className="text-5xl font-bold">Welcome to Running Journal</h1>
          <p className="text-lg">
            Plan, track, and achieve your running goals.
          </p>
        </div>

        <div className="mt-8 space-x-4">
          <Link to="login" className="btn btn-primary">
            Log In
          </Link>
          <Link to="signup" className="btn btn-secondary">
            Sign Up
          </Link>
        </div>

        <div className="my-10 p-5 w-full md:w-3/4 lg:w-2/3 bg-base-300 rounded-lg shadow-md">
          <ul className="list-none space-y-3 text-lg">
            <li>📅 Schedule whole training cycles</li>
            <li>🏃 Upload .gpx data easily and track your runs</li>
            <li>📈 Monitor your progress over time</li>
          </ul>
        </div>

        {/* Demo User Info */}
        {/* <div className="my-5 p-4 w-full md:w-3/4 lg:w-2/3 bg-info rounded-lg text-info-content shadow-md">
          <p className="text-lg font-semibold">Try a Demo Account</p>
          <p>Log in with the following credentials to explore:</p>
          <p>
            Email: <strong>demo@user.com</strong>
          </p>
          <p>
            Password: <strong>demouser</strong>
          </p>
        </div> */}

        {/* Startup Delay Info */}
        <StartupDelay />

        {/* Social Media Links */}
        {/* <SocialMedia /> */}

        {/* Footer */}

        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default WelcomePage;

// {/* Screenshot Container */}

// <div className="my-10 w-full md:w-3/4 lg:w-2/3 bg-base-200 rounded-lg shadow-md p-5">
//   <h2 className="text-xl font-bold mb-4">Screenshots</h2>
//   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//     {/* Add <img> elements for screenshots here */}
//     {/* Example: <img src="screenshot1.jpg" alt="Screenshot 1" className="rounded-lg shadow-md" /> */}
//   </div>
// </div>
