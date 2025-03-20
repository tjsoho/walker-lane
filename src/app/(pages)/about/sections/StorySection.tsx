"use client";

import { motion } from "framer-motion";

const StorySection = () => {
  // Split text into smaller paragraphs
  const leftColumnText = [
    "At Walker Lane, we believe financial planning is more than just numbers; it's about building a life you love.",
    "We're a team of four dedicated financial advisors based in Sydney, Australia passionately committed to guiding Australians like you toward financial security.",
  ];

  const rightColumnText = [
    "We understand that navigating the complexities of finance can feel overwhelming, especially during life's pivotal moments.",
    "Whether you're a young family starting out, a mid-career professional planning for the future, approaching retirement, or already enjoying your golden years, we're here to provide personalized support and clear, actionable guidance.",
  ];

  return (
    <div className="relative w-full bg-brand-blue py-24 overflow-hidden">
 

      {/* Content Container */}
      <div className="container mx-auto px-6 max-w-6xl relative z-10 ">
        <div className="grid md:grid-cols-2 gap-12 text-white">
          {/* Left Column */}
          <div className="space-y-8">
            {leftColumnText.map((text, index) => (
              <motion.p
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="text-lg leading-relaxed font-ttNorms"
              >
                {text}
              </motion.p>
            ))}
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {rightColumnText.map((text, index) => (
              <motion.p
                key={index}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="text-lg leading-relaxed font-ttNorms"
              >
                {text}
              </motion.p>
            ))}
          </div>
        </div>

        {/* Decorative lines */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          viewport={{ once: true }}
          className="absolute -top-10 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"
        />
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          viewport={{ once: true }}
          className="absolute -bottom-10 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"
        />
      </div>

 
    </div>
  );
};

export default StorySection;
