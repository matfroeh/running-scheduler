import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRoad, faStopwatch, faHeartPulse, faCalendarDays } from "@fortawesome/free-solid-svg-icons";

const Icons = ({ type }) => {
  switch (type) {
    case "distance":
      return <FontAwesomeIcon icon={faRoad} />;
    case "time":
      return <FontAwesomeIcon icon={faStopwatch} />;
    case "heartRate":
      return <FontAwesomeIcon icon={faHeartPulse} />;
    case "date":
        return <FontAwesomeIcon icon={faCalendarDays} />;
    default:
      return null;
  }
};

export default Icons;
