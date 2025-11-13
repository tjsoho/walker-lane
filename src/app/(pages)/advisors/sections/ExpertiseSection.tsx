"use client";

import { motion } from "framer-motion";

export function ExpertiseSection() {
    return (
        <section className="lg:py-32 py-16 px-4 max-w-screen-1">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-light font-[family-name:var(--font-kiona)] text-brand-brown-dark mb-6">
                        Our Investment Expertise
                    </h2>
                    <p className="text-lg text-brand-brown-dark  max-w-2xl mx-auto">
                        We do our own research and bring in specialists where required to deliver the best outcomes for our clients
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-12">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        viewport={{ once: true }}
                        className="space-y-6"
                    >
                        <div>
                            <h3 className="text-xl font-medium text-brand-brown-dark font-kiona mb-4">Investment Beliefs</h3>
                            <p className="text-brand-brown-dark">
                                At Walker Lane you&apos;ll find a community of Financial Advisers that sticks to a simple, high quality investment philosophy. We do our own research on all aspects of the portfolio management process, plus bring in specialists where required.
                            </p>
                        </div>

                        <div>
                            <h3 className="text-xl font-medium text-brand-brown-dark font-kiona mb-4">Investment Solutions</h3>
                            <p className="text-brand-brown-dark">
                                Our approved product list is extensive, containing many major retail insurance providers and mainstream wrap administration platforms. Advisers are able to develop the strategies and use the products that you believe delivers the best possible outcome for your clients.
                            </p>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        viewport={{ once: true }}
                        className="bg-white/50 p-8 rounded-xl"
                    >
                        <h3 className="text-xl font-medium text-brand-brown-dark font-kiona mb-4">Investment Proposition</h3>
                        <p className="text-brand-brown-dark mb-6">
                            As THE managed account specialists, we currently run a suite of managed accounts to fit different investor risk profiles including:
                        </p>
                        <ul className="space-y-3">
                            <li className="flex items-center text-brand-brown-dark">
                                <span className="w-2 h-2 bg-brand-brown-dark rounded-full mr-3"></span>
                                Dynamic Asset Allocation (DAA) Portfolios
                            </li>
                            <li className="flex items-center text-brand-brown-dark">
                                <span className="w-2 h-2 bg-brand-brown-dark rounded-full mr-3"></span>
                                Strategic Asset Allocation (SAA) Portfolios
                            </li>
                            <li className="flex items-center text-brand-brown-dark">
                                <span className="w-2 h-2 bg-brand-brown-dark rounded-full mr-3"></span>
                                ESG Portfolios (coming soon)
                            </li>
                        </ul>
                    </motion.div>
                </div>
            </div>
        </section>
    );
} 