import { useNavigate } from "react-router";
import { useAuth } from "@/context";
import { useFetchUserProfile } from "@/lib/hooks";
import { arrayBufferToBase64 } from "@/lib/utils";
import {
    NavBarDropDownMenu,
    NavBarNavButtons,
    NavBarMobileDropDown,
    NavBarLogoButton,
} from "@/components/NavBar";
import { Image } from "@/types";
import { navBarGradient } from "@/components/misc/tailwind-classes";

const NavBar = () => {
    const { user, logOut } = useAuth();
    const navigate = useNavigate();
    const { image } = useFetchUserProfile(user) as {
        image: Image | undefined;
    };

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
        : "/shoe-colorful-placeholder.png";

    return (
        <div className={`navbar z-50 pb-1 ` + navBarGradient}>
            <div className="md:hidden navbar-start">
                <NavBarMobileDropDown />
            </div>

            <div className="hidden navbar-start md:inline">
                <NavBarLogoButton />
            </div>

            <NavBarNavButtons />

            <div className="navbar-end">
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
