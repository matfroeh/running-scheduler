const ButtonCalendarNavigate = ({
  text,
  onClick,
  disabled,
}) => {
  return (
    <button
      className="btn btn-sm text-xs md:text-sm"
      onClick={onClick}
      disabled={disabled ? true : false}
    >
      {text}
    </button>
  );
};

export default ButtonCalendarNavigate;
