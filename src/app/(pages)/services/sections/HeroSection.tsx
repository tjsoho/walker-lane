"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function HeroSection() {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center px-4 py-20">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/sydney.jpg"
          alt="Abstract background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50 backdrop-blur-[10%]"></div>
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-4xl mx-auto text-center"
      >
        <h1 className="text-5xl md:text-7xl font-bold mb-6 font-[family-name:var(--font-geist-sans)] text-white">
          Our Services
        </h1>
        <p className="text-xl text-gray-200 font-ttNorms">
          Discover what we can do for you
        </p>
      </motion.div>
    </section>
  );
}
