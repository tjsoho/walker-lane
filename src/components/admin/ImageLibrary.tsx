"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/utils/client";

const supabase = createClient();
import Image from "next/image";
import toast from "react-hot-toast";
import { Upload, X, Check, Loader2 } from "lucide-react";

interface ImageLibraryProps {
    onSelect?: (imageUrl: string) => void;
    onClose?: () => void;
    multiple?: boolean;
}

interface ImageFile {
    name: string;
    url: string;
    path: string;
    created_at?: string;
}

export function ImageLibrary({ onSelect, onClose, multiple = false }: ImageLibraryProps) {
    const [images, setImages] = useState<ImageFile[]>([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [selectedImages, setSelectedImages] = useState<Set<string>>(new Set());
    const [deleting, setDeleting] = useState<string | null>(null);

    // Fetch all images from storage
    const fetchImages = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase.storage
                .from("blog-images")
                .list("", {
                    limit: 100,
                    offset: 0,
                    sortBy: { column: "created_at", order: "desc" },
                });

            if (error) throw error;

            // Get images from both root and blog-content-images folder
            const rootImages = (data || []).filter(
                (file) => file.name && /\.(jpg|jpeg|png|gif|webp)$/i.test(file.name)
            );

            // Get images from blog-content-images folder
            const { data: contentImagesData, error: contentError } = await supabase.storage
                .from("blog-images")
                .list("blog-content-images", {
                    limit: 100,
                    offset: 0,
                    sortBy: { column: "created_at", order: "desc" },
                });

            if (contentError) {
                console.warn("Error fetching content images:", contentError);
            }

            const contentImages = (contentImagesData || []).filter(
                (file) => file.name && /\.(jpg|jpeg|png|gif|webp)$/i.test(file.name)
            );

            // Combine and format images
            const allImages: ImageFile[] = [
                ...rootImages.map((file) => ({
                    name: file.name,
                    path: file.name,
                    url: supabase.storage.from("blog-images").getPublicUrl(file.name).data.publicUrl,
                    created_at: file.created_at,
                })),
                ...contentImages.map((file) => ({
                    name: file.name,
                    path: `blog-content-images/${file.name}`,
                    url: supabase.storage
                        .from("blog-images")
                        .getPublicUrl(`blog-content-images/${file.name}`).data.publicUrl,
                    created_at: file.created_at,
                })),
            ];

            setImages(allImages);
        } catch (error) {
            console.error("Error fetching images:", error);
            toast.error("Failed to load images");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchImages();
    }, []);

    // Handle image upload
    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;

        setUploading(true);
        const toastId = toast.loading("Uploading images...");

        try {
            const uploadPromises = Array.from(files).map(async (file) => {
                // Check file size (limit to 5MB)
                if (file.size > 5 * 1024 * 1024) {
                    throw new Error(`${file.name} is too large (max 5MB)`);
                }

                // Check file type
                const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif", "image/webp"];
                if (!validTypes.includes(file.type)) {
                    throw new Error(`${file.name} is not a valid image type (JPEG, PNG, GIF, or WebP)`);
                }

                const fileExt = file.name.split(".").pop();
                const fileName = `${Date.now()}-${Math.random()
                    .toString(36)
                    .substring(7)}.${fileExt}`;
                // Upload to root of bucket
                const filePath = fileName;

                const { error: uploadError } = await supabase.storage
                    .from("blog-images")
                    .upload(filePath, file, {
                        cacheControl: "3600",
                        upsert: false,
                    });

                if (uploadError) {
                    // Handle Supabase error objects
                    const errorMessage = uploadError.message || JSON.stringify(uploadError);
                    throw new Error(`Failed to upload ${file.name}: ${errorMessage}`);
                }
                return fileName;
            });

            await Promise.all(uploadPromises);
            toast.success("Images uploaded successfully", { id: toastId });
            await fetchImages(); // Refresh the list
        } catch (error) {
            console.error("Error uploading images:", error);

            // Better error message extraction
            let errorMessage = "Failed to upload images";
            if (error instanceof Error) {
                errorMessage = error.message;
            } else if (typeof error === "object" && error !== null) {
                // Handle Supabase error objects
                const errorObj = error as { message?: string; error?: string; statusCode?: number };
                errorMessage = errorObj.message || errorObj.error || JSON.stringify(error);
            } else if (typeof error === "string") {
                errorMessage = error;
            }

            toast.error(errorMessage, { id: toastId });
        } finally {
            setUploading(false);
            // Reset input
            e.target.value = "";
        }
    };

    // Handle image deletion
    const handleDelete = async (image: ImageFile) => {
        if (!confirm(`Are you sure you want to delete ${image.name}?`)) return;

        setDeleting(image.path);
        const toastId = toast.loading("Deleting image...");

        try {
            const { error } = await supabase.storage
                .from("blog-images")
                .remove([image.path]);

            if (error) throw error;

            toast.success("Image deleted successfully", { id: toastId });
            await fetchImages(); // Refresh the list
            setSelectedImages(new Set()); // Clear selection
        } catch (error) {
            console.error("Error deleting image:", error);
            toast.error("Failed to delete image", { id: toastId });
        } finally {
            setDeleting(null);
        }
    };

    // Handle image selection
    const handleSelect = (imageUrl: string) => {
        if (multiple) {
            const newSelected = new Set(selectedImages);
            if (newSelected.has(imageUrl)) {
                newSelected.delete(imageUrl);
            } else {
                newSelected.add(imageUrl);
            }
            setSelectedImages(newSelected);
        } else {
            if (onSelect) {
                onSelect(imageUrl);
            }
            if (onClose) {
                onClose();
            }
        }
    };

    // Handle confirm selection (for multiple mode)
    const handleConfirmSelection = () => {
        if (onSelect && selectedImages.size > 0) {
            // For multiple mode, you might want to pass an array
            // For now, we'll pass the first selected image
            const firstSelected = Array.from(selectedImages)[0];
            onSelect(firstSelected);
        }
        if (onClose) {
            onClose();
        }
    };

    const triggerUpload = () => {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = "image/*";
        input.multiple = true;
        input.onchange = (e) => {
            const target = e.target as HTMLInputElement;
            if (target.files) {
                handleUpload({ target } as React.ChangeEvent<HTMLInputElement>);
            }
        };
        input.click();
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center p-12">
                <Loader2 className="w-8 h-8 animate-spin text-brand-brown-dark" />
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg shadow-xl w-full max-w-6xl max-h-[90vh] flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-brand-brown-dark/10">
                <h2 className="text-2xl font-kiona text-brand-brown-dark">
                    Image Library
                </h2>
                <div className="flex items-center gap-4">
                    <button
                        onClick={triggerUpload}
                        disabled={uploading}
                        className="flex items-center gap-2 px-4 py-2 bg-brand-brown-dark text-brand-cream rounded-md hover:bg-brand-brown-dark/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <Upload className="w-4 h-4" />
                        {uploading ? "Uploading..." : "Upload Images"}
                    </button>
                    {onClose && (
                        <button
                            onClick={onClose}
                            className="p-2 text-brand-brown-dark/60 hover:text-brand-brown-dark transition-colors"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    )}
                </div>
            </div>

            {/* Image Grid */}
            <div className="flex-1 overflow-y-auto p-6">
                {images.length === 0 ? (
                    <div className="text-center py-12 text-brand-brown-dark/60">
                        <p className="text-lg mb-2">No images found</p>
                        <p className="text-sm">Upload your first image to get started</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {images.map((image) => {
                            const isSelected = selectedImages.has(image.url);
                            const isDeleting = deleting === image.path;

                            return (
                                <div
                                    key={image.path}
                                    className="relative group bg-brand-cream rounded-lg overflow-hidden border-2 border-transparent hover:border-brand-brown-dark/20 transition-all"
                                >
                                    {/* Image */}
                                    <div className="relative aspect-square">
                                        <Image
                                            src={image.url}
                                            alt={image.name}
                                            fill
                                            className="object-cover"
                                            unoptimized
                                        />
                                        {/* Filename Overlay - Always visible at bottom */}
                                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/60 to-transparent p-2">
                                            <p className="text-xs text-white font-medium truncate" title={image.name}>
                                                {image.name}
                                            </p>
                                        </div>
                                        {/* Overlay */}
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center gap-2">
                                            {isDeleting ? (
                                                <Loader2 className="w-6 h-6 animate-spin text-white" />
                                            ) : (
                                                <>
                                                    <button
                                                        onClick={() => handleSelect(image.url)}
                                                        className={`p-2 rounded-full ${isSelected || !multiple
                                                                ? "bg-brand-cream text-brand-brown-dark"
                                                                : "bg-white/90 text-brand-brown-dark hover:bg-white"
                                                            } transition-all opacity-0 group-hover:opacity-100`}
                                                        title={multiple ? (isSelected ? "Deselect" : "Select") : "Select"}
                                                    >
                                                        {isSelected ? (
                                                            <Check className="w-5 h-5" />
                                                        ) : (
                                                            <Check className="w-5 h-5" />
                                                        )}
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(image)}
                                                        className="p-2 rounded-full bg-red-500 text-white hover:bg-red-600 transition-all opacity-0 group-hover:opacity-100"
                                                        title="Delete"
                                                    >
                                                        <X className="w-5 h-5" />
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                        {/* Selection Indicator */}
                                        {isSelected && (
                                            <div className="absolute top-2 right-2 bg-brand-brown-dark text-brand-cream p-1 rounded-full">
                                                <Check className="w-4 h-4" />
                                            </div>
                                        )}
                                    </div>
                                    {/* Image Name - Also shown below for better visibility */}
                                    <div className="p-2 bg-brand-cream">
                                        <p className="text-sm text-brand-brown-dark font-medium truncate" title={image.name}>
                                            {image.name}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* Footer (for multiple selection) */}
            {multiple && selectedImages.size > 0 && (
                <div className="flex items-center justify-between p-6 border-t border-brand-brown-dark/10">
                    <p className="text-brand-brown-dark/70">
                        {selectedImages.size} image{selectedImages.size !== 1 ? "s" : ""}{" "}
                        selected
                    </p>
                    <button
                        onClick={handleConfirmSelection}
                        className="px-6 py-2 bg-brand-brown-dark text-brand-cream rounded-md hover:bg-brand-brown-dark/90 transition-colors"
                    >
                        Use Selected Image
                    </button>
                </div>
            )}
        </div>
    );
}

