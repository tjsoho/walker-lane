"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export function OurOfferSection() {
    const [activeOption, setActiveOption] = useState<string | null>(null);
    const [activeInclusion, setActiveInclusion] = useState<string | null>(null);

    return (
        <section className="py-32 px-4 bg-white relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-brown/10 to-transparent"></div>
            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-brown/10 to-transparent"></div>
            <div className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-transparent via-brand-brown/5 to-transparent"></div>
            <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-brand-brown/5 to-transparent"></div>

            <div className="max-w-7xl mx-auto">
                {/* Editorial Header */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        viewport={{ once: true }}
                        className="lg:col-span-4"
                    >
                        <h2 className="text-4xl md:text-5xl font-light font-[family-name:var(--font-kiona)] text-brand-brown tracking-wide">
                            Our Offer
                        </h2>
                        <div className="w-24 h-px bg-brand-brown mt-6"></div>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                        viewport={{ once: true }}
                        className="lg:col-span-8"
                    >
                        <p className="text-brand-brown-dark text-lg leading-relaxed">
                            Walker Lane offers two distinct pathways for financial advisers seeking a professional AFSL service. Each option is designed to align with different business models and growth aspirations.
                        </p>
                    </motion.div>
                </div>

                {/* Main Options */}
                <div className="relative mb-24 space-y-8">
                    {/* Option 01: DIY */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        <div className={`relative transition-all duration-500 ${activeOption === "diy" ? "scale-[1.01]" : ""}`}
                            onMouseEnter={() => setActiveOption("diy")}
                            onMouseLeave={() => setActiveOption(null)}>
                            <div className="absolute top-0 left-0 w-full h-full bg-brand-cream rounded-lg"></div>
                            <div className="relative p-8 border border-brand-brown/10 rounded-lg backdrop-blur-sm">
                                <div className="flex items-center gap-6 mb-6">
                                    <div className="w-16 h-16 bg-brand-brown flex items-center justify-center flex-shrink-0">
                                        <span className="text-white text-xl font-light">01</span>
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-light text-brand-brown mb-2 font-kiona">Do It Yourself</h2>
                                        <div className="w-12 h-px bg-brand-brown"></div>
                                    </div>
                                </div>
                                <p className="text-brand-brown-dark text-base mb-6 leading-relaxed">
                                    The DIY option is the traditional Corporate Authorised Representative model.
                                </p>
                                <div className="p-5 bg-white/80 backdrop-blur-sm border border-brand-brown/5 rounded-md">
                                    <p className="text-brand-brown-dark leading-relaxed text-sm">
                                        This option requires a minimum of $500k practice revenue and your practice must be based in Sydney, Melbourne or Brisbane CBD only.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Option 02: DIFM */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
                        viewport={{ once: true }}
                    >
                        <div className={`relative transition-all duration-500 ${activeOption === "difm" ? "scale-[1.01]" : ""}`}
                            onMouseEnter={() => setActiveOption("difm")}
                            onMouseLeave={() => setActiveOption(null)}>
                            <div className="absolute top-0 left-0 w-full h-full bg-brand-cream rounded-lg"></div>
                            <div className="relative p-8 border border-brand-brown/10 rounded-lg backdrop-blur-sm">
                                <div className="flex items-center gap-6 mb-6">
                                    <div className="w-16 h-16 bg-brand-brown flex items-center justify-center flex-shrink-0">
                                        <span className="text-white text-xl font-light">02</span>
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-light text-brand-brown mb-2 font-kiona">Do It For Me*</h3>
                                        <div className="w-12 h-px bg-brand-brown"></div>
                                    </div>
                                </div>
                                <p className="text-brand-brown-dark text-base mb-6 leading-relaxed">
                                    With the DIFM option, Walker Lane runs your entire back office in alignment with our &apos;Design Effective&apos; compliance framework.
                                </p>
                                <div className="p-5 bg-white/80 backdrop-blur-sm border border-brand-brown/5 rounded-md">
                                    <p className="text-brand-brown-dark leading-relaxed text-sm mb-3">
                                        We do it for you, whilst keeping you safe and allowing you to focus on what you do best - spending time with clients.
                                    </p>
                                    <p className="text-brand-brown-dark leading-relaxed text-sm">
                                        Your practice can be based anywhere in Australia and will typically have under $500k of revenue.
                                    </p>
                                </div>
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
                >
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10">
                        <div className="lg:col-span-3">
                            <h3 className="text-2xl font-light text-brand-brown font-kiona">*Do It For Me</h3>
                            <h3 className="text-xl font-light text-brand-brown font-kiona">Inclusions</h3>
                            <div className="w-12 h-px bg-brand-brown mt-4"></div>
                        </div>
                        <div className="lg:col-span-9">
                            <p className="text-brand-brown-dark text-base leading-relaxed">
                                Our comprehensive service includes all aspects of advice preparation, compliance, and implementation, allowing you to focus entirely on client relationships and business growth.
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {/* Pre-advice */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
                            viewport={{ once: true }}
                            className={`relative p-6 border border-brand-brown/5 rounded-lg transition-all duration-500 ${activeInclusion === "pre-advice" ? "border-brand-brown/20 shadow-md" : ""}`}
                            onMouseEnter={() => setActiveInclusion("pre-advice")}
                            onMouseLeave={() => setActiveInclusion(null)}
                        >
                            <div className="absolute top-0 right-0 w-12 h-12 bg-brand-cream/30 rounded-bl-lg flex justify-center items-center"><h2 className="text-brand-brown-dark text-xl font-light font-kiona text-center">1</h2></div>
                            <h4 className="text-lg font-light text-brand-brown-dark mb-4 font-kiona">Pre-advice</h4>
                            <ul className="space-y-3 text-brand-brown-dark ">
                                <li className="flex items-start font-inter">
                                    <span className="text-brand-blue mr-2 mt-1 text-xs">•</span>
                                    <span className="leading-relaxed text-sm">Fact Find: data entry of client&apos;s details into Xplan to create the fact find/client data form (CDF)</span>
                                </li>
                                <li className="flex items-start font-inter">
                                    <span className="text-brand-blue mr-2 mt-1 text-xs">•</span>
                                    <span className="leading-relaxed text-sm">Super and Investment: Creation of the Wealth Solver scenario including existing vs recommended product research, asset allocation and fees</span>
                                </li>
                                <li className="flex items-start font-inter">
                                    <span className="text-brand-blue mr-2 mt-1 text-xs">•</span>
                                    <span className="leading-relaxed text-sm">Personal Insurance: Creation of Risk Researcher scenario including the insurance needs analysis, quoting and research across all available insurers</span>
                                </li>
                                <li className="flex items-start font-inter">
                                    <span className="text-brand-blue mr-2 mt-1 text-xs">•</span>
                                    <span className="leading-relaxed text-sm">Financial Projections/Modelling: producing financial projections in Xtools, including impact of insurance premiums on super balance</span>
                                </li>
                                <li className="flex items-start font-inter">
                                    <span className="text-brand-blue mr-2 mt-1 text-xs">•</span>
                                    <span className="leading-relaxed text-sm">Like for like insurance comparison between existing and recommended insurer.</span>
                                </li>
                            </ul>
                        </motion.div>

                        {/* Statement of Advice */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.6 }}
                            viewport={{ once: true }}
                            className={`relative p-6 border border-brand-brown/5 rounded-lg transition-all duration-500 ${activeInclusion === "soa" ? "border-brand-brown/20 shadow-md" : ""}`}
                            onMouseEnter={() => setActiveInclusion("soa")}
                            onMouseLeave={() => setActiveInclusion(null)}
                        >
                            <div className="absolute top-0 right-0 w-12 h-12 bg-brand-cream/30 rounded-bl-lg flex justify-center items-center"><h2 className="text-brand-brown-dark text-xl font-light font-kiona text-center">2</h2></div>
                            <h4 className="text-lg font-light text-brand-brown-dark mb-4 font-kiona">Statement of Advice Generation & Compliance</h4>
                            <ul className="space-y-3 text-brand-brown-dark">
                                <li className="flex items-start font-inter">
                                    <span className="text-brand-blue mr-2 mt-1 text-xs">•</span>
                                    <span className="leading-relaxed text-sm">We will write the statement of advice, ready for presentation to your clients</span>
                                </li>
                                <li className="flex items-start font-inter">
                                    <span className="text-brand-blue mr-2 mt-1 text-xs">•</span>
                                    <span className="leading-relaxed text-sm">The SOA will be produced to comply with your legal obligations and the Walker Lane licensee standards.</span>
                                </li>
                            </ul>
                        </motion.div>

                        {/* Implementation */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.7 }}
                            viewport={{ once: true }}
                            className={`relative p-6 border border-brand-brown/5 rounded-lg transition-all duration-500 ${activeInclusion === "implementation" ? "border-brand-brown/20 shadow-md" : ""}`}
                            onMouseEnter={() => setActiveInclusion("implementation")}
                            onMouseLeave={() => setActiveInclusion(null)}
                        >
                            <div className="absolute top-0 right-0 w-12 h-12 bg-brand-cream/30 rounded-bl-lg flex justify-center items-center"><h2 className="text-brand-brown-dark text-xl font-light font-kiona text-center">3</h2></div>
                            <h4 className="text-lg font-light text-brand-brown-dark mb-4 font-kiona">Implementation</h4>
                            <ul className="space-y-3 text-brand-brown-dark">
                                <li className="flex items-start font-inter">
                                    <span className="text-brand-blue mr-2 mt-1 text-xs">•</span>
                                    <span className="leading-relaxed text-sm">Generation and submission of product applications for your clients</span>
                                </li>
                                <li className="flex items-start font-inter">
                                    <span className="text-brand-blue mr-2 mt-1 text-xs">•</span>
                                    <span className="leading-relaxed text-sm">Communicating and following up outstanding requirements such as medical tests and financial requirements</span>
                                </li>
                                <li className="flex items-start font-inter">
                                    <span className="text-brand-blue mr-2 mt-1 text-xs">•</span>
                                    <span className="leading-relaxed text-sm">Processing superannuation rollovers and investing the funds in line with the recommendations</span>
                                </li>
                                <li className="flex items-start font-inter">
                                    <span className="text-brand-blue mr-2 mt-1 text-xs">•</span>
                                    <span className="leading-relaxed text-sm">Processing ATO forms, plus &quot;choice of super fund&quot; documents for the client&apos;s future employer super contributions.</span>
                                </li>
                            </ul>
                        </motion.div>

                        {/* Review */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.8 }}
                            viewport={{ once: true }}
                            className={`relative p-6 border border-brand-brown/5 rounded-lg transition-all duration-500 ${activeInclusion === "review" ? "border-brand-brown/20 shadow-md" : ""}`}
                            onMouseEnter={() => setActiveInclusion("review")}
                            onMouseLeave={() => setActiveInclusion(null)}
                        >
                            <div className="absolute top-0 right-0 w-12 h-12 bg-brand-cream/30 rounded-bl-lg flex justify-center items-center"><h2 className="text-brand-brown-dark text-xl font-light font-kiona text-center">4</h2></div>
                            <h4 className="text-lg font-light text-brand-brown-dark mb-4 font-kiona">Review</h4>
                            <ul className="space-y-3 text-brand-brown-dark">
                                <li className="flex items-start font-inter">
                                    <span className="text-brand-blue mr-2 mt-1 text-xs">•</span>
                                    <span className="leading-relaxed text-sm">Preparation of review packs for annual client reviews</span>
                                </li>
                            </ul>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
} 