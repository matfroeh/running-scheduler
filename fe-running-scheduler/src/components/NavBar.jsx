import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/context";
import { logout } from "../data/auth";
import { toast } from "react-toastify";

const NavBar = () => {
  const { auth, user, setCheckSession } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  // console.log(currentPath);

  const handleLogOut = async () => {
    try {
      await logout(); // this handles deleting the cookie by the API
      setCheckSession((prev) => !prev);
      toast.success("Successfully logged out!");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const openEquipmentModal = () => {
    // navigate("/");
    if (currentPath === "/") {
      navigate("equipment");
    } else navigate(`${currentPath}/equipment`);
  };

  return (
    <div className="navbar w-full">
      <div className="navbar-start">
        <a className="btn btn-ghost text-xl">Running Scheduler</a>
      </div>
      <div className="navbar-center">
        <NavLink to="/overview" className="btn btn-ghost text-l">
          Overview
        </NavLink>
        <NavLink to="/" className="btn btn-ghost text-l">
          Calendar
        </NavLink>
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
                <a onClick={openEquipmentModal}>Equipment</a>
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
                <NavLink to="/welcome/signup">Sign Up</NavLink>
              </li>
              <li>
                <NavLink to="/welcome/login">Login</NavLink>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
