// WelcomePage.jsx
import { Link, Outlet, Navigate } from "react-router-dom";
import { Footer, StartupDelay, CarouselComponent } from "@/components";
import { useAuth } from "@/context";
import { ToastContainer } from "react-toastify";

const WelcomePage = () => {
  const { auth } = useAuth();

  if (auth) return <Navigate to={location.state?.next || "/auth"} />;

  return (
    <div className="container mx-auto">
      <div className="flex flex-col items-center justify-center min-h-screen bg-base-200 text-center">
        {/* Startup Delay Info */}
        <StartupDelay />
        <div className="hero flex flex-col divide-y-4 gap-4 bg-base-100 shadow-lg p-10 rounded-lg">
          <h1 className="text-4xl font-bold">Welcome to Running Journal</h1>
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
          <ul className="list-none space-y-3 text-base">
            <li>📅 Schedule whole training cycles</li>
            <li>🏃 Upload .gpx data easily and track your runs</li>
            <li>📝 Add details to your runs (Perceived Effort, Equipment, Notes)</li>
            <li>📈 Monitor your progress over time</li>
          </ul>
        </div>

        {/* // Screenshot container*/}
        <h2 className="text-2xl font-bold">Explore the App</h2>
        <div className="my-10 bg-base-200 rounded-lg shadow-md mx-6 w-3/5">
          <CarouselComponent />
        </div>

        {/* Social Media Links */}
        {/* <SocialMedia /> */}
        {/* Footer */}
        <Outlet />
      </div>
      <Footer />
      <ToastContainer
        position="bottom-right"
        autoClose={2500}
        theme="colored"
      />
    </div>
  );
};

export default WelcomePage;

{
  /* Demo User Info */
}
{
  /* <div className="my-5 p-4 w-full md:w-3/4 lg:w-2/3 bg-info rounded-lg text-info-content shadow-md">
  <p className="text-lg font-semibold">Try a Demo Account</p>
  <p>Log in with the following credentials to explore:</p>
  <p>
    Email: <strong>demo@user.com</strong>
  </p>
  <p>
    Password: <strong>demouser</strong>
  </p>
</div> */
}

// <div className="my-10 bg-base-200 rounded-lg shadow-md p-5">
//   {/* <div className="grid grid-cols-2 xl:grid-cols-3 gap-8"> */}
//   <div className="carousel rounded-box">
//     <div id="slide1" className="carousel-item relative w-full">
//       <img
//         src="/calendar.png"
//         alt="Calendar View"
//         className="rounded-lg shadow-md"
//       />
//       <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
//         <a href="#slide3" className="btn btn-circle">
//           ❮
//         </a>
//         <a href="#slide2" className="btn btn-circle">
//           ❯
//         </a>
//       </div>
//     </div>
//     <div id="slide2" className="carousel-item relative w-full">
//       <img
//         src="/createTemplate.png"
//         alt="Start by creating a template training schedule"
//         className="rounded-lg shadow-md"
//       />
//       <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
//         <a href="#slide1" className="btn btn-circle">
//           ❮
//         </a>
//         <a href="#slide3" className="btn btn-circle">
//           ❯
//         </a>
//       </div>
//     </div>
//   </div>
//   <div>
//     <img
//       src="/runDetails.png"
//       alt="Run Details Window"
//       className="rounded-lg shadow-md"
//     />
//     <img
//       src="/runDetailsEdit.png"
//       alt="Run Details: Edit Form"
//       className="rounded-lg shadow-md"
//     />
//     <img
//       src="/equipment.png"
//       alt="Equipment Management"
//       className="rounded-lg shadow-md"
//     />
//     <img
//       src="/overview1.png"
//       alt="Overview page"
//       className="rounded-lg shadow-md"
//     />
//     <img
//       src="/overview2.png"
//       alt="Overview page"
//       className="rounded-lg shadow-md"
//     />
//     <img
//       src="/multiGpx.png"
//       alt="Upload multiple .gpx files"
//       className="rounded-lg shadow-md"
//     />
//     <img
//       src="/showNotes.png"
//       alt="Switch between run details and notes"
//       className="rounded-lg shadow-md"
//     />
//     <img
//       src="/hideSchedule.png"
//       alt="Show performed runs only"
//       className="rounded-lg shadow-md"
//     />
//   </div>
// </div>
