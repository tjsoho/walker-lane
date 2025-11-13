"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

type FocusCard = {
    id: number;
    title: string;
    content: string;
    image: string;
};

const focusCards: FocusCard[] = [
    {
        id: 1,
        title: "Products & Services",
        content: "We offer a full suite of financial products and services, tailored to meet the diverse needs of advisers and their clients, helping you deliver comprehensive, high-quality advice.",
        image: "/images/6.png"
    },
    {
        id: 2,
        title: "Compliance Guidance",
        content: "Stay confident with up-to-date, practical compliance support, designed to keep your practice aligned with regulations and reduce risk.",
        image: "/images/4.png"
    },
    {
        id: 3,
        title: "Professional Development & Events",
        content: "Enhance your expertise and grow your business through targeted training, workshops, and industry events curated for financial advisers.",
        image: "/images/3.png"
    },
    {
        id: 4,
        title: "Technology Solutions",
        content: "Leverage smart, user-friendly systems and tools that streamline operations, improve efficiency, and enhance client experiences.",
        image: "/images/5.png"
    },
    {
        id: 5,
        title: "Paraplanning Services",
        content: "Access expert paraplanning support to save time, reduce administrative burden, and ensure every client receives thorough, high-quality advice.",
        image: "/images/1.png"
    },
    {
        id: 6,
        title: "Regular Revenue Payments",
        content: "Enjoy predictable, reliable revenue payments, helping to support your practice's cash flow and financial stability.",
        image: "/images/2.png"
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

    const handleNext = () => {
        const nextIndex = (activeIndex + 1) % focusCards.length;
        handleCardChange(focusCards[nextIndex], nextIndex);
    };

    return (
        <section className="relative bg-white min-h-screen pb-16">
            <div className="container mx-auto px-4 md:pl-4 md:pr-0 min-h-screen">
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
                            <div className="relative flex flex-col items-center">
                                {/* Current Card Title */}
                                <motion.div
                                    key={activeIndex}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.1 }}
                                    className="text-center w-full mb-4"
                                >
                                    <h4 className="text-2xl font-medium text-brand-brown-dark font-[family-name:var(--font-tt-norms)]">
                                        {focusCards[activeIndex].title}
                                    </h4>
                                </motion.div>

                                {/* Left and Right Arrows */}
                                <div className="flex items-center justify-center gap-8 mb-4">
                                    <button
                                        onClick={handlePrev}
                                        className="p-2 text-brand-brown/60 hover:text-brand-brown transition-colors"
                                        aria-label="Previous"
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
                                                d="M15 19l-7-7 7-7"
                                            />
                                        </svg>
                                    </button>
                                    <button
                                        onClick={handleNext}
                                        className="p-2 text-brand-brown/60 hover:text-brand-brown transition-colors"
                                        aria-label="Next"
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
                                                d="M9 5l7 7-7 7"
                                            />
                                        </svg>
                                    </button>
                                </div>

                                {/* Pagination Dots */}
                                <div className="flex gap-1.5 justify-center">
                                    {focusCards.map((_, index) => (
                                        <motion.button
                                            key={index}
                                            onClick={() => handleCardChange(focusCards[index], index)}
                                            className="h-1.5 rounded-full bg-brand-brown/20"
                                            animate={{
                                                backgroundColor:
                                                    index === activeIndex
                                                        ? "var(--brand-blue)"
                                                        : "rgba(var(--brand-brown-rgb), 0.2)",
                                                width: index === activeIndex ? "24px" : "6px",
                                            }}
                                            transition={{ duration: 0.2 }}
                                        />
                                    ))}
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
                                <div className="p-6 space-y-4 ">
                                    <h4 className="text-2xl font-light font-[family-name:var(--font-kiona)] text-brand-brown-dark">
                                        {focusCards[activeIndex].title}
                                    </h4>

                                    <p className="text-base leading-relaxed font-[family-name:var(--font-tt-norms)] text-brand-brown-dark">
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
                            <div className="p-8 space-y-6 border-l border-r border-b border-brand-brown/30 rounded-b-xl ">
                                <div>
                                    <h4 className="text-3xl font-light font-[family-name:var(--font-kiona)] text-brand-brown">
                                        {focusCards[activeIndex].title}
                                    </h4>

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