import React, { useState, useEffect } from "react";


export default function Carousel() {
  const slides = [
    {
      id: 1,
      image:
        'src/components/Carousel/image/Banner1.jpg',
      caption: "Slide 1",
    },
    {
      id: 2,
      image:
        "src/components/Carousel/image/Banner2.jpg",
      caption: "Slide 2",
    },
    {
      id: 3,
      image:
        "src/components/Carousel/image/Banner4.jpg",
      caption: "Slide 3",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === slides.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="relative w-full max-h-[450px] max-w-full mx-auto">
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-700"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {slides.map((slide) => (
              <div key={slide.id} className="min-w-full">
                <img
                  src={slide.image}
                  alt={slide.caption}
                  className="w-full h-[450px] object-center"
                />
              </div>
            ))}
          </div>
        </div>
        <div className="absolute gap-x-3 bottom-4 left-0 right-0 flex justify-center">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              onClick={() => setCurrentIndex(index)}
              className={`w-4 h-4 mx-1  rounded-full ${
                index === currentIndex ? "bg-white" : "bg-gray-500"
              }`}
            ></button>
          ))}
        </div>
      </div>
    </>
  );
}
