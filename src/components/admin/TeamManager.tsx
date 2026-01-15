"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/utils/client";
import { TeamMember, TeamSection, TEAM_SECTIONS, DEFAULT_TEAM_MEMBERS } from "@/lib/team-config";
import toast from "react-hot-toast";
import { Plus, X, Save, Loader2, ArrowUp, ArrowDown } from "lucide-react";
import Image from "next/image";

const supabase = createClient();

export function TeamManager() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [expandedSection, setExpandedSection] = useState<TeamSection | null>(null);

  // Fetch team members from database
  const fetchTeamMembers = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("team_members")
        .select("*")
        .order("section", { ascending: true })
        .order("order_index", { ascending: true });

      if (error) throw error;
      setTeamMembers(data || []);
    } catch (error) {
      console.error("Error fetching team members:", error);
      toast.error("Failed to load team members");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  // Get members by section
  const getMembersBySection = (section: TeamSection): TeamMember[] => {
    return teamMembers
      .filter((member) => member.section === section)
      .sort((a, b) => a.order_index - b.order_index);
  };

  // Update a team member
  const updateMember = (id: string, updates: Partial<TeamMember>) => {
    setTeamMembers((prev) =>
      prev.map((member) => (member.id === id ? { ...member, ...updates } : member))
    );
  };

  // Add new team member
  const addMember = (section: TeamSection) => {
    const sectionMembers = getMembersBySection(section);
    const newMember: TeamMember = {
      id: `temp-${Date.now()}`,
      ...DEFAULT_TEAM_MEMBERS,
      section,
      order_index: sectionMembers.length,
    };
    setTeamMembers((prev) => [...prev, newMember]);
    setExpandedSection(section);
  };

  // Delete team member
  const deleteMember = async (id: string) => {
    if (!confirm("Are you sure you want to delete this team member?")) return;

    try {
      // If it's a temporary ID, just remove from state
      if (id.startsWith("temp-")) {
        setTeamMembers((prev) => prev.filter((m) => m.id !== id));
        return;
      }

      const { error } = await supabase.from("team_members").delete().eq("id", id);
      if (error) throw error;

      toast.success("Team member deleted");
      await fetchTeamMembers();
    } catch (error) {
      console.error("Error deleting team member:", error);
      toast.error("Failed to delete team member");
    }
  };

  // Move member up/down in order
  const moveMember = (id: string, direction: "up" | "down") => {
    setTeamMembers((prev) => {
      const member = prev.find((m) => m.id === id);
      if (!member) return prev;

      const sectionMembers = prev
        .filter((m) => m.section === member.section)
        .sort((a, b) => a.order_index - b.order_index);

      const currentIndex = sectionMembers.findIndex((m) => m.id === id);
      if (currentIndex === -1) return prev;

      const newIndex =
        direction === "up" ? currentIndex - 1 : currentIndex + 1;

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

  // Save all changes
  const handleSave = async () => {
    try {
      setSaving(true);

      // Separate new and existing members
      const newMembers = teamMembers.filter((m) => m.id.startsWith("temp-"));
      const existingMembers = teamMembers.filter((m) => !m.id.startsWith("temp-"));

      // Update existing members
      for (const member of existingMembers) {
        const { id, created_at, updated_at, ...updateData } = member;
        const { error } = await supabase
          .from("team_members")
          .update(updateData)
          .eq("id", id);

        if (error) throw error;
      }

      // Insert new members
      if (newMembers.length > 0) {
        const newMembersData = newMembers.map(({ id, created_at, updated_at, ...data }) => data);
        const { error } = await supabase
          .from("team_members")
          .insert(newMembersData);

        if (error) throw error;
      }

      toast.success("Team members saved successfully");
      await fetchTeamMembers();
    } catch (error) {
      console.error("Error saving team members:", error);
      toast.error("Failed to save team members");
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

        {/* Team Sections */}
        <div className="space-y-6">
          {TEAM_SECTIONS.map((section) => {
            const members = getMembersBySection(section);
            const isExpanded = expandedSection === section.value;

            return (
              <div
                key={section.value}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                {/* Section Header */}
                <div
                  className="flex items-center justify-between p-6 cursor-pointer hover:bg-brand-cream/50 transition-colors"
                  onClick={() =>
                    setExpandedSection(isExpanded ? null : section.value)
                  }
                >
                  <div>
                    <h2 className="text-2xl font-kiona text-brand-brown-dark">
                      {section.label}
                    </h2>
                    <p className="text-brand-brown-dark/60 text-sm mt-1">
                      {members.length} member{members.length !== 1 ? "s" : ""}
                    </p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addMember(section.value);
                    }}
                    className="flex items-center gap-2 px-4 py-2 bg-brand-brown-dark text-brand-cream rounded-md hover:bg-brand-brown-dark/90 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    Add Member
                  </button>
                </div>

                {/* Section Content */}
                {isExpanded && (
                  <div className="border-t border-brand-brown-dark/10 p-6 space-y-4">
                    {members.length === 0 ? (
                      <p className="text-center text-brand-brown-dark/60 py-8">
                        No members in this section. Click "Add Member" to get started.
                      </p>
                    ) : (
                      members.map((member, index) => (
                        <div
                          key={member.id}
                          className="bg-brand-cream rounded-lg p-6 border border-brand-brown-dark/10"
                        >
                          <div className="flex items-start gap-6">
                            {/* Image */}
                            <div className="flex-shrink-0">
                              <div className="relative w-32 h-32 rounded-lg overflow-hidden bg-brand-brown-dark/10">
                                {member.image_url ? (
                                  <Image
                                    src={member.image_url}
                                    alt={member.name}
                                    fill
                                    className="object-cover"
                                    unoptimized
                                  />
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center text-brand-brown-dark/40">
                                    No Image
                                  </div>
                                )}
                              </div>
                              <input
                                type="url"
                                value={member.image_url}
                                onChange={(e) =>
                                  updateMember(member.id, {
                                    image_url: e.target.value,
                                  })
                                }
                                placeholder="Image URL"
                                className="w-full mt-2 px-3 py-1.5 text-sm border border-brand-brown-dark/20 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-brown-dark"
                              />
                            </div>

                            {/* Member Details */}
                            <div className="flex-1 space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <label className="block text-sm font-medium text-brand-brown-dark mb-1">
                                    Name
                                  </label>
                                  <input
                                    type="text"
                                    value={member.name}
                                    onChange={(e) =>
                                      updateMember(member.id, { name: e.target.value })
                                    }
                                    className="w-full px-3 py-2 border border-brand-brown-dark/20 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-brown-dark"
                                  />
                                </div>
                                <div>
                                  <label className="block text-sm font-medium text-brand-brown-dark mb-1">
                                    Role
                                  </label>
                                  <input
                                    type="text"
                                    value={member.role}
                                    onChange={(e) =>
                                      updateMember(member.id, { role: e.target.value })
                                    }
                                    className="w-full px-3 py-2 border border-brand-brown-dark/20 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-brown-dark"
                                  />
                                </div>
                              </div>

                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <label className="block text-sm font-medium text-brand-brown-dark mb-1">
                                    Email
                                  </label>
                                  <input
                                    type="email"
                                    value={member.email}
                                    onChange={(e) =>
                                      updateMember(member.id, { email: e.target.value })
                                    }
                                    className="w-full px-3 py-2 border border-brand-brown-dark/20 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-brown-dark"
                                  />
                                </div>
                                <div>
                                  <label className="block text-sm font-medium text-brand-brown-dark mb-1">
                                    Phone
                                  </label>
                                  <input
                                    type="tel"
                                    value={member.phone}
                                    onChange={(e) =>
                                      updateMember(member.id, { phone: e.target.value })
                                    }
                                    className="w-full px-3 py-2 border border-brand-brown-dark/20 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-brown-dark"
                                  />
                                </div>
                              </div>

                              <div>
                                <label className="block text-sm font-medium text-brand-brown-dark mb-1">
                                  Bio
                                </label>
                                <textarea
                                  value={member.bio}
                                  onChange={(e) =>
                                    updateMember(member.id, { bio: e.target.value })
                                  }
                                  rows={3}
                                  className="w-full px-3 py-2 border border-brand-brown-dark/20 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-brown-dark"
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
                                <ArrowUp className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => moveMember(member.id, "down")}
                                disabled={index === members.length - 1}
                                className="p-2 border border-brand-brown-dark/20 rounded-md hover:bg-brand-brown-dark/5 disabled:opacity-50 disabled:cursor-not-allowed"
                                title="Move down"
                              >
                                <ArrowDown className="w-4 h-4" />
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
    </div>
  );
}

