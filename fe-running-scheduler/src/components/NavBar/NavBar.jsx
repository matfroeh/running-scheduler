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
      <div className="hidden md:block md:navbar-start md:ml-0">
        <Link
          to="calendar"
          className="btn font-extrabold text-lg text-cyan-200 md:text-xl bg-cover bg-center"
          style={{ backgroundImage: 'url("/navbar-btn-bg.png")' }}
        >
          <span className="text-outline">{appName}</span>
        </Link>
      </div>
      <div className="ml-12 md:navbar-center">
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
      <div className="navbar-end md:hidden">
        <Link
          to="calendar"
          className="btn btn-sm font-extrabold text-cyan-200 bg-cover bg-center"
          style={{ backgroundImage: 'url("/navbar-btn-bg.png")' }}
        >
          <span className="text-outline">{appName}</span>
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
