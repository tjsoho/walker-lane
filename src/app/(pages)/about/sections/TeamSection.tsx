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
  alternativeImage?: string;
  quote: string;
  icon?: string;
  bio: string;
  badges: string[];
}

const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Josh Cratchley",
    role: "Chief Executive Officer & Founding Partner",
    image: "/images/Josh Cratchley_02.jpg",
    alternativeImage: "/images/Josh Cratchley_05.jpg",
    quote: "Success is built on daily disciplines",
    icon: "chart",
    bio: `With more than 20 years' experience in financial services, Josh pairs strategic expertise with a strong focus on delivering real value to clients and advisers. Starting his career in accounting, he moved into financial advice in 2010 and went on to co-found Plenary Wealth in 2013.

In 2018, Josh co-founded Walker Lane, where he now serves as CEO and Chief Financial Officer. In this dual role, he leads the strategic direction and financial management of the business, while continuing to deliver expert advice to clients. His ability to balance high-level leadership with hands-on advisory work reflects his deep commitment to both the profession and the people he serves.

Recognised for his grounded approach and clear, actionable advice, Josh combines deep technical knowledge with a strong focus on people. His leadership reflects Walker Lane's broader vision—to support and grow exceptional advice businesses built on integrity, trust and meaningful value.`,
    badges: ["Financial Planning", "Wealth Management", "Business Strategy"],
  },
  {
    id: 2,
    name: "Patrick Casey",
    role: "Chairman & Founding Partner",
    image: "/images/Pat Casey_02.jpg",
    alternativeImage: "/images/Pat Casey_03.jpg",
    quote: "Every decision shapes tomorrow",
    icon: "handshake",
    bio: `Pat Casey is a seasoned financial services executive with over 23 years of experience in wealth management and financial planning. Having held senior leadership roles at Colonial First State and Suncorp Group, he played a key role in transforming their financial advice businesses.

Driven by a desire to make a more personal impact, Pat shifted his focus from large-scale corporate roles to providing strategic advice to individuals and families. His deep expertise in wealth-building strategies and long-term financial planning enables clients to achieve financial freedom with clarity and confidence.

As Co-Founder and Chairman of Walker Lane, he shapes the firm's strategic direction, leveraging his deep expertise in AFSL operations, governance, and regulatory engagement to support the growth and success of high-quality financial advice businesses.`,
    badges: ["Executive Leadership", "Financial Services", "Business Development"],
  },
  {
    id: 3,
    name: "Sam Carroll",
    role: "Responsible Manager & Founding Partner",
    image: "/images/Sam Carroll_01.jpg",
    alternativeImage: "/images/Sam Carroll_05.jpg",
    quote: "Simplicity is the ultimate sophistication",
    icon: "lightbulb",
    bio: `Sam Carroll is a highly experienced financial services professional with over 20 years in the industry. He began his career in a family-founded financial planning practice with a 29-year legacy, where he developed a strong understanding of business continuity, client relationships, and the lasting value of quality advice. In 2019, he took on full leadership of the firm, successfully guiding its succession and future direction.

As Co-Founder of Walker Lane, Sam helps shape the group's strategic vision and growth. As one of two Responsible Managers on the Walker Lane licence, he is committed to building a strong, supportive community of advice businesses.

In his role as a Financial Adviser, Sam works with a diverse range of clients—from young professionals and families to business owners and retirees. He thrives on simplifying complex financial decisions and providing clear, personalised advice that helps clients build lasting financial confidence and security.`,
    badges: ["Succession Planning", "Business Growth", "Financial Advice"],
  },
  {
    id: 4,
    name: "Joel Taylor",
    role: "Head of Growth & Risk",
    image: "/images/Joel Taylor_01.jpg",
    alternativeImage: "/images/Joel Taylor_02.jpg",
    quote: "Strategy turns dreams into reality",
    icon: "star",
    bio: `Joel Taylor is an accomplished financial services executive with 20 years' experience across financial advice, investments, and compliance. As Head of Growth at Walker Lane and a non-voting risk member of the AAC, he plays a key role in maintaining strong regulatory standards and governance frameworks.

A specialist in Best Interests Duty and compliance, Joel has extensive experience designing risk frameworks and organisational structures, establishing and managing multiple investment services, and holding senior leadership roles—including Responsible Manager, General Manager, and Managing Director—across several AFSLs.

His career spans both major institutions such as AMP, TAL, MLC, and CBA, as well as mid-tier AFSLs, giving him a comprehensive perspective on the financial services industry. Joel is recognised as a trusted authority in regulatory compliance, risk management, and financial services leadership.`,
    badges: ["Risk Management", "Compliance", "Strategic Planning"],
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {teamMembers.map((member) => (
            <motion.div
              key={member.id}
              className="relative"
              whileHover="hover"
              initial="initial"
            >
              {/* Image Container */}
              <div className="relative aspect-[3/4] overflow-hidden group">
                {/* Main Image */}
                <Image
                  src={member.image}
                  alt={member.name}
                  width={500}
                  height={500}
                  className={`absolute inset-0 w-full h-full object-cover rounded-md transition-opacity duration-500 ${member.alternativeImage ? 'group-hover:opacity-0 delay-300' : ''
                    }`}
                />

                {/* Alternative Image - shows after silver flash */}
                {member.alternativeImage && (
                  <Image
                    src={member.alternativeImage}
                    alt={member.name}
                    width={500}
                    height={500}
                    className="absolute inset-0 w-full h-full object-cover rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-300"
                  />
                )}

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
                <div className="overflow-y-auto max-h-[60vh] scrollbar-hide">
                  <p className="text-brand-cream text-sm md:text-base leading-relaxed whitespace-pre-line">
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
