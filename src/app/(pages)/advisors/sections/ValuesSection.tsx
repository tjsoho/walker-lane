"use client";

import { motion } from "framer-motion";

export function ValuesSection() {
    return (
        <section className="py-24 px-4 bg-white">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-light font-[family-name:var(--font-kiona)] text-brand-brown mb-6">
                        Our Values
                    </h2>
                    <p className="text-lg text-brand-brown/80 font-[family-name:var(--font-tt-norms)] max-w-2xl mx-auto">
                        We believe in the power of community and the importance of delivering exceptional financial advice
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                        viewport={{ once: true }}
                        className="bg-brand-cream/50 p-8 rounded-xl"
                    >
                        <h3 className="text-xl font-medium text-brand-brown mb-4">Built By Advisers, For Advisers</h3>
                        <p className="text-brand-brown/70">
                            Walker Lane is an Australian Financial Services Licencee (AFSL) that was built by Financial Advisers who wanted to provide a professional AFSL service with other like-minded professionals.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                        viewport={{ once: true }}
                        className="bg-brand-cream/50 p-8 rounded-xl"
                    >
                        <h3 className="text-xl font-medium text-brand-brown mb-4">Better Business Processes</h3>
                        <p className="text-brand-brown/70">
                            Our partnering advisers benefit from a reliable, high-quality investment process and managed account solution, allowing you to operate more competitively whilst experiencing less time pressure.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
                        viewport={{ once: true }}
                        className="bg-brand-cream/50 p-8 rounded-xl"
                    >
                        <h3 className="text-xl font-medium text-brand-brown mb-4">A Sense of Community</h3>
                        <p className="text-brand-brown/70">
                            At Walker Lane, we have a strong sense of community and foster this by running a range of events throughout the year for our Advisers, including Investment MasterClasses and annual conferences.
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
} 