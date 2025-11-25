"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const advisers = [
  {
    name: "Sam Carroll",
    url: "https://app.acuityscheduling.com/schedule.php?owner=17189238&appointmentType=40681450",
  },
  {
    name: "Patrick Casey",
    url: "https://go.oncehub.com/patcasey",
  },
  {
    name: "Josh Cratchley",
    url: "https://calendly.com/plenary-josh/15min",
  },
];

export const CTASection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="bg-brand-brown py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-kiona text-brand-cream mb-6">
            Ready to Secure Your Financial Future?
          </h2>
          <p className="text-xl text-white mb-12 ">
            We&apos;ll help you achieve financial confidence with a
            complimentary consultation.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsModalOpen(true)}
            className="inline-block bg-brand-cream text-brand-brown-dark px-8 py-4 rounded-md font-kiona hover:bg-brand-cream/90 transition-colors"
          >
            Book a Free Intro Call
          </motion.button>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 backdrop-blur">
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.25 }}
            className="relative w-full max-w-2xl overflow-hidden rounded-3xl bg-brand-brown-dark p-[1px] shadow-2xl"
          >
            <div className="relative rounded-3xl bg-brand-brown-dark p-10 text-center text-brand-cream">
              <button
                aria-label="Close"
                onClick={() => setIsModalOpen(false)}
                className="absolute right-6 top-6 text-brand-cream/70 transition hover:text-brand-cream"
              >
                ✕
              </button>
              <p className="text-sm uppercase tracking-[0.3em] text-brand-cream/70 mb-4">
                Complimentary Call
              </p>
              <h3 className="text-3xl font-kiona text-brand-cream mb-8">
                Choose who you&apos;d like to book a call with
              </h3>
              <div className="grid gap-5 md:grid-cols-3">
                {advisers.map((adviser) => (
                  <motion.button
                    key={adviser.name}
                    whileHover={{ y: -4 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() =>
                      window.open(adviser.url, "_blank", "noopener,noreferrer")
                    }
                    className="w-full bg-brand-cream text-brand-brown-dark px-8 py-4 rounded-md font-kiona hover:bg-brand-cream/90 transition-colors"
                  >
                    {adviser.name === "Sam Carroll" ? (
                      <>
                        <span className="block">Sam</span>
                        <span className="block">Carroll</span>
                      </>
                    ) : (
                      adviser.name
                    )}
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
};
