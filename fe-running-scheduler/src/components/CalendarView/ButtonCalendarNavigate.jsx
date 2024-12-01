import { cn } from "@/lib/utils";

const ButtonCalendarNavigate = ({ text, onClick, disabled, className }) => {
  return (
    <button
      className={cn("btn btn-xs sm:btn-sm text-xs md:text-sm", className)}
      onClick={onClick}
      disabled={disabled ? true : false}
    >
      {text}
    </button>
  );
};

export default ButtonCalendarNavigate;
