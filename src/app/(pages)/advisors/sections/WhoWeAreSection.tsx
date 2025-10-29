"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function WhoWeAreSection() {
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
                        Who We Are
                    </h2>
                    <div className="w-24 h-0.5 bg-brand-brown mx-auto"></div>
                </motion.div>

                <div className="grid md:grid-cols-12 gap-16 items-start">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        viewport={{ once: true }}
                        className="md:col-span-5 space-y-8"
                    >
                        <div className="relative">
                            <div className="absolute -left-4 top-0 bottom-0 w-0.5 bg-brand-brown/20"></div>
                            
                            <div className="space-y-6 text-brand-brown-dark pl-4 font-[family-name:var(--font-tt-norms)]">
                                <p className="text-lg leading-relaxed font-[family-name:var(--font-tt-norms)] ">
                                    Walker Lane is a boutique Financial Advisory and investment management firm, built by professional financial advisers to deliver high quality financial advice to clients. We are owned by advisers and staff only.
                                </p>
                                <p className="text-lg leading-relaxed font-[family-name:var(--font-tt-norms)]">
                                    We strive to partner with high-quality advisers to build successful advice businesses through the provision of quality tailored services and support, financial products and education to enhance the overall experience of all involved.
                                </p>
                                <p className="text-lg leading-relaxed font-[family-name:var(--font-tt-norms)]">
                                    We offer diversified managed account solutions, suited to different investor risk profiles, with a strong focus on wealth preservation.
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                        viewport={{ once: true }}
                        className="md:col-span-7"
                    >
                        <div className="relative h-[500px] rounded-lg overflow-hidden shadow-xl">
                            <Image
                                src="/images/client3.png"
                                alt="Walker Lane Office"
                                fill
                                className="object-cover"
                                priority
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent"></div>
                            <div className="absolute bottom-0 left-0 right-0 p-10">
                                <h3 className="text-3xl font-medium text-white mb-6">Our Focus</h3>
                                <div className="space-y-6 text-white/90">
                                    <p className="text-lg leading-relaxed">
                                        At Walker Lane, we always act in the best interests of our clients. We do our own research, build our own systems and think for ourselves to deliver investment insights that add value for our clients.
                                    </p>
                                    <p className="text-lg leading-relaxed">
                                        We exist to make a positive difference to our adviser&apos;s and client&apos;s lives.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
} 