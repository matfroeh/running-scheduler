const ButtonUpload = ({ imageUrl, onClick }) => {
  return (
    <button
      className={
        imageUrl ? "btn btn-primary btn-sm ring-1 justify-self-start" : "hidden"
      }
      onClick={onClick}
    >
      Accept and Upload Image
    </button>
  );
};

export default ButtonUpload;
