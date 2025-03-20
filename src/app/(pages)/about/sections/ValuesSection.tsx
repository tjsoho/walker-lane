"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface Value {
  title: string;
  description: string;
}

const values: Value[] = [
  {
    title: "FREEDOM",
    description:
      "We empower you to make choices aligned with your aspirations, whether it's retiring early or pursuing a lifelong passion.",
  },
  {
    title: "HONESTY",
    description:
      "We believe in transparent communication, even when delivering difficult truths. Your trust is our utmost priority.",
  },
  {
    title: "TRUST & INTEGRITY",
    description:
      "Your confidentiality is sacrosanct. We always act in your best interests, even when it's not the easiest path.",
  },
  {
    title: "PROFESSIONALISM",
    description:
      "We maintain high standards of service, ensuring timely communication and delivering on our commitments without compromise.",
  },
  {
    title: "ACCOUNTABILITY",
    description:
      "We guide you through every step of the process, ensuring you're fully informed and empowered to achieve your goals.",
  },
];

const ThinArrowLeft = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    className="h-96 w-auto"
    style={{ width: "32px" }}
    stroke="currentColor"
    strokeWidth="0.5"
  >
    <path
      d="M19 12H5M12 19l-7-7 7-7"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ThinArrowRight = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    className="h-96 w-auto"
    style={{ width: "32px" }}
    stroke="currentColor"
    strokeWidth="0.5"
  >
    <path
      d="M5 12h14M12 5l7 7-7 7"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ValuesSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 100 : -100,
      opacity: 0,
      scale: 0.95,
    }),
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex + newDirection;
      if (nextIndex < 0) return values.length - 1;
      if (nextIndex >= values.length) return 0;
      return nextIndex;
    });
  };

  useEffect(() => {
    const timer = setInterval(() => {
      paginate(1);
    }, 5000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  return (
    <div className="relative w-full overflow-hidden h-[80vh]">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/merc.png"
          alt="Luxury interior"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center">
        <div className="w-full max-w-7xl mx-auto px-5">
          <div className="text-center">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-white text-lg md:text-xl tracking-[0.3em] uppercase font-ttNorms"
            >
              OUR GUIDING PRINCIPLES
            </motion.p>
          </div>

          <div className="relative flex items-center justify-center">
            {/* Left Arrow */}
            <button
              onClick={() => paginate(-1)}
              className="absolute left-5 md:left-0 z-20 text-white/80 hover:text-white transition-all duration-300 hover:scale-110 hover:-translate-x-1"
              aria-label="Previous slide"
            >
              <ThinArrowLeft />
            </button>

            {/* Slides Container */}
            <div className="relative w-full max-w-4xl min-h-[250px] flex items-center justify-center px-16">
              <AnimatePresence initial={false} custom={direction}>
                <motion.div
                  key={currentIndex}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 200, damping: 30 },
                    opacity: { duration: 0.5 },
                    scale: { duration: 0.5 },
                  }}
                  className="absolute w-full text-center"
                >
                  <motion.h2
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-white text-4xl md:text-6xl mb-6 font-kiona tracking-wider"
                  >
                    {values[currentIndex].title}
                  </motion.h2>
                  <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="text-white/90 text-lg md:text-xl max-w-2xl mx-auto font-ttNorms leading-relaxed"
                  >
                    {values[currentIndex].description}
                  </motion.p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right Arrow */}
            <button
              onClick={() => paginate(1)}
              className="absolute right-5 md:right-0 z-20 text-white/80 hover:text-white transition-all duration-300 hover:scale-110 hover:translate-x-1"
              aria-label="Next slide"
            >
              <ThinArrowRight />
            </button>
          </div>

          {/* Pagination dots */}
          <div className="mt-12 flex justify-center gap-3">
            {values.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1);
                  setCurrentIndex(index);
                }}
                className={`w-2 h-2 rounded-full transition-all duration-500 ${
                  index === currentIndex ? "bg-white w-6" : "bg-white/50"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ValuesSection;
