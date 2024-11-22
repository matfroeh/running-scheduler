const ButtonToggle = ({text, onClick}) => {
  return (
    <label className="label cursor-pointer">
    <span className="label-text text-base text-nowrap">
      {text}
    </span>
    <input
      type="checkbox"
      className="toggle toggle-accent mx-2"
      onClick={onClick}
    />
  </label>
  )
}

export default ButtonToggle