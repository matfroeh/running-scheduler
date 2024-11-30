import { useEffect, useState, useRef } from "react";

// const slides = ["#slide1", "#slide2", "#slide3"];
const slides = Array.from({ length: 10 }, (_, i) => `#slide${i + 1}`);

const description = [
  "This is your Calendar View",
  "Start by creating your Schedule template",
  "Upload your runs",
  "Add perceived effort, equipment and notes to your runs",
  "Manage your equipment. Distance and time? Automatically added!",
  "View all your training plans in the Overview page...",
  "...and the automatically generated statistics",
  "Turn on the notes to see all your comments directly in the Calendar View",
  "Upload multiple .gpx files",
  "Hide the Schedule and show only your performed run statistics",
];

const CarouselComponent = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [zoomed, setZoomed] = useState(false);

  const sliderInterval = useRef();

  useEffect(() => {
    sliderInterval.current = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 6000);
    return () => clearInterval(sliderInterval.current);
  }, []);

  const handleManualSlide = (indexToSet) => {
    setCurrentIndex(indexToSet);
    clearInterval(sliderInterval.current);
    // Continue the automatic slide after 10 seconds
    sliderInterval.current = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 10000);
  };

  const handleImageZoom = () => {
    setZoomed((prev) => !prev);
  };

  return (
    <div className="carousel">
      {slides.map((slide, index) => (
        <div
          key={slide}
          id={`slide${index + 1}`}
          className={`carousel-item relative w-full ${
            currentIndex === index ? "block" : "hidden"
          }`}
        >
          <h2 className="text-center text-xl font-bold mb-4">
            {description[index]}
          </h2>
          <div className="relative">
            <img
              src={`/slidesWelcomePage/${index + 1}.png`}
              className="w-full rounded-lg shadow-md cursor-zoom-in"
              alt={`Slide ${index + 1}`}
              onClick={handleImageZoom}
            />
            {zoomed && (
              <div
                className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 z-50"
                onClick={handleImageZoom}
              >
                <img
                  src={`/slidesWelcomePage/${index + 1}.png`}
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-zoom-out"
                  alt={`Slide ${index + 1}`}
                />
              </div>
            )}
            <div className="absolute flex justify-between transform -translate-y-1/2 left-0 right-0 top-1/4 opacity-50">
              <a
                href={`#slide${
                  ((index - 1 + slides.length) % slides.length) + 1
                }`}
                className="btn btn-sm lg:btn-md btn-circle btn-accent"
                onClick={() =>
                  handleManualSlide((index - 1 + slides.length) % slides.length)
                }
              >
                ❮
              </a>
              <a
                href={`#slide${((index + 1) % slides.length) + 1}`}
                className="btn btn-sm lg:btn-md btn-circle btn-accent"
                onClick={() => handleManualSlide((index + 1) % slides.length)}
              >
                ❯
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CarouselComponent;
