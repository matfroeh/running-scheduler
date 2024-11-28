import { useNavigate, Link } from "react-router-dom";
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
    <div className="navbar z-50 mb-1">
      <div className="md:hidden">
        <NavBarDropDownMenu
          imageUrl={imageUrl}
          user={user}
          openProfileModal={openProfileModal}
          openEquipmentModal={openEquipmentModal}
          handleLogOut={handleLogOut}
        />
      </div>
      <div className="navbar-center md:navbar-start">
        <Link to="calendar" className="btn btn-ghost text-base md:text-lg">
          {appName}
        </Link>
      </div>
      <div className="ml-8 md:navbar-center">
        <NavBarNavButtons />
      </div>
      <div className="hidden md:inline-flex md:navbar-end">
        <NavBarDropDownMenu
          imageUrl={imageUrl}
          user={user}
          openProfileModal={openProfileModal}
          openEquipmentModal={openEquipmentModal}
          handleLogOut={handleLogOut}
          openLeftSide={true}
        />
      </div>
    </div>
  );
};

export default NavBar;
