"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export const CTASection = () => {
  return (
    <section className="bg-brand-brown py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-kiona text-brand-cream mb-6">
            Ready to Secure Your Financial Future?
          </h2>
          <p className="text-lg text-white mb-12 font-ttNorms">
            We&apos;ll help you achieve financial confidence with a
            complimentary consultation.
          </p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="/contact"
              className="inline-block bg-brand-cream text-brand-brown-dark px-8 py-4 rounded-md font-kiona hover:bg-brand-cream/90 transition-colors"
            >
              Book a Free Intro Call
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
