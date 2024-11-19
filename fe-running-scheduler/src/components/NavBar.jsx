import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "@/context";
import { useFetchUserProfile } from "../lib/hooks";
import { arrayBufferToBase64 } from "../utils/arrayBufferToBase64";

const NavBar = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();
  const { image } = useFetchUserProfile(user);

  const handleLogOut = () => {
    logOut();
  };

  const openEquipmentModal = () => {
    navigate("/auth/equipment");
  };

  const openProfileModal = () => {
    navigate("/auth/profile");
  };

  // load user's profile image or default image
  const imageUrl = image
    ? `data:${image.img.contentType};base64,${arrayBufferToBase64(
        image.img.data.data
      )}`
    : "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp";

  return (
    <div className="navbar w-full z-50 min-w-min">
      <div className="navbar-start">
        <a className="btn btn-ghost text-xl">Running Journal</a>
      </div>
      <div className="navbar-center">
        <NavLink to="overview" className="btn btn-ghost text-l">
          Overview
        </NavLink>
        <NavLink to="calendar" className="btn btn-ghost text-l">
          Calendar
        </NavLink>
      </div>
      <div className="navbar-end">
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                className="rounded-full"
                src={imageUrl}
                alt="profile"
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-md dropdown-content bg-base-300 rounded-box z-[50] mt-3 w-52 p-2 shadow"
          >
            <li>
              <h2 className="text-lg font-bold">{user?.userName}</h2>
            </li>
            <li>
              <a onClick={openProfileModal}>Profile</a>
            </li>
            <li>
              <a onClick={openEquipmentModal}>Equipment</a>
            </li>
            <li>
              <a onClick={handleLogOut}>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
