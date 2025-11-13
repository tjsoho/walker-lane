"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Tooltip } from "@/components/ui/Tooltip";

export function HeroSection() {
    const [hoveredButton, setHoveredButton] = useState<"clients" | "advisors" | null>(null);

    // Simplified button variants for clearer animation
    const buttonVariants = {
        initial: { scale: 1 },
        hover: {
            scale: 1.02,
            transition: { duration: 0.2, ease: "easeInOut" },
        },
        tap: {
            scale: 0.98,
            transition: { duration: 0.1, ease: "easeInOut" },
        },
    };

    return (
        <section className="relative h-[100vh] flex items-center justify-center overflow-hidden">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0">
                <Image
                    src="/images/Group_02.jpg"
                    alt="Our Advisory Team"
                    fill
                    className="object-cover object-[center_33%]"
                    priority
                />
                <div className="absolute inset-0 bg-black/75 lg:bg-black/65" />
            </div>

            {/* User Type Selector - Desktop Only */}
            <div className="absolute top-4 left-8 z-50 hidden md:flex gap-4">
                <div className="relative">
                    <Link href="/">
                        <motion.button
                            variants={buttonVariants}
                            initial="initial"
                            whileHover="hover"
                            whileTap="tap"
                            onMouseEnter={() => setHoveredButton("clients")}
                            onMouseLeave={() => setHoveredButton(null)}
                            className="px-6 py-2 text-sm border rounded-md bg-transparent text-brand-brown-light border-brand-brown-light hover:bg-brand-brown-light/10"
                        >
                            CLIENTS
                        </motion.button>
                    </Link>
                    <Tooltip
                        text="For Individual Investors"
                        isVisible={hoveredButton === "clients"}
                        userType="clients"
                        isActive={false}
                    />
                </div>

                <div className="relative">
                    <Link href="/advisors">
                        <motion.button
                            variants={buttonVariants}
                            initial="initial"
                            whileHover="hover"
                            whileTap="tap"
                            onMouseEnter={() => setHoveredButton("advisors")}
                            onMouseLeave={() => setHoveredButton(null)}
                            className="px-6 py-2 text-sm border rounded-md bg-brand-brown-light text-brand-black border-brand-brown-light hover:bg-brand-brown-light/90"
                        >
                            ADVISERS
                        </motion.button>
                    </Link>
                    <Tooltip
                        text="For Financial Advisors"
                        isVisible={hoveredButton === "advisors"}
                        userType="advisors"
                        isActive={true}
                    />
                </div>
            </div>

            {/* Content */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="relative z-10 text-center px-4 max-w-6xl mx-auto"
            >
                <h1 className="text-4xl md:text-6xl font-light font-[family-name:var(--font-kiona)] text-white mb-6">
                    Adviser Owned. Client Focused. Results Driven.
                </h1>
                <p className="text-2xl text-white font-[family-name:var(--font-tt-norms)] max-w-2xl mx-auto">
                Helping financial advisers build successful businesses through tailored services, strategic support, and diversified investment solutions.
                </p>
            </motion.div>
        </section>
    );
} 