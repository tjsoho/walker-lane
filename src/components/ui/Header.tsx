"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu } from "./Menu";

const menuVariants = {
  initial: {
    gap: 8,
  },
  hover: {
    gap: 10,
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
};

const lineVariants = {
  initial: { width: 28 },
  hover: {
    width: 48,
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
};

const middleLineVariants = {
  initial: { width: 32 },
  hover: {
    width: 24,
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
};

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userType, setUserType] = useState<"clients" | "advisors">("clients");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-20 transition-colors duration-300 ${isScrolled ? 'bg-brand-cream backdrop-blur-xl' : 'bg-transparent'
        }`}>
        <div className="mx-auto px-6 flex items-center justify-between">
          {/* Left space for symmetry - hidden on mobile */}
          <div className={`hidden md:block ${isScrolled ? 'w-32' : 'w-40'}`} />

          {/* Logo - left on mobile, center on md+ */}
          <Link href="/" className="relative w-48 md:w-64 h-16">
            {/* Regular Logo */}
            <Image
              src="/images/logo.png"
              alt="Walker Lane"
              fill
              className={`object-contain transition-opacity duration-300 ${isScrolled ? 'opacity-0' : 'opacity-100'}`}
              priority
            />
            {/* Dark Logo */}
            <Image
              src="/images/walkerdark.png"
              alt="Walker Lane"
              fill
              className={`object-contain transition-opacity duration-300 -mt-1 w-full scale-110 ml-3 ${isScrolled ? 'opacity-100' : 'opacity-0'}`}
              priority
            />
          </Link>

          {/* Menu Button */}
          <div className="w-32 flex justify-end">
            <motion.button
              className="flex flex-col items-end cursor-pointer"
              variants={menuVariants}
              initial="initial"
              whileHover="hover"
              onClick={() => setIsMenuOpen(true)}
            >
              <motion.span
                className={`h-[1px] ${isScrolled ? 'bg-brand-brown-dark' : 'bg-brand-brown-light'}`}
                variants={lineVariants}
              />
              <motion.span
                className={`h-[1px] ${isScrolled ? 'bg-brand-brown-dark' : 'bg-brand-brown-light'}`}
                variants={middleLineVariants}
              />
              <motion.span
                className={`h-[1px] ${isScrolled ? 'bg-brand-brown-dark' : 'bg-brand-brown-light'}`}
                variants={lineVariants}
              />
            </motion.button>
          </div>
        </div>
      </header>

      <Menu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        userType={userType}
        onUserTypeChange={setUserType}
      />
    </>
  );
}
