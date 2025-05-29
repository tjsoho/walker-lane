"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export function CTASection() {
  return (
    <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <Image
          src="/images/boatHero.jpeg"
          alt="Strategic investment"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-brand-brown/80 backdrop-blur-[2px]" />
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center space-y-8"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-white font-[family-name:var(--font-kiona)] leading-tight">
            Clear, strategic investment advice to help you achieve your
            financial goals faster.
          </h2>
          <Link
            href="/book-consultation"
            className="inline-block bg-white px-8 py-4 font-bold rounded text-brand-brown-dark font-[family-name:var(--font-tt-norms)] hover:bg-opacity-90 transition-all duration-300"
          >
            Book a Free Intro Call
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
