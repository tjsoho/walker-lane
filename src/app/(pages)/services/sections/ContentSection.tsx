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
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative h-[600px] w-[95%] mx-auto"
          >
            <Image
              src="/images/meeting.jpg"
              alt="Financial planning meeting"
              fill
              className="object-cover rounded-2xl shadow-2xl"
              priority
            />
            {/* Decorative elements */}
            <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl" />
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl" />
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
                className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 font-[family-name:var(--font-tt-norms)]"
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
