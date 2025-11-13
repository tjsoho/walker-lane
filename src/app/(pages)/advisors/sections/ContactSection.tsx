"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import emailjs from "@emailjs/browser";
import toast from "react-hot-toast";

export function ContactSection() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // EmailJS configuration - you'll need to set these up in your .env.local file
            const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "";
            const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "";
            const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "";

            if (!serviceId || !templateId || !publicKey) {
                throw new Error("EmailJS configuration is missing. Please check your environment variables.");
            }

            await emailjs.send(
                serviceId,
                templateId,
                {
                    from_name: formData.name,
                    from_email: formData.email,
                    phone: formData.phone,
                    message: formData.message,
                    to_email: process.env.NEXT_PUBLIC_RECIPIENT_EMAIL || "your-email@example.com",
                },
                publicKey
            );

            toast.success("Message sent successfully! We'll get back to you soon.");
            setFormData({ name: "", email: "", phone: "", message: "" });
        } catch (error) {
            console.error("EmailJS error:", error);
            toast.error("Failed to send message. Please try again or contact us directly.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <section className="lg:py-32 py-16 px-4 bg-white max-w-screen-1">
            <div className="max-w-7xl mx-auto">
                <div className="grid md:grid-cols-2 gap-16 items-start">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        viewport={{ once: true }}
                        className="space-y-12"
                    >
                        <div>
                            <h2 className="text-3xl font-light font-[family-name:var(--font-kiona)] text-brand-brown-dark mb-6">
                                Get in Touch
                            </h2>
                            <p className="text-lg text-brand-brown-dark">
                                We&apos;re here to help you navigate your financial journey with confidence and clarity.
                            </p>
                        </div>

                        <div className="space-y-8">
                            <div className="flex items-start space-x-4">
                                <div className="w-12 h-12 rounded-full bg-brand-blue/10 flex items-center justify-center flex-shrink-0">
                                    <svg className="w-6 h-6 text-brand-brown-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-lg font-medium text-brand-brown-dark mb-1 font-kiona">Phone</h3>
                                    <p className="text-brand-brown-dark">02 9135 2935</p>
                                </div>
                            </div>

                         

                            <div className="flex items-start space-x-4">
                                <div className="w-12 h-12 rounded-full bg-brand-blue/10 flex items-center justify-center flex-shrink-0">
                                    <svg className="w-6 h-6 text-brand-brown-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-lg font-medium text-brand-brown-dark mb-1 font-kiona">Address</h3>
                                    <p className="text-brand-brown-dark">Level 18, Suite 18.03<br />1 Margaret Street<br />Sydney NSW 2000</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        viewport={{ once: true }}
                        className="bg-brand-cream/50 backdrop-blur-sm rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 border border-white/20"
                    >
                        <div className="mb-6">
                            <h2 className="text-2xl font-light font-[family-name:var(--font-kiona)] text-brand-brown-dark mb-2">
                                Send us a Message
                            </h2>
                            <p className="text-sm text-brand-brown-dark">
                                We&apos;ll get back to you within 24 hours
                            </p>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-brand-brown-dark mb-1.5 font-kiona">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2.5 bg-white/50 border border-brand-brown/10 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue/10 focus:border-brand-blue/30 transition-all duration-300 text-brand-brown/80 placeholder-brand-brown/30 text-sm"
                                        placeholder="Your name"
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-brand-brown-dark mb-1.5 font-kiona">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2.5 bg-white/50 border border-brand-brown/10 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue/10 focus:border-brand-blue/30 transition-all duration-300 text-brand-brown/80 placeholder-brand-brown/30 text-sm"
                                        placeholder="your@email.com"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="phone" className="block text-sm font-medium text-brand-brown-dark mb-1.5 font-kiona">
                                    Phone
                                </label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2.5 bg-white/50 border border-brand-brown/10 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue/10 focus:border-brand-blue/30 transition-all duration-300 text-brand-brown/80 placeholder-brand-brown/30 text-sm"
                                    placeholder="+61 (0) 123 456 789"
                                />
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-brand-brown-dark mb-1.5 font-kiona">
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows={3}
                                    className="w-full px-3 py-2.5 bg-white/50 border border-brand-brown/10 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue/10 focus:border-brand-blue/30 transition-all duration-300 text-brand-brown/80 placeholder-brand-brown/30 resize-none text-sm"
                                    placeholder="Tell us about your project..."
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-brand-blue text-white py-2.5 px-4 rounded-md hover:bg-brand-blue/90 transition-all duration-300 font-medium text-sm shadow-[0_4px_12px_rgba(0,0,0,0.05)] hover:shadow-[0_6px_16px_rgba(0,0,0,0.08)] hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                            >
                                {isSubmitting ? "Sending..." : "Send Message"}
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
} 