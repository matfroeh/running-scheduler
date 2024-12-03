
const Modal = ({ children, isOpen, setOpen }) => { 

  return (
    <div
      className={
        `modal bg-black bg-opacity-70 flex justify-center items-center z-50` +
        (isOpen ? " modal-open" : " modal-closed")
      }
      onClick={() => setOpen(false)}
    >
      <div
        className="card container max-h-screen max-w-[400px] modal-window p-0 bg-base-100 rounded-lg border shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="card-body relative text-xs md:text-sm lg:text-base overflow-y-auto h-max">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
