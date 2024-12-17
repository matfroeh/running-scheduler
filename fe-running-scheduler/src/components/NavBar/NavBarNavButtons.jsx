import { NavLink } from "react-router";

const NavBarNavButtons = () => {
    return (
        <>
            <NavLink
                to="/auth/equipment"
                className="btn btn-xs md:btn-sm btn-ghost"
            >
                Equipment
            </NavLink>
            <NavLink
                to="/auth/overview"
                className="btn btn-xs md:btn-sm btn-ghost"
            >
                Overview
            </NavLink>
            <NavLink
                to="/auth/calendar"
                className="btn btn-xs md:btn-sm btn-ghost"
            >
                Calendar
            </NavLink>
        </>
    );
};

export default NavBarNavButtons;
