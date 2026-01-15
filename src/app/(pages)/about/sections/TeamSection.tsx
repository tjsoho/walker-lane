"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Modal } from "@/components/ui/Modal";
import { createClient } from "@/utils/client";
import { TeamMember, TeamSection } from "@/lib/team-config";

const supabase = createClient();

interface TeamMemberWithSection extends TeamMember {
  section: TeamSection;
}

const TeamSectionComponent = () => {
  const [teamData, setTeamData] = useState<TeamMemberWithSection[]>([]);
  const [sections, setSections] = useState<TeamSection[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMember, setSelectedMember] = useState<TeamMemberWithSection | null>(null);
  const memberRef = useRef<HTMLDivElement>(null);
  const bioScrollRef = useRef<HTMLDivElement>(null);
  const mobileScrollRef = useRef<HTMLDivElement>(null);
  const [isAtBottom, setIsAtBottom] = useState(false);

  // Fetch team data from database
  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        setLoading(true);

        // Fetch sections
        const { data: sectionsData, error: sectionsError } = await supabase
          .from("team_sections")
          .select("*")
          .order("order_index", { ascending: true });

        if (sectionsError) throw sectionsError;

        // Fetch members
        const { data: membersData, error: membersError } = await supabase
          .from("team_members")
          .select("*")
          .order("section_id", { ascending: true })
          .order("order_index", { ascending: true });

        if (membersError) throw membersError;

        // Combine members with their sections
        const membersWithSections: TeamMemberWithSection[] =
          (membersData || []).map((member) => {
            const section = (sectionsData || []).find((s) => s.id === member.section_id);
            return {
              ...member,
              section: section || ({} as TeamSection),
            };
          });

        setSections(sectionsData || []);
        setTeamData(membersWithSections);
      } catch (error) {
        console.error("Error fetching team data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeamData();
  }, []);

  // Get members by section
  const getMembersBySection = (sectionId: string): TeamMemberWithSection[] => {
    return teamData
      .filter((member) => member.section_id === sectionId)
      .sort((a, b) => a.order_index - b.order_index);
  };

  // Check scroll position
  useEffect(() => {
    if (!selectedMember) return;

    const getScrollElement = () => {
      const isMobile = window.innerWidth < 768;
      return isMobile ? mobileScrollRef.current : bioScrollRef.current;
    };

    const checkScrollPosition = () => {
      const element = getScrollElement();
      if (!element) return;
      const { scrollTop, scrollHeight, clientHeight } = element;
      const distanceFromBottom = scrollHeight - (scrollTop + clientHeight);
      const isBottom = distanceFromBottom <= 10;
      setIsAtBottom(isBottom);
    };

    const handleScroll = () => {
      requestAnimationFrame(checkScrollPosition);
    };

    const handleResize = () => {
      setTimeout(checkScrollPosition, 100);
    };

    const mobileElement = mobileScrollRef.current;
    const bioElement = bioScrollRef.current;

    if (mobileElement) {
      mobileElement.addEventListener("scroll", handleScroll, { passive: true });
    }
    if (bioElement) {
      bioElement.addEventListener("scroll", handleScroll, { passive: true });
    }
    window.addEventListener("resize", handleResize);

    checkScrollPosition();
    const timeout1 = setTimeout(checkScrollPosition, 100);
    const timeout2 = setTimeout(checkScrollPosition, 300);

    return () => {
      if (mobileElement) {
        mobileElement.removeEventListener("scroll", handleScroll);
      }
      if (bioElement) {
        bioElement.removeEventListener("scroll", handleScroll);
      }
      window.removeEventListener("resize", handleResize);
      clearTimeout(timeout1);
      clearTimeout(timeout2);
    };
  }, [selectedMember]);

  const handleScrollClick = () => {
    const isMobile = window.innerWidth < 768;
    const scrollElement = isMobile
      ? mobileScrollRef.current
      : bioScrollRef.current;
    if (!scrollElement) return;

    if (isAtBottom) {
      scrollElement.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      scrollElement.scrollTo({
        top: scrollElement.scrollHeight,
        behavior: "smooth",
      });
    }

    setTimeout(() => {
      if (!scrollElement) return;
      const { scrollTop, scrollHeight, clientHeight } = scrollElement;
      const distanceFromBottom = scrollHeight - (scrollTop + clientHeight);
      const isBottom = distanceFromBottom <= 10;
      setIsAtBottom(isBottom);
    }, 600);
  };

  if (loading) {
    return (
      <section className="bg-brand-cream py-24">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-brand-brown-dark">Loading team...</p>
          </div>
        </div>
      </section>
    );
  }

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

        {/* Team Sections */}
        {sections.map((section) => {
          const members = getMembersBySection(section.id);
          if (members.length === 0) return null;

          return (
            <div key={section.id} className="mb-16">
              {/* Section Heading */}
              <h3 className="text-3xl md:text-4xl font-kiona text-brand-brown-dark mb-8 text-center">
                {section.display_name}
              </h3>

              {/* Team Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
                {members.map((member) => (
                  <div key={member.id} className="relative">
                    {/* Image Container */}
                    <div className="relative aspect-[3/4] overflow-hidden group">
                      {/* Main Image */}
                      <Image
                        src={member.image_url || "/placeholder.jpg"}
                        alt={member.name}
                        width={800}
                        height={800}
                        style={{
                          willChange: "opacity",
                          transform: "translateZ(0)",
                          filter: "blur(0.0001px)",
                        }}
                        className={`absolute inset-0 w-full h-full object-cover rounded-md transition-opacity duration-500 ${member.hover_image_url
                          ? "group-hover:opacity-0 delay-300"
                          : ""
                          }`}
                      />

                      {/* Hover Image - shows after silver flash */}
                      {member.hover_image_url && (
                        <Image
                          src={member.hover_image_url}
                          alt={member.name}
                          width={800}
                          height={800}
                          loading="eager"
                          style={{
                            willChange: "opacity",
                            transform: "translateZ(0)",
                            filter: "blur(0.0001px)",
                          }}
                          className="absolute inset-0 w-full h-full object-cover rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-300"
                        />
                      )}

                      {/* Quick Silver Flash */}
                      <div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/80 to-transparent
                        opacity-0 group-hover:opacity-100 -translate-x-full group-hover:translate-x-full
                        transition-all duration-500 ease-in-out"
                      />
                    </div>

                    {/* Name, Role and Plus Button Container */}
                    <div className="mt-4 flex justify-between items-center">
                      <div className="text-left">
                        <h3 className="text-[#4A3419] text-xl font-kiona">
                          {member.name}
                        </h3>
                        <p className="text-gray-600 font-ttNorms">{member.role}</p>
                      </div>

                      {/* Plus Button - only show if bio exists */}
                      {member.bio && member.bio.trim() && (
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
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        {/* Modal - only show if member has bio */}
        {selectedMember && selectedMember.bio && selectedMember.bio.trim() && (
          <Modal
            isOpen={true}
            onClose={() => setSelectedMember(null)}
            title={selectedMember.name}
            buttonRef={memberRef}
          >
            {/* Mobile: Entire container scrollable */}
            <div
              ref={mobileScrollRef}
              className="md:hidden overflow-y-auto overflow-x-hidden max-h-[70vh] scrollbar-hide relative w-full"
            >
              <div className="flex flex-col gap-4 pb-12 w-full">
                {/* Image */}
                <div className="relative w-full max-w-64 mx-auto aspect-[3/4]">
                  <Image
                    src={selectedMember.image_url || "/placeholder.jpg"}
                    alt={selectedMember.name}
                    fill
                    className="object-contain"
                  />
                </div>

                {/* Role */}
                <div className="border-b border-brand-cream/20 pb-3">
                  <p className="text-brand-cream/80 text-base font-medium">
                    {selectedMember.role}
                  </p>
                </div>

                {/* Bio */}
                <div>
                  <p className="text-brand-cream text-sm leading-relaxed whitespace-pre-line">
                    {selectedMember.bio}
                  </p>
                </div>

                {/* Qualifications */}
                {selectedMember.qualifications && selectedMember.qualifications.trim() && (
                  <div className="border-t border-brand-cream/20 pt-4">
                    <h4 className="text-brand-cream font-semibold text-base mb-3">
                      Qualifications
                    </h4>
                    <ul className="space-y-2">
                      {selectedMember.qualifications
                        .split('\n')
                        .filter((q) => q.trim())
                        .map((qualification, idx) => (
                          <li key={idx} className="text-brand-cream text-sm leading-relaxed flex items-start">
                            <span className="text-brand-cream mr-2 mt-1.5">•</span>
                            <span>{qualification.trim()}</span>
                          </li>
                        ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Scroll Arrow Button - Mobile */}
              <button
                onClick={handleScrollClick}
                className="fixed bottom-4 right-4 w-8 h-8 rounded-full border border-brand-cream/40 bg-brand-cream/10 hover:bg-brand-cream/20 transition-all duration-300 flex items-center justify-center group z-10"
                aria-label={isAtBottom ? "Scroll to top" : "Scroll to bottom"}
              >
                <svg
                  className={`w-4 h-4 text-brand-cream transition-transform duration-300 ${isAtBottom ? "rotate-180" : ""
                    }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
            </div>

            {/* Desktop: Only bio section scrollable */}
            <div className="hidden md:flex flex-row gap-4 md:gap-6 lg:gap-8 overflow-x-hidden w-full">
              {/* Image - Left Side */}
              <div className="relative w-64 md:w-72 lg:w-80 md:flex-shrink-0 aspect-[3/4] md:aspect-auto md:h-auto md:min-h-[400px]">
                <Image
                  src={selectedMember.image_url || "/placeholder.jpg"}
                  alt={selectedMember.name}
                  fill
                  className="object-contain"
                />
              </div>

              {/* Content - Right Side */}
              <div className="flex-1 space-y-3 md:space-y-4 min-w-0 relative">
                {/* Role */}
                <div className="border-b border-brand-cream/20 pb-3 md:pb-4">
                  <p className="text-brand-cream/80 text-base md:text-lg font-medium">
                    {selectedMember.role}
                  </p>
                </div>

                {/* Bio */}
                <div
                  ref={bioScrollRef}
                  className="overflow-y-auto max-h-[60vh] scrollbar-hide pr-10"
                >
                  <p className="text-brand-cream text-sm md:text-base leading-relaxed whitespace-pre-line">
                    {selectedMember.bio}
                  </p>

                  {/* Qualifications */}
                  {selectedMember.qualifications && selectedMember.qualifications.trim() && (
                    <div className="border-t border-brand-cream/20 pt-4 mt-4">
                      <h4 className="text-brand-cream font-semibold text-base md:text-lg mb-3">
                        Qualifications
                      </h4>
                      <ul className="space-y-2">
                        {selectedMember.qualifications
                          .split('\n')
                          .filter((q) => q.trim())
                          .map((qualification, idx) => (
                            <li key={idx} className="text-brand-cream text-sm md:text-base leading-relaxed flex items-start">
                              <span className="text-brand-cream mr-2 mt-1.5">•</span>
                              <span>{qualification.trim()}</span>
                            </li>
                          ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Scroll Arrow Button - Desktop */}
                <button
                  onClick={handleScrollClick}
                  className="absolute bottom-2 right-2 w-8 h-8 rounded-full border border-brand-cream/40 bg-brand-cream/10 hover:bg-brand-cream/20 transition-all duration-300 flex items-center justify-center group z-10"
                  aria-label={isAtBottom ? "Scroll to top" : "Scroll to bottom"}
                >
                  <svg
                    className={`w-4 h-4 text-brand-cream transition-transform duration-300 ${isAtBottom ? "rotate-180" : ""
                      }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </Modal>
        )}
      </div>
    </section>
  );
};

export default TeamSectionComponent;
export { TeamSectionComponent as TeamSection };
