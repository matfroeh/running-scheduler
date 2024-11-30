import { useState, useEffect } from 'react';
import { FaArrowUp } from 'react-icons/fa'; // FontAwesome arrow icon

const ButtonScrollTop = () => {
  const [visible, setVisible] = useState(false);

  // Handle scroll visibility
  useEffect(() => {
    const toggleVisibility = () => {
      setVisible(window.scrollY > 400); // Show when scrolled 200px down
    };
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    visible && (
      <button
        onClick={scrollToTop}
        className="fixed top-20 right-6 p-3 bg-primary text-white rounded-full shadow-lg hover:bg-accent transition-colors"
        aria-label="Scroll to top"
      >
        <FaArrowUp size={20} />
      </button>
    )
  );
};

export default ButtonScrollTop;
