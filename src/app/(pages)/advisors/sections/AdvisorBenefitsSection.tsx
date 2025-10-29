"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

type BenefitItem = {
    id: string;
    title: string;
    subtitle: string;
    content: string[];
    image: string;
};

const benefitItems: BenefitItem[] = [
    {
        id: "built-by-advisers",
        title: "Adviser Benefits",
        subtitle: "Built By Advisers, For Advisers",
        content: [
            "Walker Lane is an Australian Financial Services Licencee (AFSL) that was built by Financial Advisers who wanted to provide a professional AFSL service with other like-minded professionals.",
            "We believe in the power of community. That's why it's important to us that we partner with the right business and advice leaders who are culturally aligned, share similar values, and believe great advice changes lives."
        ],
        image: "/images/benefits.png"
    },
    {
        id: "business-processes",
        title: "Better Business",
        subtitle: "Processes",
        content: [
            "Our partnering advisers can benefit from a reliable, high-quality investment process and managed account solution, allowing you to operate more competitively whilst experiencing less time pressure. Our AFSL was built to ensure advisers can access the support of a professional and experienced management, professional standards and compliance team."
        ],
        image: "/images/systems.png"
    },
    {
        id: "community",
        title: "A Sense of",
        subtitle: "Community",
        content: [
            "At Walker Lane, we have a strong sense of community and foster this by running a range of events throughout the year for our Advisers.",
            "Events include Investment MasterClasses to assist in professional development, an annual conference, social events, as well as weekly online catch-up meetings with Walker Lane Management."
        ],
        image: "/images/community.png"
    },
    {
        id: "investment-solutions",
        title: "Investment",
        subtitle: "Solutions",
        content: [
            "Our approved product list is extensive, containing many major retail insurance providers and mainstream wrap administration platforms. Advisers are able to develop the strategies and use the products that you believe delivers the best possible outcome for your clients.",
            "Walker Lane have a number of Managed Accounts which are available on various platforms."
        ],
        image: "/images/solutions.png"
    },
    {
        id: "investment-beliefs",
        title: "Investment",
        subtitle: "Beliefs",
        content: [
            "At Walker Lane you'll find a community of Financial Advisers that sticks to a simple, high quality investment philosophy.",
            "We do our own research on all aspects of the portfolio management process, plus bring in specialists where required.",
            "We don't compromise on outcomes, and always act in our clients' best interests."
        ],
        image: "/images/processes.png"
    },
    {
        id: "investment-proposition",
        title: "Investment",
        subtitle: "Proposition",
        content: [
            "As THE managed account specialists, we currently run a suite of managed accounts to fit different investor risk profiles including:",
            "- Dynamic Asset Allocation (DAA) Portfolios",
            "- Strategic Asset Allocation (SAA) Portfolios",
            "- ESG Portfolios (coming soon)"
        ],
        image: "/images/proposition.png"
    },
    {
        id: "compliance",
        title: "Best Interests Duty and",
        subtitle: "Compliance",
        content: [
            "We are experts in this space – we know how to keep you safe and where danger sits in relation to your core legal obligations, plus specific regulations related to personal financial advice."
        ],
        image: "/images/compliance.png"
    }
];

export function AdvisorBenefitsSection() {
    const [hoveredItem, setHoveredItem] = useState<string | null>(null);

    return (
        <section className="py-32 px-4 bg-white">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <h2 className="text-4xl md:text-5xl font-light font-[family-name:var(--font-kiona)] text-brand-brown mb-6 tracking-wide">
                        Why choose walker lane
                    </h2>
                    <p className="text-lg mt-4 tracking-wider mb-6 font-[family-name:var(--font-tt-norms)] text-brand-brown-dark text-center md:text-left max-w-4xl mx-auto">At Walker Lane, we know what it takes to succeed as a financial adviser because we’ve lived it ourselves. Drawing on decades of industry experience, we’ve built a firm that equips advisers with the guidance, resources, and strategies needed to grow their businesses with confidence.</p>
                    <div className="w-24 h-0.5 bg-brand-brown mx-auto"></div>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {benefitItems.slice(0, 3).map((item) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                            viewport={{ once: true }}
                            className="relative group"
                            onMouseEnter={() => setHoveredItem(item.id)}
                            onMouseLeave={() => setHoveredItem(null)}
                        >
                            <div className="relative h-[400px] rounded-lg overflow-hidden cursor-pointer transition-all duration-500">
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    priority
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/70 to-black/20 opacity-0 transition-opacity duration-500 group-hover:opacity-80"></div>

                                <div className="absolute bottom-0 left-0 right-0 p-6 transform transition-transform duration-500">
                                    <h3 className="text-xl font-medium text-white mb-1">{item.title}</h3>
                                    <h4 className="text-base text-white/80 mb-3">{item.subtitle}</h4>

                                    <AnimatePresence>
                                        {hoveredItem === item.id && (
                                            <motion.div
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: "auto" }}
                                                exit={{ opacity: 0, height: 0 }}
                                                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                                                className="overflow-hidden"
                                            >
                                                <div className="space-y-2 text-white/90 text-sm">
                                                    {item.content.map((paragraph, index) => (
                                                        <p key={index} className="leading-relaxed">
                                                            {paragraph}
                                                        </p>
                                                    ))}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>

                            <motion.div
                                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{
                                    opacity: hoveredItem === item.id ? 1 : 0.7,
                                    scale: hoveredItem === item.id ? 1 : 0.8
                                }}
                                transition={{ duration: 0.3 }}
                            >
                                <svg
                                    className={`w-4 h-4 text-white transition-transform duration-300 ${hoveredItem === item.id ? "rotate-45" : ""}`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                            </motion.div>
                        </motion.div>
                    ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
                    {benefitItems.slice(3).map((item) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                            viewport={{ once: true }}
                            className="relative group"
                            onMouseEnter={() => setHoveredItem(item.id)}
                            onMouseLeave={() => setHoveredItem(null)}
                        >
                            <div className="relative h-[400px] rounded-lg overflow-hidden cursor-pointer transition-all duration-500">
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    priority
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-80"></div>

                                <div className="absolute bottom-0 left-0 right-0 p-6 transform transition-transform duration-500">
                                    <h3 className="text-xl font-medium text-white mb-1">{item.title}</h3>
                                    <h4 className="text-base text-white/80 mb-3">{item.subtitle}</h4>

                                    <AnimatePresence>
                                        {hoveredItem === item.id && (
                                            <motion.div
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: "auto" }}
                                                exit={{ opacity: 0, height: 0 }}
                                                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                                                className="overflow-hidden"
                                            >
                                                <div className="space-y-2 text-white/90 text-sm">
                                                    {item.content.map((paragraph, index) => (
                                                        <p key={index} className="leading-relaxed">
                                                            {paragraph}
                                                        </p>
                                                    ))}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>

                            <motion.div
                                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{
                                    opacity: hoveredItem === item.id ? 1 : 0.7,
                                    scale: hoveredItem === item.id ? 1 : 0.8
                                }}
                                transition={{ duration: 0.3 }}
                            >
                                <svg
                                    className={`w-4 h-4 text-white transition-transform duration-300 ${hoveredItem === item.id ? "rotate-45" : ""}`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                            </motion.div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
