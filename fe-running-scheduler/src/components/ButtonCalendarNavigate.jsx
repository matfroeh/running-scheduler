const ButtonCalendarNavigate = ({
  text,
  onClick,
  disabled,
}) => {
  return (
    <button
      className="btn btn-sm"
      onClick={onClick}
      disabled={disabled ? true : false}
    >
      {text}
    </button>
  );
};

export default ButtonCalendarNavigate;
