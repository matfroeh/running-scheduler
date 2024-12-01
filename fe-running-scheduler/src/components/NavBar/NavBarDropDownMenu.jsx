const NavBarDropDownMenu = ({imageUrl, user, openProfileModal, openEquipmentModal, handleLogOut, openLeftSide=false}) => {
  return (
    <div className={`dropdown ${openLeftSide? "dropdown-left" : "dropdown-bottom"}`}>
    <div
      tabIndex={0}
      role="button"
      className="btn btn-ghost btn-circle avatar"
    >
      <div className="w-10 rounded-full">
        <img
          className="rounded-full"
          src={imageUrl}
          alt="profile"
        />
      </div>
    </div>
    <ul
      tabIndex={0}
      className="menu menu-lg md:menu-md dropdown-content bg-base-300 rounded-box z-[50] mt-3 w-52 p-2 shadow"
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
        <a onClick={handleLogOut}>Logout</a>
      </li>
    </ul>
  </div>
  )
}

export default NavBarDropDownMenu