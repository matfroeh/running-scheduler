const CardBody = ({ children, formattedDate, hideSchedule }) => (
    <div className="card-body justify-start gap-1 overflow-clip relative">
      {hideSchedule && formattedDate && (
        <div className="absolute top-0 right-0 text-white text-xs mt-1 mr-2">
          {formattedDate}
        </div>
      )}
      {children}
    </div>
  );

export default CardBody;