const NavBarMobileDropDown = () => {
  return (
    <div className="dropdown">
      <div
        tabIndex={0}
        role="button"
        className="btn btn-ghost bg-cover bg-center"
        style={{ backgroundImage: 'url("/navbar-btn-bg.png")' }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          className="inline-block h-8 w-8 stroke-inverse" // invisible
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h7"
          ></path>
        </svg>
      </div>
      {/* <ul
        tabIndex={0}
        className="menu menu-lg dropdown-content bg-base-300 rounded-box z-[50] mt-3 w-52 p-2 shadow"
      >
        <li>
          <a>Homepage</a>
        </li>
        <li>
          <a>Portfolio</a>
        </li>
        <li>
          <a>About</a>
        </li>
      </ul> */}
    </div>
  );
};

export default NavBarMobileDropDown;
