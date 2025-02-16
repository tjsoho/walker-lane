"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { TipTapEditor } from "./TipTapEditor";
import toast from "react-hot-toast";
import Link from "next/link";
import Image from "next/image";

interface BlogPost {
  title: string;
  subtitle: string;
  content: string;
  tags: string[];
  image_url: string;
}

export function BlogEditor() {
  const [post, setPost] = useState<BlogPost>({
    title: "",
    subtitle: "",
    content: "",
    tags: [],
    image_url: "",
  });
  const [tagInput, setTagInput] = useState("");
  const [imageLoading, setImageLoading] = useState(false);

  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault();
      if (!post.tags.includes(tagInput.trim())) {
        setPost((prev) => ({
          ...prev,
          tags: [...prev.tags, tagInput.trim()],
        }));
      }
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setPost((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = e.target.files?.[0];
      if (!file) return;

      // Check file size (limit to 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image must be less than 5MB");
        return;
      }

      setImageLoading(true);
      toast.loading("Uploading image...", { id: "imageUpload" });

      const fileExt = file.name.split(".").pop();
      // Create a more unique filename
      const fileName = `${Date.now()}-${Math.random()
        .toString(36)
        .substring(7)}.${fileExt}`;
      // Add the folder path
      const filePath = `blog-images/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("blog-images") // bucket name
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (uploadError) {
        console.error("Upload error:", uploadError);
        throw uploadError;
      }

      const {
        data: { publicUrl },
      } = supabase.storage.from("blog-images").getPublicUrl(filePath);

      setPost((prev) => ({ ...prev, image_url: publicUrl }));
      toast.success("Image uploaded successfully", { id: "imageUpload" });
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to upload image",
        { id: "imageUpload" }
      );
    } finally {
      setImageLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-cream p-8">
      <div className="max-w-7xl mx-auto mt-12">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-4xl font-kiona text-brand-brown-dark">
            Blog Editor
          </h1>
          <Link
            href="/"
            className="px-4 py-2 bg-brand-brown-dark text-brand-cream rounded-sm"
          >
            Back to Home
          </Link>
        </div>

        <div className="bg-white rounded-md shadow-md p-8">
          {/* Title */}
          <div className="mb-6">
            <label
              htmlFor="title"
              className="block text-brand-brown-dark text-sm mb-2"
            >
              Title
            </label>
            <input
              id="title"
              type="text"
              value={post.title}
              onChange={(e) =>
                setPost((prev) => ({ ...prev, title: e.target.value }))
              }
              className="w-full px-3 py-2 border border-brand-brown-dark/20 rounded-sm focus:outline-none focus:ring-2 focus:ring-brand-brown-dark text-brand-brown-dark"
              placeholder="Enter blog title..."
            />
          </div>

          {/* Subtitle */}
          <div className="mb-6">
            <label
              htmlFor="subtitle"
              className="block text-brand-brown-dark text-sm mb-2"
            >
              Subtitle
            </label>
            <input
              id="subtitle"
              type="text"
              value={post.subtitle}
              onChange={(e) =>
                setPost((prev) => ({ ...prev, subtitle: e.target.value }))
              }
              className="w-full px-3 py-2 border border-brand-brown-dark/20 rounded-sm focus:outline-none focus:ring-2 focus:ring-brand-brown-dark text-brand-brown-dark"
              placeholder="Enter subtitle..."
            />
          </div>

          {/* Featured Image */}
          <div className="mb-6">
            <label className="block text-brand-brown-dark text-sm mb-2">
              Featured Image
            </label>
            <div className="flex items-center gap-4">
              <label
                className={`cursor-pointer ${imageLoading ? "opacity-50" : ""}`}
              >
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  disabled={imageLoading}
                />
                <div className="px-4 py-2 bg-brand-brown-dark text-brand-cream rounded-sm flex items-center gap-2">
                  {imageLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Uploading...</span>
                    </>
                  ) : (
                    "Upload Image"
                  )}
                </div>
              </label>
              {post.image_url && (
                <div className="relative group">
                  <Image
                    src={post.image_url}
                    alt="Featured"
                    width={80}
                    height={80}
                    className="h-20 w-20 object-cover rounded-sm"
                    unoptimized
                  />
                  {!imageLoading && (
                    <button
                      onClick={() => {
                        setPost((prev) => ({ ...prev, image_url: "" }));
                        toast.success("Image removed");
                      }}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      ×
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
          {/* Tags */}
          <div className="mb-6">
            <label
              htmlFor="tags"
              className="block text-brand-brown-dark text-sm mb-2"
            >
              Tags
            </label>
            <input
              id="tags"
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleAddTag}
              className="w-full px-3 py-2 border border-brand-brown-dark/20 rounded-sm focus:outline-none focus:ring-2 focus:ring-brand-brown-dark text-brand-brown-dark"
              placeholder="Add tags (press Enter to add)..."
            />
            <div className="flex flex-wrap gap-2 mt-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 bg-brand-brown-dark/10 text-brand-brown-dark rounded-sm flex items-center gap-2"
                >
                  {tag}
                  <button
                    onClick={() => removeTag(tag)}
                    className="text-brand-brown-dark/50 hover:text-brand-brown-dark"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Content Editor */}
          <div className="mb-6">
            <label className="block text-brand-brown-dark text-sm mb-2">
              Content
            </label>
            <TipTapEditor
              content={post.content}
              onChange={(content) => setPost((prev) => ({ ...prev, content }))}
            />
          </div>

          <div className="flex justify-end gap-4">
            <button className="px-4 py-2 border border-brand-brown-dark text-brand-brown-dark rounded-sm hover:bg-brand-brown-dark/5">
              Save Draft
            </button>
            <button className="px-4 py-2 bg-brand-brown-dark text-brand-cream rounded-sm hover:bg-brand-brown-dark/90">
              Publish
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
