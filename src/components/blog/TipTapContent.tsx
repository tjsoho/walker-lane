"use client";

import { generateHTML } from "@tiptap/html";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import TextAlign from "@tiptap/extension-text-align";
import { Color } from "@tiptap/extension-color";
import TextStyle from "@tiptap/extension-text-style";
import { FontFamily } from "@tiptap/extension-font-family";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";

// Must include every extension the blog editor (TipTapEditor) can save,
// or generateHTML throws and the raw JSON would be shown instead.
const extensions = [
  StarterKit,
  Image,
  TextAlign.configure({
    types: ["heading", "paragraph"],
  }),
  TextStyle,
  Color,
  FontFamily,
  Link,
  Underline,
];

export function TipTapContent({ content }: { content: string }) {
  let html = content;

  if (content.trim().startsWith("{")) {
    // Stored as TipTap JSON — render it to HTML
    try {
      html = generateHTML(JSON.parse(content), extensions);
    } catch (error) {
      // Never fall through to printing raw JSON on the page
      console.error("Failed to render blog content:", error);
      html = "";
    }
  }
  // Otherwise the content is legacy HTML and is rendered as-is

  return (
    <div
      className="tiptap-content"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
