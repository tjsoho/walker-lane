"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

type ServiceItem = {
  id: string;
  title: string;
  description: string;
  image: string;
};

export function OurWorkSection() {
  const services: ServiceItem[] = [
    {
      id: "portfolio",
      title: "Investment Strategy & Portfolio Management",
      description:
        "We'll partner with you to create a tailored investment strategy that reflects your goals, preferences, and comfort with risk. Our approach combines careful risk management with smart diversification—using a strategic mix of local and international investments managed by specialists across different markets and styles.",
      image: "/images/1.png",
    },
    // {
    //   id: "debt-cashflow",
    //   title: "Debt & Cashflow",
    //   description:
    //     "We optimize your finances by strategically managing debt and cash flow to achieve your financial objectives.",
    //   image: "/images/2.png",
    // },
    {
      id: "strategic-planning",
      title: "Retirement Planning",
      description:
        "We're passionate about helping you achieve the retirement you've always envisioned. We start by understanding your ideal lifestyle, then carefully consider every factor to build a plan that gives you confidence and comfort in your retirement years.",
      image: "/images/3.png",
    },
    {
      id: "protection",
      title: "Protection",
      description:
        "Life is unpredictable. Without proper protection, unexpected events can devastate your family both emotionally and financially. We'll help you build a safety net that protects your loved ones and secures the future you've planned for—no matter what life brings.",
      image: "/images/4.png",
    },
    {
      id: "smsf-super",
      title: "SMSF & Super",
      description:
        "For most Australians, superannuation represents their biggest financial asset and primary retirement income source, plus it's one of the smartest tax strategies available for growing your wealth.",
      image: "/images/5.png",
    },
    {
      id: "estate-planning",
      title: "Intergenerational Wealth Management",
      description:
        "Passing wealth between generations is complex and emotional—you shouldn't navigate it alone. We manage family dynamics, competing interests, and the practical transfer of assets at the right time, in the right way—while empowering the next generation to take ownership.",
      image: "/images/6.png",
    },
  ];

  const [activeService, setActiveService] = useState(services[0]);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleServiceChange = (service: ServiceItem, index: number) => {
    setActiveService(service);
    setActiveIndex(index);
  };

  const handleNext = () => {
    const nextIndex = (activeIndex + 1) % services.length;
    handleServiceChange(services[nextIndex], nextIndex);
  };

  const handlePrev = () => {
    const prevIndex = activeIndex === 0 ? services.length - 1 : activeIndex - 1;
    handleServiceChange(services[prevIndex], prevIndex);
  };

  return (
    <section className="relative bg-brand-cream min-h-screen">
      <div className="container mx-auto pl-4 pr-0 min-h-screen">
        <div className="grid md:grid-cols-12 gap-8 lg:gap-24">
          {/* Left Side - Header and Menu */}
          <div className="md:col-span-4 lg:col-span-4 pt-16 space-y-8">
            {/* Section Header */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 0.5, y: 0 }}
                transition={{ duration: 0.2 }}
                viewport={{ once: true }}
              >
                <h2 className="text-sm uppercase tracking-wider mb-6 font-kiona text-brand-brown-dark text-center md:text-left">
                  Our Work
                </h2>
                <h3 className="text-3xl md:text-4xl font-light leading-tight font-[family-name:var(--font-kiona)] text-brand-brown-dark text-center md:text-left">
                  Advice to help guide our clients and manage complexity
                </h3>
              </motion.div>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:block space-y-6 relative">
              <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-brand-brown/30"></div>
              {services.map((service) => (
                <button
                  key={service.id}
                  onClick={() => setActiveService(service)}
                  className={`text-left w-full py-2 border-l-2 pl-6 transition-all duration-300 font-inter font-light tracking-wide text-brand-brown-dark ${activeService.id === service.id
                    ? "border-brand-blue "
                    : "border-transparent hover:border-gray-300"
                    }`}
                >
                  {service.title}
                </button>
              ))}
            </div>

            {/* Mobile Layout */}
            <div className="md:hidden flex flex-col gap-8 pb-12">
              {/* Mobile Menu Carousel */}
              <div className="relative h-[140px] flex items-center">
                {/* Up Arrow */}
                <button
                  onClick={handlePrev}
                  className="absolute top-0 left-1/2 -translate-x-1/2 p-2 text-brand-brown/60 hover:text-brand-brown z-10"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M5 15l7-7 7 7"
                    />
                  </svg>
                </button>

                {/* Current and Next Service Titles */}
                <div className="relative w-full text-center px-4">
                  <div className="overflow-hidden flex flex-col items-center">
                    {/* Current Service */}
                    <motion.div
                      key={activeIndex}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.1 }}
                      className="text-center mb-2 w-full"
                    >
                      <h4 className="text-2xl font-medium text-brand-brown-dark font-[family-name:var(--font-tt-norms)] px-8">
                        {activeService.title}
                      </h4>
                    </motion.div>

                    {/* Next Service Preview */}
                    <motion.div
                      key={`next-${activeIndex}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center text-sm text-brand-brown/40 w-full px-8"
                    >
                      {services[(activeIndex + 1) % services.length].title}
                    </motion.div>
                  </div>

                  {/* Right-side Pagination */}
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 flex flex-col gap-1.5">
                    {services.map((_, index) => (
                      <motion.button
                        key={index}
                        onClick={() =>
                          handleServiceChange(services[index], index)
                        }
                        className="w-1.5 h-6 rounded-full bg-brand-brown/20"
                        animate={{
                          backgroundColor:
                            index === activeIndex
                              ? "var(--brand-blue)"
                              : "rgba(var(--brand-brown-rgb), 0.2)",
                          width: index === activeIndex ? "2px" : "1.5px",
                        }}
                        transition={{ duration: 0.2 }}
                      />
                    ))}
                  </div>
                </div>

                {/* Down Arrow */}
                <button
                  onClick={handleNext}
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 p-2 text-brand-brown/60 hover:text-brand-brown z-10"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
              </div>

              {/* Content Card - Moved up and centered */}
              <motion.div
                key={activeService.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-lg shadow-sm mx-4"
              >
                <div className="relative h-[250px] w-full overflow-hidden rounded-t-lg">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={activeService.image}
                      alt={activeService.title}
                      fill
                      className="object-cover"
                      priority
                    />
                  </motion.div>
                </div>
                <div className="p-6 space-y-4">
                  <h4 className="text-2xl font-light font-[family-name:var(--font-kiona)] text-brand-brown-dark">
                    {activeService.title}
                  </h4>
                  <p className="text-base leading-relaxed font-[family-name:var(--font-tt-norms)] text-brand-brown-dark">
                    {activeService.description}
                  </p>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Right Content Card */}
          <div className="hidden md:block md:col-span-8 lg:col-span-8 ml-12 pt-24">
            <motion.div
              key={activeService.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
                opacity: { duration: 0.6 }
              }}
              className="bg-white rounded-lg shadow-sm"
            >
              <div className="relative h-[300px] w-full overflow-hidden rounded-t-lg">
                <Image
                  src={activeService.image}
                  alt={activeService.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="p-8 space-y-6">
                <h4 className="text-3xl font-light font-[family-name:var(--font-kiona)] text-brand-brown-dark">
                  {activeService.title}
                </h4>
                <p className="text-lg leading-relaxed font-[family-name:var(--font-tt-norms)] text-brand-brown-dark">
                  {activeService.description}
                </p>
              </div>
            </motion.div>
          </div>

          {/* Mobile Content Card */}
          <div className="md:hidden">
            <motion.div
              key={activeService.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
                opacity: { duration: 0.6 }
              }}
              className="bg-white rounded-lg shadow-sm mx-4"
            >
              <div className="relative h-[250px] w-full overflow-hidden rounded-t-lg">
                <Image
                  src={activeService.image}
                  alt={activeService.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="p-6 space-y-4">
                <h4 className="text-2xl font-light font-[family-name:var(--font-kiona)] text-brand-brown">
                  {activeService.title}
                </h4>
                <p className="text-base leading-relaxed font-[family-name:var(--font-tt-norms)] text-brand-brown">
                  {activeService.description}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
