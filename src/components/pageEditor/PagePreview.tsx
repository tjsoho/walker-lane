"use client";

import { useEffect, useState } from "react";

interface SectionComponentProps {
  isPreview?: boolean;
  content?: Record<string, string>;
  isEditing?: boolean;
  onUpdate?: (id: string, value: string) => void;
}

interface PagePreviewProps {
  pageId: string;
  sectionId: string;
  content?: {
    title?: string;
    sections?: Array<{
      id: string;
      content: Record<string, unknown>;
    }>;
  };
}

export function PagePreview({ pageId, sectionId }: PagePreviewProps) {
  const [Component, setComponent] = useState<React.ComponentType<SectionComponentProps> | null>(null);

  useEffect(() => {
    // Dynamically import the section component
    const loadComponent = async () => {
      try {
        const section = await import(
          `@/app/(pages)/${pageId}/sections/${sectionId}`
        );
        setComponent(() => section.default);
      } catch (error) {
        console.error("Error loading component:", error);
      }
    };

    loadComponent();
  }, [pageId, sectionId]);

  if (!Component) return <div>Loading preview...</div>;

  return (
    <div className="bg-white rounded-md shadow-md overflow-hidden">
      <Component isPreview />
    </div>
  );
} 