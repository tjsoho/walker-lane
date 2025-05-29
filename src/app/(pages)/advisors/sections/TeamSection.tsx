"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface Advisor {
    id: number;
    name: string;
    role: string;
    bio: string;
    image: string;
    expertise: string[];
}

const advisors: Advisor[] = [
    {
        id: 1,
        name: "Joshua Cratchley",
        role: "Chief Executive Officer",
        bio: "Joshua Cratchley has been advising clients in financial services for the better part of two decades. Previously an Accountant, Josh became a financial adviser in 2010 and started Plenary Wealth in 2013. In mid-2018 Josh helped establish Walker Lane and has been acting as the Chief Financial Officer whilst continuing to advise clients at Plenary Wealth.",
        image: "/images/josh.jpg",
        expertise: ["Financial Planning", "Wealth Management", "Business Strategy"]
    },
    {
        id: 2,
        name: "Patrick Casey",
        role: "Chairman",
        bio: "Pat Casey has extensive experience working within Australian Financial Services Licensees across multiple channels, having previously held executive roles within the wealth management and financial planning divisions of Colonial First State and the Suncorp Group. Based on his extensive industry experience, Pat has a strong understanding of operating an AFSL. Currently, Pat is the owner and Managing Director of Assure Wealth.",
        image: "/images/pat.jpg",
        expertise: ["Executive Leadership", "Financial Services", "Business Development"]
    },
    {
        id: 3,
        name: "Sam Carroll",
        role: "Responsible Manager",
        bio: "Sam Carroll has over 15 years of experience working in a family-founded financial planning practice of 24 years. He has first-hand experience in the considerations and challenges of succession planning in financial planning businesses having fully succeeded his father in 2019. Sam is a Responsible Manager on the Walker Lane license and where he passionately works to grow the Walker Lane family of successful advice businesses.",
        image: "/images/sam.jpg",
        expertise: ["Succession Planning", "Business Growth", "Financial Advice"]
    }
];

export function TeamSection() {
    return (
        <section className="py-24 px-4">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-light font-[family-name:var(--font-kiona)] text-brand-brown mb-6">
                        Our Leadership Team
                    </h2>
                    <p className="text-lg text-brand-brown/80 font-[family-name:var(--font-tt-norms)] max-w-2xl mx-auto">
                        Meet our experienced team of professionals who are dedicated to delivering exceptional financial advice
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {advisors.map((advisor, index) => (
                        <motion.div
                            key={advisor.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-white rounded-xl shadow-sm overflow-hidden"
                        >
                            <div className="relative h-64">
                                <Image
                                    src={advisor.image}
                                    alt={advisor.name}
                                    fill
                                    className="object-cover object-[center_15%]"
                                />
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-medium text-brand-brown mb-1">{advisor.name}</h3>
                                <p className="text-brand-blue mb-4">{advisor.role}</p>
                                <p className="text-brand-brown/70 mb-4">{advisor.bio}</p>
                                <div className="flex flex-wrap gap-2">
                                    {advisor.expertise.map((skill) => (
                                        <span
                                            key={skill}
                                            className="px-3 py-1 bg-brand-blue/10 text-brand-blue rounded-full text-sm"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
} 