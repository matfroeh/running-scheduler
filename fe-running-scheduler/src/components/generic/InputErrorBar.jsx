const InputErrorBar = ({ error }) => {
  return (
    <>
      {error && (
        <p className="text-red-500 text-sm flex justify-end mt-4">{error}</p>
      )}
    </>
  );
};

export default InputErrorBar;
