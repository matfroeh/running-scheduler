import { CardContainer, CardBody, CardDetails } from "@/components/Calendar";

const RunCard = ({ data, openRunCard, notes, hideSchedule }) => {
  const { date, name, comments } = data;

  const isToday =
    date &&
    new Date(date).toISOString().slice(0, 10) ===
      new Date(Date.now()).toISOString().slice(0, 10);

  const formattedDate = new Intl.DateTimeFormat("en-UK", {
    month: "numeric",
    day: "numeric",
  }).format(Date.parse(date));

  return (
    <CardContainer isToday={isToday} openRunCard={openRunCard}>
      <CardBody formattedDate={formattedDate} hideSchedule={hideSchedule}>
        <div
          className={`card-title text-nowrap overflow-clip text-sm ${
            hideSchedule ? "mt-2" : "-mt-3"
          }`}
        >
          {name}
        </div>
        {notes ? (
          <span className="text-xs">{comments}</span>
        ) : (
          <CardDetails data={data} hideSchedule={hideSchedule} />
        )}
      </CardBody>
    </CardContainer>
  );
};

export default RunCard;
