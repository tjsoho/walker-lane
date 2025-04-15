"use client";

import { useState } from "react";
import { motion } from "framer-motion";


export function OurOfferSection() {
    const [activeOption, setActiveOption] = useState<string | null>(null);
    const [activeInclusion, setActiveInclusion] = useState<string | null>(null);

    return (
        <section className="py-40 px-4 bg-white relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-brown/20 to-transparent"></div>
            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-brown/20 to-transparent"></div>
            <div className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-transparent via-brand-brown/10 to-transparent"></div>
            <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-brand-brown/10 to-transparent"></div>

            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    viewport={{ once: true }}
                    className="mb-24"
                >
                    <h2 className="text-5xl md:text-6xl font-light font-[family-name:var(--font-kiona)] text-brand-brown tracking-wide">
                        Our Offer
                    </h2>
                    <div className="w-32 h-px bg-brand-brown mt-8"></div>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
                    {/* DIY Option Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                        viewport={{ once: true }}
                        className={`relative transition-all duration-500 ${activeOption === "diy" ? "scale-[1.02]" : ""
                            }`}
                        onMouseEnter={() => setActiveOption("diy")}
                        onMouseLeave={() => setActiveOption(null)}
                    >
                        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-brand-cream/30 to-transparent rounded-lg"></div>
                        <div className="relative p-10 border border-brand-brown/20 rounded-lg backdrop-blur-sm">
                            <div className="absolute -top-6 -left-6 w-12 h-12 bg-brand-brown flex items-center justify-center">
                                <span className="text-white text-xl font-light">01</span>
                            </div>
                            <h3 className="text-3xl font-light text-brand-brown mb-4 mt-4">Do It Yourself</h3>
                            <div className="w-16 h-px bg-brand-brown mb-8"></div>
                            <p className="text-gray-700 text-lg mb-8 leading-relaxed">
                                The DIY option is the traditional Corporate Authorised Representative model.
                            </p>
                            <div className="p-6 bg-white/80 backdrop-blur-sm border border-brand-brown/10 rounded-md">
                                <p className="text-gray-700 leading-relaxed">
                                    This option requires a minimum of $500k practice revenue and your practice must be based in Sydney, Melbourne or Brisbane CBD only.
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    {/* DIFM Option Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
                        viewport={{ once: true }}
                        className={`relative transition-all duration-500 ${activeOption === "difm" ? "scale-[1.02]" : ""
                            }`}
                        onMouseEnter={() => setActiveOption("difm")}
                        onMouseLeave={() => setActiveOption(null)}
                    >
                        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-brand-blue/10 to-transparent rounded-lg"></div>
                        <div className="relative p-10 border border-brand-brown/20 rounded-lg backdrop-blur-sm">
                            <div className="absolute -top-6 -left-6 w-12 h-12 bg-brand-brown flex items-center justify-center">
                                <span className="text-white text-xl font-light">02</span>
                            </div>
                            <h3 className="text-3xl font-light text-brand-brown mb-4 mt-4">Do It For Me</h3>
                            <div className="w-16 h-px bg-brand-brown mb-8"></div>
                            <p className="text-gray-700 text-lg mb-8 leading-relaxed">
                                With the DIFM option, Walker Lane runs your entire back office in alignment with our &apos;Design Effective&apos; compliance framework.
                            </p>
                            <div className="p-6 bg-white/80 backdrop-blur-sm border border-brand-brown/10 rounded-md">
                                <p className="text-gray-700 leading-relaxed mb-4">
                                    We do it for you, whilst keeping you safe and allowing you to focus on what you do best - spending time with clients.
                                </p>
                                <p className="text-gray-700 leading-relaxed">
                                    Your practice can be based anywhere in Australia and will typically have under $500k of revenue.
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* DIFM Inclusions */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
                    viewport={{ once: true }}
                    className="mt-16"
                >
                    <div className="flex items-center mb-12">
                        <h3 className="text-3xl font-light text-brand-brown">*Do It For Me - Inclusions</h3>
                        <div className="flex-grow h-px bg-gradient-to-r from-brand-brown/20 to-transparent ml-8"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {/* Pre-advice */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
                            viewport={{ once: true }}
                            className={`relative p-8 border border-brand-brown/10 rounded-lg transition-all duration-500 ${activeInclusion === "pre-advice" ? "border-brand-brown/30 shadow-lg" : ""
                                }`}
                            onMouseEnter={() => setActiveInclusion("pre-advice")}
                            onMouseLeave={() => setActiveInclusion(null)}
                        >
                            <div className="absolute top-0 right-0 w-16 h-16 bg-brand-cream/50 rounded-bl-lg"></div>
                            <h4 className="text-xl font-light text-brand-brown mb-6">Pre-advice</h4>
                            <ul className="space-y-4 text-gray-700">
                                <li className="flex items-start">
                                    <span className="text-brand-blue mr-3 mt-1">•</span>
                                    <span className="leading-relaxed">Fact Find: data entry of client&apos;s details into Xplan to create the fact find/client data form (CDF)</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-brand-blue mr-3 mt-1">•</span>
                                    <span className="leading-relaxed">Super and Investment: Creation of the Wealth Solver scenario including existing vs recommended product research, asset allocation and fees</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-brand-blue mr-3 mt-1">•</span>
                                    <span className="leading-relaxed">Personal Insurance: Creation of Risk Researcher scenario including the insurance needs analysis, quoting and research across all available insurers</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-brand-blue mr-3 mt-1">•</span>
                                    <span className="leading-relaxed">Financial Projections/Modelling: producing financial projections in Xtools, including impact of insurance premiums on super balance</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-brand-blue mr-3 mt-1">•</span>
                                    <span className="leading-relaxed">Like for like insurance comparison between existing and recommended insurer.</span>
                                </li>
                            </ul>
                        </motion.div>

                        {/* Statement of Advice */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.6 }}
                            viewport={{ once: true }}
                            className={`relative p-8 border border-brand-brown/10 rounded-lg transition-all duration-500 ${activeInclusion === "soa" ? "border-brand-brown/30 shadow-lg" : ""
                                }`}
                            onMouseEnter={() => setActiveInclusion("soa")}
                            onMouseLeave={() => setActiveInclusion(null)}
                        >
                            <div className="absolute top-0 right-0 w-16 h-16 bg-brand-cream/50 rounded-bl-lg"></div>
                            <h4 className="text-xl font-light text-brand-brown mb-6">Statement of Advice Generation & Compliance</h4>
                            <ul className="space-y-4 text-gray-700">
                                <li className="flex items-start">
                                    <span className="text-brand-blue mr-3 mt-1">•</span>
                                    <span className="leading-relaxed">We will write the statement of advice, ready for presentation to your clients</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-brand-blue mr-3 mt-1">•</span>
                                    <span className="leading-relaxed">The SOA will be produced to comply with your legal obligations and the Walker Lane licensee standards.</span>
                                </li>
                            </ul>
                        </motion.div>

                        {/* Implementation */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.7 }}
                            viewport={{ once: true }}
                            className={`relative p-8 border border-brand-brown/10 rounded-lg transition-all duration-500 ${activeInclusion === "implementation" ? "border-brand-brown/30 shadow-lg" : ""
                                }`}
                            onMouseEnter={() => setActiveInclusion("implementation")}
                            onMouseLeave={() => setActiveInclusion(null)}
                        >
                            <div className="absolute top-0 right-0 w-16 h-16 bg-brand-cream/50 rounded-bl-lg"></div>
                            <h4 className="text-xl font-light text-brand-brown mb-6">Implementation</h4>
                            <ul className="space-y-4 text-gray-700">
                                <li className="flex items-start">
                                    <span className="text-brand-blue mr-3 mt-1">•</span>
                                    <span className="leading-relaxed">Generation and submission of product applications for your clients</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-brand-blue mr-3 mt-1">•</span>
                                    <span className="leading-relaxed">Communicating and following up outstanding requirements such as medical tests and financial requirements</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-brand-blue mr-3 mt-1">•</span>
                                    <span className="leading-relaxed">Processing superannuation rollovers and investing the funds in line with the recommendations</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-brand-blue mr-3 mt-1">•</span>
                                    <span className="leading-relaxed">Processing ATO forms, plus &quot;choice of super fund&quot; documents for the client&apos;s future employer super contributions.</span>
                                </li>
                            </ul>
                        </motion.div>

                        {/* Review */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.8 }}
                            viewport={{ once: true }}
                            className={`relative p-8 border border-brand-brown/10 rounded-lg transition-all duration-500 ${activeInclusion === "review" ? "border-brand-brown/30 shadow-lg" : ""
                                }`}
                            onMouseEnter={() => setActiveInclusion("review")}
                            onMouseLeave={() => setActiveInclusion(null)}
                        >
                            <div className="absolute top-0 right-0 w-16 h-16 bg-brand-cream/50 rounded-bl-lg"></div>
                            <h4 className="text-xl font-light text-brand-brown mb-6">Review</h4>
                            <ul className="space-y-4 text-gray-700">
                                <li className="flex items-start">
                                    <span className="text-brand-blue mr-3 mt-1">•</span>
                                    <span className="leading-relaxed">Preparation of review packs for annual client reviews</span>
                                </li>
                            </ul>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
} 