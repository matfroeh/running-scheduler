// WelcomePage.jsx
import { Link, Outlet } from "react-router-dom";

const WelcomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-base-200 text-center">
      <div className="hero flex flex-col divide-y-4 gap-4 bg-base-100 shadow-lg p-10 rounded-lg">
        <h1 className="text-5xl font-bold">Welcome to The Running Journal</h1>
        <p className="text-lg">
          Your personal assistant to plan, track, and achieve your running
          goals.
        </p>
      </div>

      <div className="my-10 p-5 w-full md:w-3/4 lg:w-2/3 bg-base-300 rounded-lg shadow-md">
        <ul className="list-none space-y-3 text-lg">
          <li>📅 Schedule whole training cycles</li>
          <li>
            🏃 Upload .gpx data easily and track your runs
          </li>
          <li>📈 Monitor your progress over time</li>
        </ul>
      </div>

      <div className="mt-8 space-x-4">
        <Link to="/welcome/login" className="btn btn-primary">
          Log In
        </Link>
        <Link to="/welcome/signup" className="btn btn-secondary">
          Sign Up
        </Link>
      </div>

      <footer className="flex flex-col items-center justify-center mt-10 text-sm">
        <p>
          Follow us on
          <a
            href="https://www.socialmedia.com"
            className="link link-primary ml-1"
          >
            Social Media
          </a>
        </p>
        <p>© 2024 Running Scheduler. All rights reserved.</p>
      </footer>
      <Outlet />
    </div>
  );
};

export default WelcomePage;
