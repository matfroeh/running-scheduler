import { Link } from "react-router";
import { appName } from "@/lib/constants";

const NavBarLogoButton = () => {
    return (
        <Link
            to="../calendar"
            className="btn font-extrabold text-cyan-200 bg-cover bg-center"
            style={{ backgroundImage: 'url("/navbar-btn-bg.png")' }}
        >
            <span className="text-outline">{appName}</span>
        </Link>
    );
};

export default NavBarLogoButton;
