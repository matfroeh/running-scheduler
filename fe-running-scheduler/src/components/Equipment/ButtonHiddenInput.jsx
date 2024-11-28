const ButtonHiddenInput = ({imageUrl, onClick, onChange, refForward}) => {
  return (
    <div
      className={
        !imageUrl
          ? "btn btn-sm w-max btn-primary ring-1 justify-self-start"
          : "btn btn-sm w-max justify-self-start"
      }
      onClick={onClick}
    >
      Select New Image
      <input
        ref={refForward}
        type="file"
        onChange={onChange}
        style={{ display: "none" }}
        accept="image/*"
      />
    </div>
  );
};

export default ButtonHiddenInput;
