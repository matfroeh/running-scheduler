import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context";
import { useFetchUserProfile } from "@/lib/hooks/miscDataHooks";
import { arrayBufferToBase64 } from "@/utils/arrayBufferToBase64";
import NavBarDropDownMenu from "./NavBarDropDownMenu";
import NavBarNavButtons from "./NavBarNavButtons";
import { appName } from "@/lib/uiConstants";

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
    : "/profilePlaceHolder.webp";

  return (
    <div className="navbar w-full z-50 min-w-min">
      <div className="navbar-start">
        <a className="btn btn-ghost text-xl">{appName}</a>
      </div>
      <div className="navbar-center">
        <NavBarNavButtons />
      </div>
      <div className="navbar-end">
        <NavBarDropDownMenu
          imageUrl={imageUrl}
          user={user}
          openProfileModal={openProfileModal}
          openEquipmentModal={openEquipmentModal}
          handleLogOut={handleLogOut}
        />
      </div>
    </div>
  );
};

export default NavBar;
