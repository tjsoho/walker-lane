"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

type FocusCard = {
    id: number;
    title: string;
    subtitle: string;
    content: string;
    image: string;
};

const focusCards: FocusCard[] = [
    {
        id: 1,
        title: "Products & Services",
        subtitle: "Comprehensive Solutions",
        content: "We offer a full suite of financial products and services, tailored to meet the diverse needs of advisers and their clients, helping you deliver comprehensive, high-quality advice.",
        image: "/images/client7.png"
    },
    {
        id: 2,
        title: "Compliance Guidance",
        subtitle: "Stay Confident",
        content: "Stay confident with up-to-date, practical compliance support, designed to keep your practice aligned with regulations and reduce risk.",
        image: "/images/client9.png"
    },
    {
        id: 3,
        title: "Professional Development & Events",
        subtitle: "Enhance Your Expertise",
        content: "Enhance your expertise and grow your business through targeted training, workshops, and industry events curated for financial advisers.",
        image: "/images/client1.png"
    },
    {
        id: 4,
        title: "Technology Solutions",
        subtitle: "Streamline Operations",
        content: "Leverage smart, user-friendly systems and tools that streamline operations, improve efficiency, and enhance client experiences.",
        image: "/images/client5.png"
    },
    {
        id: 5,
        title: "Paraplanning Services",
        subtitle: "Expert Support",
        content: "Access expert paraplanning support to save time, reduce administrative burden, and ensure every client receives thorough, high-quality advice.",
        image: "/images/success.png"
    },
    {
        id: 6,
        title: "Regular Revenue Payments",
        subtitle: "Financial Stability",
        content: "Enjoy predictable, reliable revenue payments, helping to support your practice's cash flow and financial stability.",
        image: "/images/client7.png"
    }
];

export function ClientFocusSection() {
    const [activeCard, setActiveCard] = useState<number>(1);
    const [activeIndex, setActiveIndex] = useState(0);

    const handleCardChange = (card: FocusCard, index: number) => {
        setActiveCard(card.id);
        setActiveIndex(index);
    };



    const handlePrev = () => {
        const prevIndex = activeIndex === 0 ? focusCards.length - 1 : activeIndex - 1;
        handleCardChange(focusCards[prevIndex], prevIndex);
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
                                <h3 className="text-3xl md:text-4xl font-light leading-tight font-[family-name:var(--font-kiona)] text-brand-brown-dark text-center md:text-left">
                                    What we provide
                                </h3>
                                <p className="text-lg mt-4 tracking-wider mb-6 font-[family-name:var(--font-tt-norms)] text-brand-brown-dark text-center md:text-left">
                                    At Walker Lane, we understand that financial advisers need dealer groups that deliver meaningful support and real results. <br></br> <br></br>Our focus is helping you stay competitive by providing a comprehensive suite of solutions, maintaining strong, current compliance, and offering streamlined systems to make your practice more efficient.
                                </p>
                            </motion.div>
                        </div>

                        {/* Desktop Menu */}
                        <div className="hidden md:block space-y-6 relative">
                            <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-brand-brown/30"></div>
                            {focusCards.map((card, index) => (
                                <button
                                    key={card.id}
                                    onClick={() => handleCardChange(card, index)}
                                    className={`text-left w-full py-2 border-l-2 pl-6 transition-all duration-300 font-[family-name:var(--font-tt-norms)] text-brand-brown-dark ${activeCard === card.id
                                        ? "border-brand-blue font-medium"
                                        : "border-transparent hover:border-gray-300"
                                        }`}
                                >
                                    {card.title}
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

                                {/* Current and Next Card Titles */}
                                <div className="relative w-full text-center px-4">
                                    <div className="overflow-hidden flex flex-col items-center">
                                        {/* Current Card */}
                                        <motion.div
                                            key={activeIndex}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -20 }}
                                            transition={{ duration: 0.1 }}
                                            className="text-center mb-2 w-full"
                                        >
                                            <h4 className="text-2xl font-medium text-brand-brown-dark font-[family-name:var(--font-tt-norms)] px-8">
                                                {focusCards[activeIndex].title}
                                            </h4>
                                        </motion.div>

                                        {/* Next Card Preview */}
                                        <motion.div
                                            key={`next-${activeIndex}`}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="text-center text-sm text-brand-brown/40 w-full px-8"
                                        >
                                            {focusCards[(activeIndex + 1) % focusCards.length].title}
                                        </motion.div>
                                    </div>

                                    {/* Right-side Pagination */}
                                    <div className="absolute right-0 top-1/2 -translate-y-1/2 flex flex-col gap-1.5">
                                        {focusCards.map((_, index) => (
                                            <motion.button
                                                key={index}
                                                onClick={() => handleCardChange(focusCards[index], index)}
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
                            </div>

                            {/* Content Card - Moved up and centered */}
                            <motion.div
                                key={activeCard}
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
                                            src={focusCards[activeIndex].image}
                                            alt={focusCards[activeIndex].title}
                                            fill
                                            className="object-cover"
                                            priority
                                        />
                                    </motion.div>
                                </div>
                                <div className="p-6 space-y-4">
                                    <h4 className="text-2xl font-light font-[family-name:var(--font-kiona)] text-brand-brown">
                                        {focusCards[activeIndex].title}
                                    </h4>
                                    <h5 className="text-xl text-brand-brown/80">
                                        {focusCards[activeIndex].subtitle}
                                    </h5>
                                    <p className="text-base leading-relaxed font-[family-name:var(--font-tt-norms)] text-brand-brown">
                                        {focusCards[activeIndex].content}
                                    </p>
                                </div>
                            </motion.div>
                        </div>
                    </div>

                    {/* Right Content Card */}
                    <div className="hidden md:block md:col-span-8 lg:col-span-8 ml-12 pt-24">
                        <motion.div
                            key={activeCard}
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
                                    src={focusCards[activeIndex].image}
                                    alt={focusCards[activeIndex].title}
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            </div>
                            <div className="p-8 space-y-6">
                                <div>
                                    <h4 className="text-3xl font-light font-[family-name:var(--font-kiona)] text-brand-brown">
                                        {focusCards[activeIndex].title}
                                    </h4>
                                    <h5 className="text-xl text-brand-brown/80 mt-2">
                                        {focusCards[activeIndex].subtitle}
                                    </h5>
                                </div>
                                <p className="text-lg leading-relaxed font-[family-name:var(--font-tt-norms)] text-brand-brown">
                                    {focusCards[activeIndex].content}
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
} 