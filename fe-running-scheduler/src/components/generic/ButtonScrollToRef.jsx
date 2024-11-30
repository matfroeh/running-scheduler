import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

import { FaArrowDown } from "react-icons/fa"; // FontAwesome arrow icon

const ButtonScrollToRef = ({ forwardRef, className }) => {
  const [visible, setVisible] = useState(true);

  // Handle scroll visibility
  useEffect(() => {
    const toggleVisibility = () => {
      setVisible(window.scrollY < 400); // Show when scrolled 200px down
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  // Scroll to top function
  const scrollToRef = () => {
    forwardRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    visible && (
      <button
        onClick={scrollToRef}
        className={cn(
          "fixed p-3 bg-primary text-white rounded-full shadow-lg hover:bg-accent transition-colors",
          className
        )}
        aria-label="Scroll down to reference"
      >
        <FaArrowDown size={20} />
      </button>
    )
  );
};

export default ButtonScrollToRef;
