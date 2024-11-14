import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/context";
import { useEffect, useState } from "react";
import axios from "axios";

const NavBar = () => {
  const API_URL = import.meta.env.VITE_APP_RUNNING_SCHEDULER_API_URL;
  const { auth, user, logOut } = useAuth();
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  // console.log("navbar loaded");
  

  const handleLogOut = () => {
    logOut();
  };

  const openEquipmentModal = () => {
    // navigate("/");
    if (currentPath === "/") {
      navigate("equipment");
    } else navigate(`${currentPath}/equipment`);
  };

  const openProfileModal = () => {
    if (currentPath === "/") {
      navigate("profile");
    } else navigate(`${currentPath}/profile`);
  };

  useEffect(() => {
    // Fetch images from the server when the component mounts
    if (!user?.profilePicture) {
      return;
    }
    const fetchImage = async () => {
      const response = await axios.get(
        `${API_URL}/uploads/${user.profilePicture}`,
        {
          withCredentials: true,
        }
      );
      setImage(response.data);
      setLoading(false);
    };

    fetchImage();
  }, [user, auth]);

  const arrayBufferToBase64 = (buffer) => {
    let binary = "";
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  };

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
        {auth ? (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                {!loading && image ? (
                  <img
                    className="rounded-full"
                    src={`data:${
                      image.img.contentType
                    };base64,${arrayBufferToBase64(image.img.data.data)}`}
                    alt="profile"
                  />
                ) : (
                  <img
                    className="rounded-full"
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                    alt="profile"
                  />
                )}
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
