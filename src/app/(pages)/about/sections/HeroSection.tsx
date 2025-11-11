"use client"; // Add this at the top since framer-motion requires client-side rendering

import Image from "next/image";
import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <motion.div
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 20, ease: "easeOut" }}
          className="relative w-full h-full"
        >
          {/* move the focus point of the image to the top of the image */}

          <Image
            src="/images/Group_05.jpg"
            alt="Our Team"
            fill
            className="object-cover object-[top]"
            priority
          />
        </motion.div>
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Text Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white">
        <p className="text-lg md:text-xl tracking-[0.3em] uppercase mb-4 font-ttNorms">
          About Us
        </p>
        <h1 className="text-5xl md:text-7xl tracking-wider font-kiona">
          OUR STORY
        </h1>
      </div>
    </div>
  );
};

export default HeroSection;
