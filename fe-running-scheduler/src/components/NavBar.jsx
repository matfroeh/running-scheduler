import { NavLink } from "react-router-dom";
import { useAuth } from "@/context";
import { logout } from "../data/auth";
import { toast } from "react-toastify";

const NavBar = () => {
  const { auth, user, setCheckSession } = useAuth();

  const handleLogOut = async () => {
    try {
      await logout(); // this handles deleting the cookie by the API
      setCheckSession((prev) => !prev);
      toast.success("Successfully logged out!");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="navbar min-w-max ">
      <div className="navbar-start">
        <a className="btn btn-ghost text-xl">Running Scheduler</a>
      </div>
      <div className="navbar-center">
        <a className="btn btn-ghost text-l">Overview</a>
        <a className="btn btn-ghost text-l">Calendar</a>
      </div>
      <div className="navbar-end">
        {auth ? (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-md dropdown-content bg-base-300 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <h2 className="text-lg font-bold">{user?.userName}</h2>
              </li>
              <li>
                <a className="justify-between">Profile</a>
              </li>
              <li>
                <NavLink to="/equipment">Equipment</NavLink>
              </li>
              <li>
                <NavLink onClick={handleLogOut}>Logout</NavLink>
              </li>
            </ul>
          </div>
        ) : (
          <div className="flex-none">
            <ul className="menu menu-horizontal px-1">
              <li>
                <NavLink to="/signup">Sign Up</NavLink>
              </li>
              <li>
                <NavLink to="/login">Login</NavLink>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
