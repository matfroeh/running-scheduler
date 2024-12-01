import { useNavigate } from "react-router-dom";
import { CardElementCloseButton } from "@/components/generic";

const CardModal = ({ children }) => {
  const navigate = useNavigate();
  return (
    <div
      className="modal modal-open bg-black bg-opacity-70 flex justify-center items-center z-50"
      onClick={() => navigate(-1)}
    >
      <div
        // className="card container max-h-screen xl:max-w-[50%] modal-window p-4 bg-base-100 rounded-lg border shadow-lg"
        className="card container mr-6 max-h-screen lg:max-w-[800px] modal-window p-0 bg-base-100 rounded-lg border shadow-lg"

        onClick={(e) => e.stopPropagation()}
      >
        <div className="card-body relative text-xs md:text-sm lg:text-base overflow-y-auto h-max">
          <div className="card-actions justify-end">
            <CardElementCloseButton />
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default CardModal;
