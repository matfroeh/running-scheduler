import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRoad,
  faStopwatch,
  faHeartPulse,
  faCalendarDays,
  faPersonRunning,
  faBolt,
  faSquareRootVariable,
  faMinus,
  faBullseye,
  faNoteSticky,
  faImage,
} from "@fortawesome/free-solid-svg-icons";

const Icons = ({ type }) => {
  switch (type) {
    case "distance":
      return <FontAwesomeIcon  icon={faRoad} />;
    case "time":
      return <FontAwesomeIcon style={{ margin: 1 }} icon={faStopwatch} />;
    case "heartRate":
      return <FontAwesomeIcon style={{ margin: 1 }} icon={faHeartPulse} />;
    case "date":
      return <FontAwesomeIcon style={{ margin: 1 }} icon={faCalendarDays} />;
    case "speed":
      return <FontAwesomeIcon style={{ margin: 2 }} icon={faPersonRunning} />;
    case "effort":
      return <FontAwesomeIcon style={{ margin: 2 }} icon={faBolt} />;
    case "sum":
      return (
        <FontAwesomeIcon style={{ margin: 0 }} icon={faSquareRootVariable} />
      );
    case "average":
      return <FontAwesomeIcon style={{ margin: 0 }} icon={faMinus} />;
    case "goal":
      return <FontAwesomeIcon style={{ margin: 0 }} icon={faBullseye} />;
    case "note":
      return <FontAwesomeIcon style={{ margin: 1 }} icon={faNoteSticky} />;
    case "image":
      return <FontAwesomeIcon icon={faImage} />;
    default:
      return null;
  }
};

export default Icons;
