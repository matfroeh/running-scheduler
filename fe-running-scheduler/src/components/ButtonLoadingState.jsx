import cn from "../utils/cn.js";
import { RotatingCircle } from "../svg/animated.jsx";

const ButtonLoadingState = ({ text, className }) => {
  return (
    <button
      className={cn(
        "btn btn-sm text-xs align-middle flex-nowrap text-warning ring-1 ring-warning",
        className
      )}
    >
      <RotatingCircle />
      {text}
    </button>
  );
};

export default ButtonLoadingState;
