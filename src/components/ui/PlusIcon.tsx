"use client";

import { motion } from "framer-motion";
import React from "react";

interface PlusIconProps {
  onClick: () => void;
  /** Accessible name for the expand / learn more control */
  ariaLabel: string;
  size?: "sm" | "lg";
  /** Brown line/border for light backgrounds (e.g. market cards on cream) */
  tone?: "cream" | "brown";
}

export const PlusIcon = React.forwardRef<HTMLButtonElement, PlusIconProps>(
  ({ onClick, ariaLabel, size = "lg", tone = "cream" }, ref) => {
    const borderClass =
      tone === "brown" ? "border-brand-brown-dark" : "border-brand-cream";
    const lineClass =
      tone === "brown" ? "bg-brand-brown-dark" : "bg-brand-cream";
    return (
    <motion.button
      ref={ref}
      type="button"
      aria-label={ariaLabel}
      className={`relative border ${borderClass} rounded-full cursor-pointer bg-transparent p-0 ${
        size === "sm" ? "w-8 h-8" : "w-12 h-12"
      }`}
      whileHover={{ rotate: 180 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      onClick={onClick}
    >
      <motion.div
        className="absolute inset-0"
        initial={{ rotate: 0 }}
        whileInView={{ rotate: 180 }}
        viewport={{ once: false, margin: "-100px" }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <div
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${lineClass} ${
            size === "sm" ? "w-4 h-[1px]" : "w-6 h-[1px]"
          }`}
        />
        <div
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${lineClass} ${
            size === "sm" ? "w-[1px] h-4" : "w-[1px] h-6"
          }`}
        />
      </motion.div>
    </motion.button>
    );
  }
);

PlusIcon.displayName = "PlusIcon";
