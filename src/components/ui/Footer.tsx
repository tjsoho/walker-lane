"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import {
  RiInstagramLine,
  RiFacebookBoxLine,
  RiLinkedinBoxLine,
} from "react-icons/ri";

const links = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Contact", href: "/contact" },
  { name: "Admin", href: "/admin" },
];

const legalLinks = [
  { name: "Terms & Conditions", href: "/terms" },
  { name: "Privacy Policy", href: "/privacy" },
  { name: "Cookie Policy", href: "/cookies" },
];

const socialLinks = [
  {
    icon: RiInstagramLine,
    href: "https://instagram.com",
    label: "Follow us on Instagram",
  },
  {
    icon: RiFacebookBoxLine,
    href: "https://facebook.com",
    label: "Follow us on Facebook",
  },
  {
    icon: RiLinkedinBoxLine,
    href: "https://linkedin.com",
    label: "Follow us on LinkedIn",
  },
];

export function Footer() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Newsletter signup:", email);
    setEmail("");
  };

  return (
    <>
      <footer className="bg-brand-blue">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 md:gap-8">
            {/* Logo & Description */}
            <div className="lg:col-span-2 flex flex-col justify-end h-full">
              <div>
                <Link href="/" className="inline-block mb-8">
                  <Image
                    src="/images/logo.png"
                    alt="Walker Lane"
                    width={180}
                    height={60}
                    className="h-12 w-auto -ml-5"
                  />
                </Link>
                <p className="text-brand-cream/90 text-lg max-w-md leading-relaxed">
                  Empowering our clietns to build wealth with confidence through
                  personalised guidance and expert solutions.
                </p>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-brand-cream font-kiona mb-6 text-lg">
                Quick Links
              </h4>
              <ul className="space-y-4">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-brand-cream/70 hover:text-brand-cream transition-colors duration-300 text-sm tracking-wide"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal Links */}
            <div>
              <h4 className="text-brand-cream font-kiona mb-6 text-lg">
                Legal
              </h4>
              <ul className="space-y-4">
                {legalLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-brand-cream/70 hover:text-brand-cream transition-colors duration-300 text-sm tracking-wide"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social Links & Newsletter */}
            <div className="text-right">
              <h4 className="text-brand-cream font-kiona mb-6 text-lg">
                Connect With Us
              </h4>
              <div className="flex justify-end space-x-4 mb-8">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand-cream/70 hover:text-brand-cream hover:bg-brand-cream/10 transition-all duration-300 border border-brand-cream/10 p-3 rounded-lg"
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
              {/* Newsletter */}
              <div className="ml-auto">
                <h4 className="text-brand-cream font-kiona mb-6 text-lg">
                  Financial Insights
                </h4>
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-3 w-[220px] ml-auto"
                >
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 rounded-lg bg-brand-cream/5 text-brand-cream placeholder:text-brand-cream/40 border border-brand-cream/10 focus:outline-none focus:ring-2 focus:ring-brand-cream/20 focus:border-transparent transition-all duration-300"
                    required
                  />
                  <button
                    type="submit"
                    className="w-full px-4 py-3 bg-brand-cream/10 text-brand-cream rounded-lg hover:bg-brand-cream/20 transition-all duration-300 font-kiona text-sm tracking-wider border border-brand-cream/10"
                  >
                    Subscribe
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-16 pt-8 border-t border-brand-cream/10">
            <p className="text-brand-cream/60 text-sm text-center tracking-wide">
              © {new Date().getFullYear()} Walker Lane. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Designer Banner */}
      <div className="bg-brand-brown h-[50px] flex items-center justify-center">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-brand-brown-dark text-sm tracking-wider">
            Designed By{" "}
            <a
              href="https://www.ai-guy.co"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-brown-dark font-medium hover:text-brand-brown-dark/80 transition-colors"
            >
              AI GUY BUSINESS SOLUTIONS
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
