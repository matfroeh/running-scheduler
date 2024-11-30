const RotatingCircle = () => {
  return (
    <svg className="animate-spin w-5" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="9" stroke="#f59e0b" strokeWidth="4"></circle>
      <path
        fill="#f59e0b"
        d="M4 12a8 8 0 018-8V4a10 10 0 00-10 10h2zm2 8a8 8 0 018-8h2a10 10 0 00-10-10V2a12 12 0 0110 10"
      ></path>
    </svg>
  );
};

export default RotatingCircle;
