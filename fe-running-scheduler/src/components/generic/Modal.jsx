import { useNavigate } from "react-router-dom";

const Modal = ({ children }) => {
  const navigate = useNavigate();

  return (
    <div
      className="modal modal-open"
      onClick={() => navigate(-1)} // Close modal on backdrop click
    >
      <div
        className=""
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;