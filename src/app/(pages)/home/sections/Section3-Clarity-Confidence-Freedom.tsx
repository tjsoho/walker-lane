"use client";

import { motion } from "framer-motion";
import { useState, useRef } from "react";
import { Modal } from "@/components/ui/Modal";
import { PlusIcon } from "@/components/ui/PlusIcon";
import { RiCheckLine } from "react-icons/ri";

const ListItem = ({
  children,
  index,
}: {
  children: React.ReactNode;
  index: number;
}) => (
  <motion.li
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{
      duration: 0.5,
      delay: 0.3 + index * 0.1,
      ease: [0.4, 0, 0.2, 1],
    }}
    className="flex items-start"
  >
    <RiCheckLine className="w-5 h-5 mt-0.5 mr-3 text-brand-brown-light flex-shrink-0" />
    <span>{children}</span>
  </motion.li>
);

const modalContent = {
  clarity: {
    title: "Financial Clarity",
    position: "left" as const,
    content: (
      <>
        <p className="text-lg mb-6 font-[family-name:var(--font-tt-norms)] text-white">
          Our speciality lies in translating complex financial information into
          clear, actionable steps. We&apos;ll help you see the bigger picture,
          identify your goals, and develop a personalised strategy to achieve
          them.
        </p>
        <ul className="space-y-4 font-[family-name:var(--font-tt-norms)] text-white">
          <ListItem index={0}>Personalised Financial Roadmaps</ListItem>
          <ListItem index={1}>Empowered Decision Making</ListItem>
          <ListItem index={2}>Healthy Financial Wellbeing</ListItem>
        </ul>
      </>
    ),
  },
  confidence: {
    title: "Building Confidence",
    position: "center" as const,
    content: (
      <>
        <p className="text-lg mb-6  text-white">
          With our guidance, you&apos;ll gain the confidence to navigate any
          financial challenge. We&apos;ll work alongside you, crafting a tailored
          plan aligned with your values and goals to secure your future and
          achieve your financial aspirations.
        </p>
        <ul className="space-y-4  text-white ">
          <ListItem index={0}>Expert guidance and education</ListItem>
          <ListItem index={1}>Proactive risk management</ListItem>
          <ListItem index={2}>Long-term partnership focus</ListItem>
        </ul>
      </>
    ),
  },
  freedom: {
    title: "Financial Freedom",
    position: "right" as const,
    content: (
      <>
        <p className="text-lg mb-6  text-white">
          Picture yourself living life exactly as you envision it. We help you
          design a financial roadmap to turn these dreams into realities.
          Whether it&apos;s early retirement, pursuing passions, or simply
          enjoying more financial security, we&apos;ll work with you to build
          a future where financial freedom is your reality.
        </p>
        <ul className="space-y-4  text-white">
          <ListItem index={0}>Personalized wealth strategies</ListItem>
          <ListItem index={1}>Goal-oriented planning</ListItem>
          <ListItem index={2}>Lifestyle-focused solutions</ListItem>
        </ul>
      </>
    ),
  },
};

export function SupportSection() {
  const [activeModal, setActiveModal] = useState<
    keyof typeof modalContent | null
  >(null);
  const clarityButtonRef = useRef<HTMLButtonElement>(null);
  const confidenceButtonRef = useRef<HTMLButtonElement>(null);
  const freedomButtonRef = useRef<HTMLButtonElement>(null);

  const getActiveButtonRef = () => {
    switch (activeModal) {
      case "clarity":
        return clarityButtonRef;
      case "confidence":
        return confidenceButtonRef;
      case "freedom":
        return freedomButtonRef;
      default:
        return null;
    }
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  return (
    <section className="relative bg-brand-blue py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="sr-only">Clarity, confidence, and freedom</h2>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-y-16 md:gap-x-20"
        >
          {/* Clarity */}
          <motion.div variants={textVariants} className="text-center">
            <div className="flex flex-col items-center">
              <h3 className="text-4xl md:text-5xl lg:text-6xl font-kiona text-brand-cream tracking-wider mb-8">
                Clarity
              </h3>
              <PlusIcon
                ariaLabel="Learn more about financial clarity"
                onClick={() => setActiveModal("clarity")}
                ref={clarityButtonRef}
              />
            </div>
          </motion.div>

          {/* Confidence */}
          <motion.div variants={textVariants} className="text-center">
            <div className="flex flex-col items-center">
              <h3 className="text-4xl md:text-5xl lg:text-6xl font-kiona text-brand-cream tracking-wider mb-8">
                Confidence
              </h3>
              <PlusIcon
                ariaLabel="Learn more about building financial confidence"
                onClick={() => setActiveModal("confidence")}
                ref={confidenceButtonRef}
              />
            </div>
          </motion.div>

          {/* Freedom */}
          <motion.div variants={textVariants} className="text-center">
            <div className="flex flex-col items-center">
              <h3 className="text-4xl md:text-5xl lg:text-6xl font-kiona text-brand-cream tracking-wider mb-8">
                Freedom
              </h3>
              <PlusIcon
                ariaLabel="Learn more about financial freedom"
                onClick={() => setActiveModal("freedom")}
                ref={freedomButtonRef}
              />
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Modal */}
      {activeModal && (
        <Modal
          isOpen={true}
          onClose={() => setActiveModal(null)}
          title={modalContent[activeModal].title}
          buttonRef={getActiveButtonRef()!}
        >
          {modalContent[activeModal].content}
        </Modal>
      )}
    </section>
  );
}
