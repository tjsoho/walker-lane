"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";


type ServiceItem = {
  id: string;
  title: string;
  description: string;
  image: string;
};

export function ServicesMenuSection() {
  const services: ServiceItem[] = [
    {
      id: "philosophy",
      title: "Our Philosophy",
      description:
        "We exist to guide our clients to live a rich and full life. That richness is about so much more than money. It is also about happiness, health and family. We are passionate about building trusted, long-term relationships with our clients, and supporting them to achieve the life they want.",
      image: "/images/family-gathering.jpg",
    },
    {
      id: "clients",
      title: "Our Clients",
      description:
        "We work with individuals and families who value professional guidance and seek a trusted partner in their financial journey. Our clients range from young professionals to established executives, each with unique goals and aspirations.",
      image: "/images/client-meeting.jpg",
    },
    {
      id: "framework",
      title: "Our Advice Framework",
      description:
        "Our comprehensive advice framework ensures we address every aspect of your financial life. From investment strategy to retirement planning, we take a systematic approach to helping you achieve your goals.",
      image: "/images/planning-session.jpg",
    },
    {
      id: "services",
      title: "Our Services",
      description:
        "From wealth management to estate planning, our services are designed to provide you with comprehensive financial guidance. We offer personalized solutions that adapt to your changing needs and circumstances.",
      image: "/images/advisory-meeting.jpg",
    },
  ];

  const [activeService, setActiveService] = useState(services[0]);

  return (
    <section className="pb-24 px-4 bg-brand-cream">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <h2 className="text-sm uppercase tracking-wider text-brand-blue mb-6">
            Our Work
          </h2>
          <h3 className="text-4xl md:text-5xl text-brand-blue font-light mb-4">
            Advice to help guide our clients
            <br />
            and manage complexity
          </h3>
        </div>

        <div className="grid md:grid-cols-12 gap-8">
          {/* Left Menu */}
          <div className="md:col-span-3">
            <div className="space-y-4">
              {services.map((service) => (
                <button
                  key={service.id}
                  onClick={() => setActiveService(service)}
                  className={`text-left w-full py-2 border-l-4 pl-4 transition-all ${
                    activeService.id === service.id
                      ? "border-brand-blue text-brand-blue"
                      : "border-transparent text-gray-600 hover:border-gray-300"
                  }`}
                >
                  {service.title}
                </button>
              ))}
            </div>
          </div>

          {/* Right Content */}
          <div className="md:col-span-9">
            <motion.div
              key={activeService.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              <div className="relative h-[400px] w-full">
                <Image
                  src={activeService.image}
                  alt={activeService.title}
                  fill
                  className="object-cover rounded-lg"
                  priority
                />
              </div>
              <div className="space-y-4">
                <h4 className="text-3xl text-brand-blue">
                  {activeService.title}
                </h4>
                <p className="text-lg text-gray-600 leading-relaxed">
                  {activeService.description}
                </p>
               
                
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
