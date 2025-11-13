"use client";

import { HeroSection } from "./sections/HeroSection";
import TeamSection from "./sections/TeamSection";

import { ExpertiseSection } from "./sections/ExpertiseSection";
import { ContactSection } from "./sections/ContactSection";
import { WhoWeAreSection } from "./sections/WhoWeAreSection";
import { ClientFocusSection } from "./sections/ClientFocusSection";
import { AdvisorBenefitsSection } from "./sections/AdvisorBenefitsSection";
import { OurOfferSection } from "./sections/OurOfferSection";

export default function AdvisorsPage() {
    return (
        <main className="min-h-screen bg-brand-cream">
            <HeroSection />
            <WhoWeAreSection />
            <AdvisorBenefitsSection />
            <ClientFocusSection />
            <TeamSection />
            <OurOfferSection />
            
            <ExpertiseSection />
            <ContactSection />
            
             {/* 
            
            <ClientFocusSection />
            <TeamSection />
            <OurOfferSection />
            
            <ExpertiseSection />
             <ContactSection />  */}
        </main>
    );
} 