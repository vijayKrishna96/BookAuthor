
import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

const slides = [
  {
    id: 1,
    image: 'https://img.freepik.com/free-vector/horizontal-sale-banner-template-world-book-day-celebration_23-2150162040.jpg',
    caption: 'Slide 1',
  },
  {
    id: 2,
    image: 'https://img.freepik.com/free-vector/realistic-book-lovers-day-horizontal-background-with-composition-text-books-with-lamp-cup-vector-illustration_1284-77302.jpg',
    caption: 'Slide 2',
  },
  {
    id: 3,
    image: 'https://media.istockphoto.com/id/1350379096/vector/flyer-with-study-supplies-for-studying-education-learning-back-to-school-student-stationery.jpg?s=612x612&w=0&k=20&c=8WzA-f3etXYqlwiHCu5d6LLZ1DhhdhMdt2lGq812Qg4=',
    caption: 'Slide 3',
  },
];

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex === slides.length - 1 ? 0 : prevIndex + 1));
  }, []);

  // const prevSlide = useCallback(() => {
  //   setCurrentIndex((prevIndex) => (prevIndex === 0 ? slides.length - 1 : prevIndex - 1));
  // }, []);

  useEffect(() => {
    const interval = setInterval(nextSlide, 3000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
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
            className={`w-4 h-4 mx-1 rounded-full ${
              index === currentIndex ? 'bg-white' : 'bg-gray-500'
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
};

Carousel.propTypes = {
  currentIndex: PropTypes.number,
  nextSlide: PropTypes.func,
  prevSlide: PropTypes.func,
};

export default Carousel;
