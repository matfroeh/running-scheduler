const CardContainer = ({ isToday, openRunCard, children }) => {
  const baseClass =
    "max-w-44 min-w-20 card card-compact rounded-tr-none rounded-br-none rounded-tl-none " +
    "bg-gray-900 ring-2 hover:ring-4 cursor-pointer";
  const todayClass = isToday ? "ring-green-500" : "";

  return (
    <div className={`${baseClass} ${todayClass}`} onClick={openRunCard}>
      {children}
    </div>
  );
};

export default CardContainer;
