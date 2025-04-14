'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

function Onboarding() {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const slides = [
    {
      image:
        'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      title: 'Enjoy your lunch time',
      description:
        'Just relax and not overthink what to eat. This is in our side with our personalized meal plans just prepared and adapted to your needs.',
    },
    {
      image:
        'https://images.unsplash.com/photo-1547592180-85f173990554?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      title: 'Healthy & Delicious',
      description:
        'Discover meals that are both nutritious and delicious, carefully crafted to meet your dietary preferences.',
    },
    {
      image:
        'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      title: 'Fresh Ingredients',
      description:
        'Every meal plan features fresh, seasonal ingredients to ensure you get the best flavors and nutrition.',
    },
    {
      image:
        'https://images.unsplash.com/photo-1493770348161-369560ae357d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      title: 'Variety of Choices',
      description:
        'From quick lunches to elaborate dinners, find the perfect meal plan that fits your lifestyle.',
    },
  ];

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentSlide((prev) => (prev + newDirection + slides.length) % slides.length);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      paginate(1);
    }, 3000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const isLastSlide = currentSlide === slides.length - 1;

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4 sm:p-6">
      {/* Updated container: on mobile remain same, on larger screens increase width */}
      <div className="w-full max-w-[540px] sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl mx-20px">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          {/* Image Slider */}
          <div className="relative rounded-3xl overflow-hidden mb-8 aspect-[4/3]">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={currentSlide}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: 'spring', stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={1}
                onDragEnd={(e, { offset, velocity }) => {
                  const swipe = swipePower(offset.x, velocity.x);
                  if (swipe < -swipeConfidenceThreshold) {
                    paginate(1);
                  } else if (swipe > swipeConfidenceThreshold) {
                    paginate(-1);
                  }
                }}
                className="absolute w-full h-full"
              >
                <img
                  src={slides[currentSlide].image}
                  alt={slides[currentSlide].title}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-center px-4 sm:px-6"
          >
            <AnimatePresence mode="wait">
              <motion.h1
                key={`title-${currentSlide}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 text-gray-900"
              >
                {slides[currentSlide].title}
              </motion.h1>
              <motion.p
                key={`desc-${currentSlide}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8 leading-relaxed"
              >
                {slides[currentSlide].description}
              </motion.p>
            </AnimatePresence>
          </motion.div>

          {/* Navigation Dots */}
          <div className="flex justify-center items-center space-x-2 mb-6 sm:mb-8">
            {slides.map((_, index) => (
              <motion.div
                key={index}
                onClick={() => {
                  const newDir = index > currentSlide ? 1 : -1;
                  setDirection(newDir);
                  setCurrentSlide(index);
                }}
                className={`h-1.5 sm:h-2 transition-all duration-300 cursor-pointer ${
                  index === currentSlide ? 'w-6 bg-purple-600' : 'w-1.5 sm:w-2 bg-gray-300'
                } rounded-full`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </div>

          {/* Buttons */}
          <div className="flex space-x-4">
            {/* Next Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 bg-purple-600 text-white py-3 rounded-2xl font-medium flex items-center justify-center space-x-2 text-sm sm:text-base"
              onClick={() => {
                if (isLastSlide) {
                  router.push('/home');
                } else {
                  paginate(1);
                }
              }}
            >
              <span>Next</span>
              <ChevronRight size={18} />
            </motion.button>
            {/* Skip Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 bg-gray-300 text-purple-600 py-3 rounded-2xl font-medium flex items-center justify-center space-x-2 text-sm sm:text-base"
              onClick={() => router.push('/dashboard')}
            >
              <span>Skip</span>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Onboarding;
