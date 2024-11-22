const ButtonHiddenInput = ({ text, accept, onClick, onChange, disabled, refForward }) => {
  return (
    <button
      className="btn btn-sm ring-1 ring-accent"
      onClick={onClick}
      disabled={disabled ? true : false}
    >
      {text}
      <input
        ref={refForward}
        type="file"
        multiple
        onChange={onChange}
        style={{ display: "none" }}
        accept={accept}
      />
    </button>
  );
};

export default ButtonHiddenInput;