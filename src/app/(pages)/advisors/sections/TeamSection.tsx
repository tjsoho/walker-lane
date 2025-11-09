"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Modal } from "@/components/ui/Modal";

// const icons = {
//   chart: (
//     <svg
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="1"
//       className="w-8 h-8"
//     >
//       <path d="M3 20h18M5 4v12m4-8v8m4-10v10m4-6v6" strokeLinecap="round" />
//     </svg>
//   ),
//   handshake: (
//     <svg
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="1"
//       className="w-8 h-8"
//     >
//       <path
//         d="M8 12l2-2m0 0l8-8m-8 8L2 18m8-8l8 8"
//         strokeLinecap="round"
//         strokeLinejoin="round"
//       />
//     </svg>
//   ),
//   lightbulb: (
//     <svg
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="1"
//       className="w-8 h-8"
//     >
//       <path
//         d="M12 2v2m0 16v2M4 12H2m20 0h-2m-2.828-6.586l-1.414 1.414M6.242 17.758l-1.414 1.414M17.758 17.758l1.414 1.414M6.242 6.242L4.828 4.828M12 6a6 6 0 100 12 6 6 0 000-12z"
//         strokeLinecap="round"
//       />
//     </svg>
//   ),
//   star: (
//     <svg
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="1"
//       className="w-8 h-8"
//     >
//       <path
//         d="M12 2l2.4 7.4h7.6l-6 4.6 2.4 7.4-6-4.6-6 4.6 2.4-7.4-6-4.6h7.6z"
//         strokeLinecap="round"
//         strokeLinejoin="round"
//       />
//     </svg>
//   ),
// };

interface TeamMember {
  id: number;
  name: string;
  role: string;
  image: string;
  quote: string;
  icon?: string;
  bio: string;
  badges: string[];
}

const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Josh Cratchley",
    role: "Chief Executive Officer",
    image: "/images/josh.jpg",
    quote: "Success is built on daily disciplines",
    icon: "chart",
    bio: "Josh is an experienced financial adviser and co-founder of Walker Lane, dedicated to helping clients achieve their financial goals.",
    badges: ["Financial Planning", "Wealth Management", "Business Strategy"],
  },
  {
    id: 2,
    name: "Patrick Casey",
    role: "Chairman",
    image: "/images/pat.jpg",
    quote: "Every decision shapes tomorrow",
    icon: "handshake",
    bio: "Pat is a seasoned executive in financial services with deep expertise in wealth management and AFSL operations.",
    badges: ["Executive Leadership", "Financial Services", "Business Development"],
  },
  {
    id: 3,
    name: "Sam Carroll",
    role: "Responsible Manager",
    image: "/images/sam.jpg",
    quote: "Simplicity is the ultimate sophistication",
    icon: "lightbulb",
    bio: "Sam specializes in succession planning and business growth for financial advice practices.",
    badges: ["Succession Planning", "Business Growth", "Financial Advice"],
  },

];

const TeamSection = () => {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const memberRef = useRef<HTMLDivElement>(null);

  return (
    <section className="bg-brand-cream py-24">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-lg tracking-[0.3em] uppercase text-brand-brown mb-4 font-ttNorms">
            WHO ARE WE
          </p>
          <h2 className="text-5xl md:text-6xl tracking-wider font-kiona text-brand-brown-dark">
            MEET THE TEAM
          </h2>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {teamMembers.map((member) => (
            <motion.div
              key={member.id}
              className="relative"
              whileHover="hover"
              initial="initial"
            >
              {/* Image Container */}
              <div className="relative aspect-[3/4] overflow-hidden group">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover rounded-md"
                />

                {/* Quick Silver Flash */}
                <div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/80 to-transparent 
                  opacity-0 group-hover:opacity-100 -translate-x-full group-hover:translate-x-full 
                  transition-all duration-500 ease-in-out"
                />

                {/* Main Blue Overlay */}
                {/* <div
                  className="absolute inset-0 bg-gradient-to-br from-brand-blue/95 to-brand-blue/90
                  opacity-0 group-hover:opacity-100 translate-x-full group-hover:translate-x-0
                  transition-all duration-500 ease-in-out delay-200
                  flex flex-col justify-center items-center p-6 text-center backdrop-blur-[4px] cursor-pointer"
                >
                  <div className="flex flex-col items-center justify-center w-full space-y-4">

                    <div className="text-white text-3xl transform -translate-y-8 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 delay-300">
                      {icons[member.icon]}
                    </div>

                    <div className="flex flex-wrap gap-2 justify-center mt-2">
                      {member.badges.map((badge) => (
                        <span key={badge} className="px-3 py-1 bg-white/20 text-white rounded-full text-sm font-ttNorms font-bold">
                          {badge}
                        </span>
                      ))}
                    </div>

                    <p className="text-white text-sm italic font-light transform translate-y-8 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 delay-500">
                      &ldquo;{member.quote}&rdquo;
                    </p>
                  </div>
                </div> */}
              </div>

              {/* Name, Role and Plus Button Container */}
              <div className="mt-4 flex justify-between items-center">
                <div className="text-left">
                  <h3 className="text-[#4A3419] text-xl font-kiona">
                    {member.name}
                  </h3>
                  <p className="text-gray-600 font-ttNorms">{member.role}</p>
                </div>

                {/* Plus Button */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedMember(member)}
                  className="w-10 h-10 flex-shrink-0"
                >
                  <div className="relative w-full h-full">
                    <div className="absolute inset-0 border border-[#4A3419] rounded-full" />
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="absolute inset-0 border border-[#4A3419] rounded-full"
                    />
                    <span className="absolute inset-0 flex items-center justify-center text-[#4A3419] text-2xl">
                      +
                    </span>
                  </div>
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Modal */}
        {selectedMember && (
          <Modal
            isOpen={true}
            onClose={() => setSelectedMember(null)}
            title={selectedMember.name}
            buttonRef={memberRef}
          >
            <div className="flex flex-col md:flex-row gap-4 md:gap-6 lg:gap-8 -ml-4 md:-ml-6 lg:-ml-16 pl-4 md:pl-6 lg:pl-10 ">
              {/* Image - Left Side */}
              <div className="relative w-full md:w-72 lg:w-80 md:flex-shrink-0 aspect-[3/4] md:aspect-auto md:h-auto md:min-h-[400px] ">
                <Image
                  src={selectedMember.image}
                  alt={selectedMember.name}
                  fill
                  className="object-contain"
                />
              </div>

              {/* Content - Right Side */}
              <div className="flex-1 space-y-3 md:space-y-4 min-w-0">
                {/* Role */}
                <div className="border-b border-brand-cream/20 pb-3 md:pb-4">
                  <p className="text-brand-cream/80 text-base md:text-lg font-medium">
                    {selectedMember.role}
                  </p>
                </div>

                {/* Bio */}
                <div>
                  <p className="text-brand-cream text-sm md:text-base leading-relaxed">
                    {selectedMember.bio}
                  </p>
                </div>
              </div>
            </div>
          </Modal>
        )}
      </div>
    </section>
  );
};

export default TeamSection;
