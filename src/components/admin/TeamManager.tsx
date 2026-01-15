"use client";

import { useState, useEffect, useRef } from "react";
import { createClient } from "@/utils/client";
import { TeamMember, TeamSection, DEFAULT_TEAM_MEMBER } from "@/lib/team-config";
import toast from "react-hot-toast";
import { Plus, X, Save, Loader2, ArrowUp, ArrowDown, Trash2 } from "lucide-react";
import Image from "next/image";
import { ImageLibrary } from "./ImageLibrary";
import { Modal } from "@/components/ui/Modal";

const supabase = createClient();

// Existing team data from TeamSection.tsx to pre-populate
const EXISTING_TEAM_DATA = [
    {
        name: "Josh Cratchley",
        role: "Chief Executive Officer & Founding Partner",
        image: "/images/Josh Cratchley_02.jpg",
        hoverImage: "/images/Josh Cratchley_05.jpg",
        bio: `With more than 20 years' experience in financial services, Josh pairs strategic expertise with a strong focus on delivering real value to clients and advisers. Starting his career in accounting, he moved into financial advice in 2010 and went on to co-found Plenary Wealth in 2013.

In 2018, Josh co-founded Walker Lane, where he now serves as CEO and Chief Financial Officer. In this dual role, he leads the strategic direction and financial management of the business, while continuing to deliver expert advice to clients. His ability to balance high-level leadership with hands-on advisory work reflects his deep commitment to both the profession and the people he serves.

Recognised for his grounded approach and clear, actionable advice, Josh combines deep technical knowledge with a strong focus on people. His leadership reflects Walker Lane's broader vision—to support and grow exceptional advice businesses built on integrity, trust and meaningful value.`,
        sectionName: "leadership",
    },
    {
        name: "Patrick Casey",
        role: "Chairman & Founding Partner",
        image: "/images/Pat Casey_02.jpg",
        hoverImage: "/images/Pat Casey_03.jpg",
        bio: `Pat Casey is a seasoned financial services executive with over 23 years of experience in wealth management and financial planning. Having held senior leadership roles at Colonial First State and Suncorp Group, he played a key role in transforming their financial advice businesses.

Driven by a desire to make a more personal impact, Pat shifted his focus from large-scale corporate roles to providing strategic advice to individuals and families. His deep expertise in wealth-building strategies and long-term financial planning enables clients to achieve financial freedom with clarity and confidence.

As Co-Founder and Chairman of Walker Lane, he shapes the firm's strategic direction, leveraging his deep expertise in AFSL operations, governance, and regulatory engagement to support the growth and success of high-quality financial advice businesses.`,
        sectionName: "leadership",
    },
    {
        name: "Sam Carroll",
        role: "Responsible Manager & Founding Partner",
        image: "/images/Sam Carroll_01.jpg",
        hoverImage: "/images/Sam Carroll_05.jpg",
        bio: `Sam Carroll is a highly experienced financial services professional with over 20 years in the industry. He began his career in a family-founded financial planning practice with a 29-year legacy, where he developed a strong understanding of business continuity, client relationships, and the lasting value of quality advice. In 2019, he took on full leadership of the firm, successfully guiding its succession and future direction.

As Co-Founder of Walker Lane, Sam helps shape the group's strategic vision and growth. As one of two Responsible Managers on the Walker Lane licence, he is committed to building a strong, supportive community of advice businesses.

In his role as a Financial Adviser, Sam works with a diverse range of clients—from young professionals and families to business owners and retirees. He thrives on simplifying complex financial decisions and providing clear, personalised advice that helps clients build lasting financial confidence and security.`,
        sectionName: "leadership",
    },
    {
        name: "Joel Taylor",
        role: "Head of Growth & Risk",
        image: "/images/Joel Taylor_01.jpg",
        hoverImage: "/images/Joel Taylor_02.jpg",
        bio: `Joel Taylor is an accomplished financial services executive with 20 years' experience across financial advice, investments, and compliance. As Head of Growth at Walker Lane and a non-voting risk member of the AAC, he plays a key role in maintaining strong regulatory standards and governance frameworks.

A specialist in Best Interests Duty and compliance, Joel has extensive experience designing risk frameworks and organisational structures, establishing and managing multiple investment services, and holding senior leadership roles—including Responsible Manager, General Manager, and Managing Director—across several AFSLs.

His career spans both major institutions such as AMP, TAL, MLC, and CBA, as well as mid-tier AFSLs, giving him a comprehensive perspective on the financial services industry. Joel is recognised as a trusted authority in regulatory compliance, risk management, and financial services leadership.`,
        sectionName: "leadership",
    },
];

export function TeamManager() {
    const [teamSections, setTeamSections] = useState<TeamSection[]>([]);
    const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [expandedSection, setExpandedSection] = useState<string | null>(null);
    const [editingSection, setEditingSection] = useState<string | null>(null);
    const [newSectionName, setNewSectionName] = useState("");
    const [newSectionDisplayName, setNewSectionDisplayName] = useState("");
    const [imageLibraryOpen, setImageLibraryOpen] = useState(false);
    const [imageLibraryContext, setImageLibraryContext] = useState<{
        memberId: string;
        imageType: "main" | "hover";
    } | null>(null);
    const imageLibraryButtonRef = useRef<HTMLDivElement>(null);

    // Fetch sections and members
    const fetchData = async () => {
        try {
            setLoading(true);

            // Fetch sections
            const { data: sections, error: sectionsError } = await supabase
                .from("team_sections")
                .select("*")
                .order("order_index", { ascending: true });

            if (sectionsError) throw sectionsError;

            // If no sections exist, create default ones
            if (!sections || sections.length === 0) {
                await createDefaultSections();
                const { data: newSections } = await supabase
                    .from("team_sections")
                    .select("*")
                    .order("order_index", { ascending: true });
                setTeamSections(newSections || []);
            } else {
                setTeamSections(sections);
            }

            // Fetch members
            const { data: members, error: membersError } = await supabase
                .from("team_members")
                .select("*")
                .order("section_id", { ascending: true })
                .order("order_index", { ascending: true });

            if (membersError) throw membersError;

            // If no members exist, pre-populate with existing data
            if (!members || members.length === 0) {
                await prePopulateMembers(sections || []);
                const { data: newMembers } = await supabase
                    .from("team_members")
                    .select("*")
                    .order("section_id", { ascending: true })
                    .order("order_index", { ascending: true });
                setTeamMembers(newMembers || []);
            } else {
                setTeamMembers(members || []);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            toast.error("Failed to load team data");
        } finally {
            setLoading(false);
        }
    };

    // Create default sections
    const createDefaultSections = async () => {
        const defaultSections = [
            { name: "leadership", display_name: "Our Leadership Team", order_index: 0 },
            { name: "advisers", display_name: "Our Advisers", order_index: 1 },
            { name: "associate-advisers", display_name: "Our Associate Advisers", order_index: 2 },
            { name: "operations-team", display_name: "Our Operations Team", order_index: 3 },
            { name: "advice-support-team", display_name: "Our Advice Support Team", order_index: 4 },
            { name: "client-services-team", display_name: "Our Client Services Team", order_index: 5 },
        ];

        const { error } = await supabase.from("team_sections").insert(defaultSections);
        if (error) throw error;
    };

    // Pre-populate with existing team data
    const prePopulateMembers = async (sections: TeamSection[]) => {
        const leadershipSection = sections.find((s) => s.name === "leadership");
        if (!leadershipSection) return;

        const membersToInsert = EXISTING_TEAM_DATA.map((member, index) => ({
            name: member.name,
            role: member.role,
            section_id: leadershipSection.id,
            image_url: member.image,
            hover_image_url: member.hoverImage,
            bio: member.bio,
            qualifications: "",
            email: "",
            phone: "",
            order_index: index,
        }));

        const { error } = await supabase.from("team_members").insert(membersToInsert);
        if (error) throw error;
    };

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Get members by section ID
    const getMembersBySection = (sectionId: string): TeamMember[] => {
        return teamMembers
            .filter((member) => member.section_id === sectionId)
            .sort((a, b) => a.order_index - b.order_index);
    };

    // Update a team member
    const updateMember = (id: string, updates: Partial<TeamMember>) => {
        setTeamMembers((prev) =>
            prev.map((member) => (member.id === id ? { ...member, ...updates } : member))
        );
    };

    // Update a section
    const updateSection = (id: string, updates: Partial<TeamSection>) => {
        setTeamSections((prev) =>
            prev.map((section) => (section.id === id ? { ...section, ...updates } : section))
        );
    };

    // Add new team section
    const addSection = async () => {
        if (!newSectionName.trim() || !newSectionDisplayName.trim()) {
            toast.error("Please enter both section name and display name");
            return;
        }

        try {
            const newSection: Omit<TeamSection, "id" | "created_at" | "updated_at"> = {
                name: newSectionName.trim().toLowerCase().replace(/\s+/g, "-"),
                display_name: newSectionDisplayName.trim(),
                order_index: teamSections.length,
            };

            const { data, error } = await supabase
                .from("team_sections")
                .insert([newSection])
                .select()
                .single();

            if (error) throw error;

            setTeamSections((prev) => [...prev, data]);
            setNewSectionName("");
            setNewSectionDisplayName("");
            toast.success("Section added successfully");
        } catch (error) {
            console.error("Error adding section:", error);
            toast.error("Failed to add section");
        }
    };

    // Delete section
    const deleteSection = async (id: string) => {
        const members = getMembersBySection(id);
        if (members.length > 0) {
            if (!confirm(`This section has ${members.length} member(s). Deleting will remove all members. Continue?`)) {
                return;
            }
        }

        try {
            const { error } = await supabase.from("team_sections").delete().eq("id", id);
            if (error) throw error;

            setTeamSections((prev) => prev.filter((s) => s.id !== id));
            setTeamMembers((prev) => prev.filter((m) => m.section_id !== id));
            toast.success("Section deleted");
        } catch (error) {
            console.error("Error deleting section:", error);
            toast.error("Failed to delete section");
        }
    };

    // Add new team member
    const addMember = (sectionId: string) => {
        const sectionMembers = getMembersBySection(sectionId);
        const newMember: TeamMember = {
            id: `temp-${Date.now()}`,
            ...DEFAULT_TEAM_MEMBER,
            section_id: sectionId,
            order_index: sectionMembers.length,
        };
        setTeamMembers((prev) => [...prev, newMember]);
        setExpandedSection(sectionId);
    };

    // Delete team member
    const deleteMember = async (id: string) => {
        if (!confirm("Are you sure you want to delete this team member?")) return;

        try {
            if (id.startsWith("temp-")) {
                setTeamMembers((prev) => prev.filter((m) => m.id !== id));
                return;
            }

            const { error } = await supabase.from("team_members").delete().eq("id", id);
            if (error) throw error;

            toast.success("Team member deleted");
            await fetchData();
        } catch (error) {
            console.error("Error deleting team member:", error);
            toast.error("Failed to delete team member");
        }
    };

    // Move member up/down
    const moveMember = (id: string, direction: "up" | "down") => {
        setTeamMembers((prev) => {
            const member = prev.find((m) => m.id === id);
            if (!member) return prev;

            const sectionMembers = prev
                .filter((m) => m.section_id === member.section_id)
                .sort((a, b) => a.order_index - b.order_index);

            const currentIndex = sectionMembers.findIndex((m) => m.id === id);
            if (currentIndex === -1) return prev;

            const newIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1;
            if (newIndex < 0 || newIndex >= sectionMembers.length) return prev;

            const targetMember = sectionMembers[newIndex];
            const newOrder = targetMember.order_index;
            const oldOrder = member.order_index;

            return prev.map((m) => {
                if (m.id === id) return { ...m, order_index: newOrder };
                if (m.id === targetMember.id) return { ...m, order_index: oldOrder };
                return m;
            });
        });
    };

    // Handle image selection from library
    const handleImageSelect = (imageUrl: string) => {
        if (imageLibraryContext) {
            const { memberId, imageType } = imageLibraryContext;
            if (imageType === "main") {
                updateMember(memberId, { image_url: imageUrl });
            } else {
                updateMember(memberId, { hover_image_url: imageUrl });
            }
            setImageLibraryOpen(false);
            setImageLibraryContext(null);
        }
    };

    // Open image library for a specific member and image type
    const openImageLibrary = (memberId: string, imageType: "main" | "hover") => {
        setImageLibraryContext({ memberId, imageType });
        setImageLibraryOpen(true);
    };

    // Save all changes
    const handleSave = async () => {
        try {
            setSaving(true);

            // Save sections
            for (const section of teamSections) {
                if (section.id.startsWith("temp-")) {
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    const { id: _id, created_at: _created_at, updated_at: _updated_at, ...data } = section;
                    const { error } = await supabase.from("team_sections").insert([data]);
                    if (error) throw error;
                } else {
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    const { id, created_at: _created_at, updated_at: _updated_at, ...data } = section;
                    const { error } = await supabase
                        .from("team_sections")
                        .update(data)
                        .eq("id", id);
                    if (error) throw error;
                }
            }

            // Save members
            const newMembers = teamMembers.filter((m) => m.id.startsWith("temp-"));
            const existingMembers = teamMembers.filter((m) => !m.id.startsWith("temp-"));

            for (const member of existingMembers) {
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const { id, created_at: _created_at, updated_at: _updated_at, ...data } = member;
                const { error } = await supabase
                    .from("team_members")
                    .update(data)
                    .eq("id", id);
                if (error) throw error;
            }

            if (newMembers.length > 0) {
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const newMembersData = newMembers.map(({ id: _id, created_at: _created_at, updated_at: _updated_at, ...data }) => data);
                const { error } = await supabase.from("team_members").insert(newMembersData);
                if (error) throw error;
            }

            toast.success("All changes saved successfully");
            await fetchData();
        } catch (error) {
            console.error("Error saving:", error);
            toast.error("Failed to save changes");
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center p-12">
                <Loader2 className="w-8 h-8 animate-spin text-brand-brown-dark" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-brand-cream p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-4xl font-kiona text-brand-brown-dark">
                        Team Management
                    </h1>
                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="flex items-center gap-2 px-6 py-3 bg-brand-brown-dark text-brand-cream rounded-md hover:bg-brand-brown-dark/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {saving ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                Saving...
                            </>
                        ) : (
                            <>
                                <Save className="w-5 h-5" />
                                Save All Changes
                            </>
                        )}
                    </button>
                </div>

                {/* Add New Section */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <h2 className="text-xl font-kiona text-brand-brown-dark mb-4">
                        Add New Team Section
                    </h2>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-brand-brown-dark mb-1">
                                Section Name (slug)
                            </label>
                            <input
                                type="text"
                                value={newSectionName}
                                onChange={(e) => setNewSectionName(e.target.value)}
                                placeholder="tech-team"
                                className="w-full px-3 py-2 border border-brand-brown-dark/20 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-brown-dark text-brand-brown-dark"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-brand-brown-dark mb-1">
                                Display Name
                            </label>
                            <input
                                type="text"
                                value={newSectionDisplayName}
                                onChange={(e) => setNewSectionDisplayName(e.target.value)}
                                placeholder="Our Tech Team"
                                className="w-full px-3 py-2 border border-brand-brown-dark/20 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-brown-dark text-brand-brown-dark"
                            />
                        </div>
                    </div>
                    <button
                        onClick={addSection}
                        className="mt-4 flex items-center gap-2 px-4 py-2 bg-brand-brown-dark text-brand-cream rounded-md hover:bg-brand-brown-dark/90 transition-colors"
                    >
                        <Plus className="w-4 h-4" />
                        Add Section
                    </button>
                </div>

                {/* Team Sections */}
                <div className="space-y-6">
                    {teamSections.map((section) => {
                        const members = getMembersBySection(section.id);
                        const isExpanded = expandedSection === section.id;
                        const isEditing = editingSection === section.id;

                        return (
                            <div key={section.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                                {/* Section Header */}
                                <div className="flex items-center justify-between p-6">
                                    <div className="flex-1">
                                        {isEditing ? (
                                            <div className="flex items-center gap-4">
                                                <input
                                                    type="text"
                                                    value={section.display_name}
                                                    onChange={(e) => updateSection(section.id, { display_name: e.target.value })}
                                                    className="text-2xl font-kiona text-brand-brown-dark border border-brand-brown-dark/20 rounded-md px-3 py-1"
                                                    onBlur={() => setEditingSection(null)}
                                                    onKeyDown={(e) => {
                                                        if (e.key === "Enter") setEditingSection(null);
                                                    }}
                                                    autoFocus
                                                />
                                            </div>
                                        ) : (
                                            <h2
                                                className="text-2xl font-kiona text-brand-brown-dark cursor-pointer"
                                                onClick={() => setEditingSection(section.id)}
                                            >
                                                {section.display_name}
                                            </h2>
                                        )}
                                        <p className="text-brand-brown-dark/60 text-sm mt-1">
                                            {members.length} member{members.length !== 1 ? "s" : ""}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => setExpandedSection(isExpanded ? null : section.id)}
                                            className="px-4 py-2 bg-brand-brown-dark/5 text-brand-brown-dark rounded-md hover:bg-brand-brown-dark/10 transition-colors"
                                        >
                                            {isExpanded ? "Collapse" : "Expand"}
                                        </button>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                addMember(section.id);
                                            }}
                                            className="flex items-center gap-2 px-4 py-2 bg-brand-brown-dark text-brand-cream rounded-md hover:bg-brand-brown-dark/90 transition-colors"
                                        >
                                            <Plus className="w-4 h-4" />
                                            Add Member
                                        </button>
                                        <button
                                            onClick={() => deleteSection(section.id)}
                                            className="p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                                            title="Delete Section"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>

                                {/* Section Content */}
                                {isExpanded && (
                                    <div className="border-t border-brand-brown-dark/10 p-6 space-y-4">
                                        {members.length === 0 ? (
                                            <p className="text-center text-brand-brown-dark/60 py-8">
                                                No members in this section. Click &ldquo;Add Member&rdquo; to get started.
                                            </p>
                                        ) : (
                                            members.map((member, index) => (
                                                <div
                                                    key={member.id}
                                                    className="bg-brand-cream rounded-lg p-6 border border-brand-brown-dark/10"
                                                >
                                                    <div className="flex items-start gap-6">
                                                        {/* Images */}
                                                        <div className="flex-shrink-0 space-y-3">
                                                            <div>
                                                                <label className="block text-xs font-medium text-brand-brown-dark mb-1">
                                                                    Main Image
                                                                </label>
                                                                <button
                                                                    type="button"
                                                                    onClick={() => openImageLibrary(member.id, "main")}
                                                                    className="relative w-32 h-32 rounded-lg overflow-hidden bg-brand-brown-dark/10 hover:bg-brand-brown-dark/20 transition-colors cursor-pointer border-2 border-dashed border-brand-brown-dark/30 hover:border-brand-brown-dark/50 group"
                                                                >
                                                                    {member.image_url ? (
                                                                        <Image
                                                                            src={member.image_url}
                                                                            alt={member.name}
                                                                            fill
                                                                            className="object-cover"
                                                                            unoptimized
                                                                        />
                                                                    ) : (
                                                                        <div className="w-full h-full flex flex-col items-center justify-center text-brand-brown-dark/40 text-xs group-hover:text-brand-brown-dark/60">
                                                                            <Plus className="w-6 h-6 mb-1" />
                                                                            <span>Click to select</span>
                                                                        </div>
                                                                    )}
                                                                </button>
                                                                <input
                                                                    type="url"
                                                                    value={member.image_url}
                                                                    onChange={(e) =>
                                                                        updateMember(member.id, { image_url: e.target.value })
                                                                    }
                                                                    placeholder="Or paste image URL"
                                                                    className="w-full mt-2 px-2 py-1 text-xs border border-brand-brown-dark/20 rounded-md focus:outline-none focus:ring-1 focus:ring-brand-brown-dark text-brand-brown-dark"
                                                                />
                                                            </div>
                                                            <div>
                                                                <label className="block text-xs font-medium text-brand-brown-dark mb-1">
                                                                    Hover Image (Optional)
                                                                </label>
                                                                <button
                                                                    type="button"
                                                                    onClick={() => openImageLibrary(member.id, "hover")}
                                                                    className="relative w-32 h-32 rounded-lg overflow-hidden bg-brand-brown-dark/10 hover:bg-brand-brown-dark/20 transition-colors cursor-pointer border-2 border-dashed border-brand-brown-dark/30 hover:border-brand-brown-dark/50 group"
                                                                >
                                                                    {member.hover_image_url ? (
                                                                        <Image
                                                                            src={member.hover_image_url}
                                                                            alt={`${member.name} hover`}
                                                                            fill
                                                                            className="object-cover"
                                                                            unoptimized
                                                                        />
                                                                    ) : (
                                                                        <div className="w-full h-full flex flex-col items-center justify-center text-brand-brown-dark/40 text-xs group-hover:text-brand-brown-dark/60">
                                                                            <Plus className="w-6 h-6 mb-1" />
                                                                            <span>Click to select</span>
                                                                        </div>
                                                                    )}
                                                                </button>
                                                                <input
                                                                    type="url"
                                                                    value={member.hover_image_url}
                                                                    onChange={(e) =>
                                                                        updateMember(member.id, { hover_image_url: e.target.value })
                                                                    }
                                                                    placeholder="Or paste image URL"
                                                                    className="w-full mt-2 px-2 py-1 text-xs border border-brand-brown-dark/20 rounded-md focus:outline-none focus:ring-1 focus:ring-brand-brown-dark text-brand-brown-dark"
                                                                />
                                                            </div>
                                                        </div>

                                                        {/* Member Details */}
                                                        <div className="flex-1 space-y-4">
                                                            <div className="grid grid-cols-2 gap-4">
                                                                <div>
                                                                    <label className="block text-sm font-medium text-brand-brown-dark mb-1">
                                                                        Name *
                                                                    </label>
                                                                    <input
                                                                        type="text"
                                                                        value={member.name}
                                                                        onChange={(e) =>
                                                                            updateMember(member.id, { name: e.target.value })
                                                                        }
                                                                        className="w-full px-3 py-2 border border-brand-brown-dark/20 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-brown-dark text-brand-brown-dark"
                                                                    />
                                                                </div>
                                                                <div>
                                                                    <label className="block text-sm font-medium text-brand-brown-dark mb-1">
                                                                        Role *
                                                                    </label>
                                                                    <input
                                                                        type="text"
                                                                        value={member.role}
                                                                        onChange={(e) =>
                                                                            updateMember(member.id, { role: e.target.value })
                                                                        }
                                                                        className="w-full px-3 py-2 border border-brand-brown-dark/20 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-brown-dark text-brand-brown-dark"
                                                                    />
                                                                </div>
                                                            </div>

                                                            <div>
                                                                <label className="block text-sm font-medium text-brand-brown-dark mb-1">
                                                                    Bio (Optional - if provided, modal will be enabled)
                                                                </label>
                                                                <textarea
                                                                    value={member.bio}
                                                                    onChange={(e) =>
                                                                        updateMember(member.id, { bio: e.target.value })
                                                                    }
                                                                    rows={6}
                                                                    placeholder="Enter bio text. If left empty, the member card will not show a modal popup."
                                                                    className="w-full px-3 py-2 border border-brand-brown-dark/20 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-brown-dark text-brand-brown-dark"
                                                                />
                                                                {member.bio && (
                                                                    <p className="text-xs text-green-600 mt-1">
                                                                        ✓ Bio provided - modal will be enabled
                                                                    </p>
                                                                )}
                                                            </div>

                                                            <div>
                                                                <label className="block text-sm font-medium text-brand-brown-dark mb-1">
                                                                    Qualifications (Optional - one per line)
                                                                </label>
                                                                <textarea
                                                                    value={member.qualifications || ''}
                                                                    onChange={(e) =>
                                                                        updateMember(member.id, { qualifications: e.target.value })
                                                                    }
                                                                    rows={4}
                                                                    placeholder="Enter qualifications, one per line. Example:&#10;Certified Financial Planner (FPAA)&#10;Bachelor of Business (Financial Planning)"
                                                                    className="w-full px-3 py-2 border border-brand-brown-dark/20 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-brown-dark text-brand-brown-dark"
                                                                />
                                                            </div>
                                                        </div>

                                                        {/* Actions */}
                                                        <div className="flex-shrink-0 flex flex-col gap-2">
                                                            <button
                                                                onClick={() => moveMember(member.id, "up")}
                                                                disabled={index === 0}
                                                                className="p-2 border border-brand-brown-dark/20 rounded-md hover:bg-brand-brown-dark/5 disabled:opacity-50 disabled:cursor-not-allowed"
                                                                title="Move up"
                                                            >
                                                                <ArrowUp className="w-4 h-4 text-brand-brown-dark" />
                                                            </button>
                                                            <button
                                                                onClick={() => moveMember(member.id, "down")}
                                                                disabled={index === members.length - 1}
                                                                className="p-2 border border-brand-brown-dark/20 rounded-md hover:bg-brand-brown-dark/5 disabled:opacity-50 disabled:cursor-not-allowed"
                                                                title="Move down"
                                                            >
                                                                <ArrowDown className="w-4 h-4 text-brand-brown-dark" />
                                                            </button>
                                                            <button
                                                                onClick={() => deleteMember(member.id)}
                                                                className="p-2 border border-red-300 text-red-600 rounded-md hover:bg-red-50"
                                                                title="Delete"
                                                            >
                                                                <X className="w-4 h-4" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Image Library Modal */}
            {imageLibraryOpen && (
                <Modal
                    isOpen={imageLibraryOpen}
                    onClose={() => {
                        setImageLibraryOpen(false);
                        setImageLibraryContext(null);
                    }}
                    title="Select Image"
                    buttonRef={imageLibraryButtonRef}
                >
                    <ImageLibrary
                        onSelect={handleImageSelect}
                        onClose={() => {
                            setImageLibraryOpen(false);
                            setImageLibraryContext(null);
                        }}
                    />
                </Modal>
            )}
        </div>
    );
}
