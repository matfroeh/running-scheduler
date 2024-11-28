const CardContainer = ({ isToday, openRunCard, children }) => {
  // const baseClass =
  //   "mx-0.5 max-w-44 min-w-20 card card-compact rounded-tr-none rounded-br-none rounded-tl-none " +
  //   "bg-gray-900 ring-1 hover:ring-2 cursor-pointer";
  const baseClass =
  "mx-0.5 max-w-40 min-w-20 card card-compact rounded-tr-none rounded-br-none rounded-tl-none " +
  "bg-gray-900 ring-1 hover:ring-2 cursor-pointer h-max overflow-clip";
  const todayClass = isToday ? "ring-green-500" : "";

  return (
    <div className={`${baseClass} ${todayClass}`} onClick={openRunCard}>
      {children}
    </div>
  );
};

export default CardContainer;
