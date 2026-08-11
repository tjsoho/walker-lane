"use client";

import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import { Edit2, X } from "lucide-react";
import toast from "react-hot-toast";

interface SectionComponentProps {
  isPreview?: boolean;
  content?: Record<string, string>;
  isEditing?: boolean;
  onUpdate?: (id: string, value: string) => void;
}

interface SectionEditorProps {
  pageId: string;
  sectionId: string;
  section: {
    id: string;
    content: Record<string, unknown>;
    // add other section properties
  };
  // add other props
}

export function PageSectionEditor({
  pageId,
  sectionId,
}: SectionEditorProps) {
  const [content, setContent] = useState<Record<string, string> | null>(null);
  const [Component, setComponent] = useState<React.ComponentType<SectionComponentProps> | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const loadSection = useCallback(async () => {
    setLoading(true);
    setLoadError(null);
    try {
      const section = await import(
        `@/app/(pages)/${pageId}/sections/${sectionId}.tsx`
      );

      // Sections export their component under different names, so take the
      // default export or the first exported function.
      const component =
        section.default ??
        Object.values(section).find((value) => typeof value === "function");

      if (!component) {
        throw new Error(`No component exported by ${sectionId}`);
      }
      setComponent(() => component as React.ComponentType<SectionComponentProps>);

      const { data, error } = await supabase
        .from("page_content")
        .select("content")
        .eq("page_id", pageId)
        .eq("section_id", sectionId)
        .maybeSingle();

      if (error) throw error;

      if (data) {
        setContent(data.content);
      } else {
        const { data: newData, error: insertError } = await supabase
          .from("page_content")
          .insert({
            page_id: pageId,
            section_id: sectionId,
            content: section.defaultContent ?? {},
          })
          .select("content")
          .single();

        if (insertError) throw insertError;
        setContent(newData.content);
      }
    } catch (error) {
      console.error("Error loading section:", error);
      setLoadError(
        error instanceof Error ? error.message : "Failed to load section"
      );
    } finally {
      setLoading(false);
    }
  }, [pageId, sectionId]);

  useEffect(() => {
    loadSection();
  }, [loadSection]);

  async function handleUpdate(id: string, value: string) {
    const newContent = {
      ...content,
      [id]: value,
    };

    try {
      const { error } = await supabase
        .from("page_content")
        .update({ content: newContent })
        .eq("page_id", pageId)
        .eq("section_id", sectionId);

      if (error) throw error;

      setContent(newContent);
      toast.success("Changes saved successfully");
    } catch (error) {
      console.error("Error saving changes:", error);
      toast.error("Failed to save changes");
    }
  }

  if (loadError) {
    return (
      <div className="p-8 text-center">
        <p className="text-red-600 mb-2">Couldn&apos;t load this section.</p>
        <p className="text-brand-brown-dark/70 text-sm mb-4">{loadError}</p>
        <button
          onClick={() => loadSection()}
          className="px-4 py-2 bg-brand-brown-dark text-white rounded-md hover:bg-brand-brown-dark/90"
        >
          Retry
        </button>
      </div>
    );
  }

  if (loading || !Component || !content) {
    return <div className="text-brand-brown-dark">Loading...</div>;
  }

  return (
    <div className="relative">
      {/* Edit Button */}
      <button
        onClick={() => setIsEditing(true)}
        className="fixed bottom-8 right-8 bg-brand-brown-dark text-white p-4 rounded-full shadow-lg hover:bg-brand-brown-dark/90 z-50"
      >
        <Edit2 className="w-6 h-6" />
      </button>

      {/* Preview */}
      <Component content={content} />

      {/* Edit Modal */}
      {isEditing && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl m-4 p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-brand-brown-dark">
                Edit Section Content
              </h3>
              <button
                onClick={() => setIsEditing(false)}
                className="text-brand-brown-dark/60 hover:text-brand-brown-dark"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4">
              {Object.keys(content).length === 0 && (
                <p className="text-brand-brown-dark/70">
                  This section doesn&apos;t have editable content yet.
                </p>
              )}
              {Object.entries(content).map(([key, value]) => (
                <div key={key}>
                  <label className="block text-sm font-medium text-brand-brown-dark mb-2">
                    {key
                      .split("-")
                      .map(
                        (word) => word.charAt(0).toUpperCase() + word.slice(1)
                      )
                      .join(" ")}
                  </label>
                  <textarea
                    value={value}
                    onChange={(e) => handleUpdate(key, e.target.value)}
                    className="w-full px-3 py-2 border border-brand-brown-dark/20 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-brown-dark"
                    rows={3}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
