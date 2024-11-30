const ButtonDelete = ({ onClick }) => {
  return (
    <button
      className="btn btn-sm btn-neutral hover:btn-error"
      onClick={onClick}
    >
      Delete
    </button>
  );
};

export default ButtonDelete;
