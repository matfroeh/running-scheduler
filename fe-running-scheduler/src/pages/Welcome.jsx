// WelcomePage.jsx
import { Link, Outlet } from 'react-router-dom';

const WelcomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-base-200 text-center">
      {/* Hero Section */}
      <div className="hero flex flex-col divide-y-4 gap-4 bg-base-100 shadow-lg p-10 rounded-lg">
        <h1 className="text-5xl font-bold">Welcome to Running Scheduler</h1>
        <p className="text-lg">Your personal assistant to plan, track, and achieve your running goals.</p>
        {/* <img 
          src="path-to-your-motivational-image.jpg" 
          alt="Motivational Running" 
          className="max-w-full h-auto rounded-lg"
        /> */}
      </div>

      {/* Features Section */}
      <div className="features-section my-10 p-5 w-full md:w-3/4 lg:w-2/3 bg-base-300 rounded-lg shadow-md">
        {/* <h2 className="text-3xl font-semibold mb-4">Why You'll Love Running Scheduler</h2> */}
        <ul className="list-none space-y-3 text-lg">
          <li>🏃 Track your runs effortlessly</li>
          <li>📅 Schedule your runs with ease</li>
          <li>🎯 Set and achieve your running goals</li>
          <li>📈 Monitor your progress over time</li>
        </ul>
      </div>

      {/* Call to Action */}
      <div className="cta-section mt-8 space-x-4">
        <Link to="/welcome/login" className="btn btn-primary">Log In</Link>
        <Link to="/welcome/signup" className="btn btn-secondary">Sign Up</Link>
      </div>

      {/* Footer Section */}
      <footer className="footer flex flex-col items-center justify-center mt-10 text-sm">
        <p>
          Follow us on 
          <a href="https://www.socialmedia.com" className="link link-primary ml-1">Social Media</a>
        </p>
        <p>© 2024 Running Scheduler. All rights reserved.</p>
      </footer>
      <Outlet />
    </div>
  );
};

export default WelcomePage;
