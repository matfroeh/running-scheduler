const CardBody = ({ children, formattedDate, hideSchedule }) => (
  <div className="flex flex-col justify-start text-xs">
    {hideSchedule && formattedDate && (
      <div className="absolute top-0 right-0 text-white text-xs mr-0.5">
        {formattedDate}
      </div>
    )}
    <div className="mx-2 mt-3 mb-1 flex flex-col gap-0 justify-start text-xs">
      {children}
    </div>
  </div>
);

export default CardBody;
