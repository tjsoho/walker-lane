"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function ContentSection() {
  const paragraphs = [
    "Your financial journey is unique, and your financial strategy should be too. At Walker Lane, we provide personalized financial planning and investment management tailored to your specific needs and goals.",
    "Whether you're a young professional strategically investing your first substantial savings, or a seasoned executive optimizing your portfolio for growth, we're here to help.",
    "For high-net-worth individuals seeking sophisticated wealth preservation strategies, we offer the expertise and dedication to help you reach your financial aspirations.",
    "We take a holistic approach, ensuring that your financial plan aligns seamlessly with your lifestyle and long-term objectives.",
  ];

  return (
    <section className="py-24 px-4 bg-brand-blue">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-16 items-center"
        >
          {/* Left side image */}
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative h-[600px] w-[95%] mx-auto overflow-hidden rounded-xl"
          >
            <motion.div
              initial={{ scale: 1.2 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 10, ease: "easeOut" }}
              viewport={{ once: true }}
              className="absolute inset-0"
            >
              <Image
                src="/images/windyRoad1.jpg"
                alt="Financial planning meeting"
                fill
                className="object-cover"
                priority
              />
            </motion.div>
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/20" />
            {/* Decorative elements */}
            <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-brand-brown-dark/80 rounded-full blur-2xl" />
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-brand-brown-dark/10 rounded-full blur-2xl" />
          </motion.div>

          {/* Right side text content */}
          <div className="space-y-8">
            {paragraphs.map((text, index) => (
              <motion.p
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="text-lg leading-relaxed text-gray-700 dark:text-white font-[family-name:var(--font-tt-norms)]"
              >
                {text}
              </motion.p>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
