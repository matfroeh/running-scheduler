import { NavLink } from "react-router-dom";

const NavBarNavButtons = () => {
  return (
    <>
      <NavLink to="overview" className="btn btn-xs md:btn-sm btn-ghost">
        Overview
      </NavLink>
      <NavLink to="calendar" className="btn btn-xs md:btn-sm btn-ghost">
        Calendar
      </NavLink>
    </>
  );
};

export default NavBarNavButtons;
