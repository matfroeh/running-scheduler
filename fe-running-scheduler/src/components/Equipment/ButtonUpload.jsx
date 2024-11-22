const ButtonUpload = ({ imageId, onClick }) => {
  return (
    <button
      className={
        !imageId ? "btn btn-primary btn-sm ring-1 justify-self-start" : "hidden"
      }
      onClick={onClick}
    >
      Accept and Upload Image
    </button>
  );
};

export default ButtonUpload;
