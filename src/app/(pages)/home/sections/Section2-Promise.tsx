"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function PromiseSection() {
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  return (
    <section className="relative min-h-[60vh] flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/wallet.jpeg"
          alt="Luxury Wallet"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/55" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 py-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center"
        >
          <motion.h2
            variants={textVariants}
            className="text-xl md:text-4xl font-kiona mb-8 text-brand-cream"
          >
            Think of us as your financial friends
          </motion.h2>
          <motion.div
            variants={textVariants}
            className="w-[40px] h-[1px] bg-brand-cream mx-auto mb-12"
          />

          <motion.p
            variants={textVariants}
            className="text-xl md:text-2xl text-white max-w-3xl mx-auto mb-12 leading-none"
          >
            Ready to simplify the complexities of money management so you can
            focus on what truly matters: your dreams.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
