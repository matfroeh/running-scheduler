import { NavLink } from "react-router-dom";

const NavBarNavButtons = () => {
  return (
    <>
      <NavLink to="overview" className="btn btn-ghost text-l">
        Overview
      </NavLink>
      <NavLink to="calendar" className="btn btn-ghost text-l">
        Calendar
      </NavLink>
    </>
  );
};

export default NavBarNavButtons;
