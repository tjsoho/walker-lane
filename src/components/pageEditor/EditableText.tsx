"use client";

interface EditableTextProps {
  id: string;
  type: "heading" | "paragraph" | "subtext";
  /** When type is "heading", which level to render (default 1). */
  headingLevel?: 1 | 2;
  content: string;
  isEditing?: boolean;
  onUpdate?: (id: string, value: string) => void;
}

export function EditableText({
  id,
  type,
  headingLevel = 1,
  content,
  isEditing,
  onUpdate,
}: EditableTextProps) {
  if (!isEditing) {
    // Regular display mode - using original text colors
    switch (type) {
      case "heading": {
        const className =
          "text-5xl md:text-7xl mb-4 font-kiona text-brand-brown-light";
        if (headingLevel === 2) {
          return <h2 className={className}>{content || "No content"}</h2>;
        }
        return <h1 className={className}>{content || "No content"}</h1>;
      }
      case "paragraph":
        return (
          <p className="text-lg md:text-2xl mb-12 max-w-3xl mx-auto leading-none font-inter text-brand-cream ">
            {content || "No content"}
          </p>
        );
      case "subtext":
        return (
          <p className="text-3xl mb-8 max-w-2xl mx-auto ">
            {content || "No content"}
          </p>
        );
      default:
        return <div>Invalid type</div>;
    }
  }

  // Edit mode - keep dark text for better visibility
  return (
    <div className="mb-4">
      <label className="block text-sm  mb-2 font-semibold">
        {id
          .split("-")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ")}
      </label>
      <textarea
        value={content || ""}
        onChange={(e) => onUpdate?.(id, e.target.value)}
        className="w-full px-3 py-2 border border-brand-brown-dark/20 rounded-md text-brand-brown-dark"
        rows={type === "paragraph" ? 4 : 2}
      />
    </div>
  );
}
