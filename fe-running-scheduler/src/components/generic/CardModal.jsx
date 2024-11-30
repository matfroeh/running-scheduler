import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const CardModal = ({ children }) => {
  const navigate = useNavigate();
  return (
    <div
      className="modal modal-open bg-black bg-opacity-70 flex justify-center items-center z-50"
      onClick={() => navigate(-1)}
    >
      <div
        className="card container max-h-screen xl:max-w-[50%] modal-window p-4 bg-base-100 rounded-lg border shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="card-body relative overflow-y-auto h-max">
          <div className="card-actions justify-end">
            <Link
              className="btn btn-square btn-ghost btn-sm absolute top-2 right-2"
              to={-1}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </Link>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default CardModal;
