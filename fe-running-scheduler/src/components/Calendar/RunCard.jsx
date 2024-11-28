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

  // If there is no name, then there is also no data of a run to display
  // if (!name) return null;

  return (
    <CardContainer isToday={isToday} openRunCard={openRunCard}>
      <CardBody formattedDate={formattedDate} hideSchedule={hideSchedule}>
        <div
          className={`card-title text-xs md:text-sm ${
            hideSchedule ? "mt-1" : "-mt-1"
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
