"use client";

import { useState, useEffect, useCallback } from "react";
import { createClient } from "@/utils/client";
import toast from "react-hot-toast";
import { Upload, FileText, ExternalLink, Loader2 } from "lucide-react";

const supabase = createClient();

interface LegalDocument {
  doc_key: string;
  name: string;
  url: string;
  file_path: string | null;
  updated_at: string;
}

export function LegalDocumentsManager() {
  const [documents, setDocuments] = useState<LegalDocument[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState<string | null>(null);

  const fetchDocuments = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from("legal_documents")
        .select("*")
        .order("sort_order");

      if (error) throw error;
      setDocuments(data || []);
    } catch (error) {
      console.error("Error fetching legal documents:", error);
      toast.error("Failed to load legal documents");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDocuments();
  }, [fetchDocuments]);

  const handleUpload = async (doc: LegalDocument, file: File) => {
    if (file.type !== "application/pdf") {
      toast.error("Please upload a PDF file");
      return;
    }
    if (file.size > 20 * 1024 * 1024) {
      toast.error("File is too large (max 20MB)");
      return;
    }

    setUploading(doc.doc_key);
    const toastId = toast.loading(`Uploading ${doc.name}...`);

    try {
      // Versioned filename so the CDN never serves a stale copy
      const filePath = `${doc.doc_key}/${Date.now()}.pdf`;

      const { error: uploadError } = await supabase.storage
        .from("legal-documents")
        .upload(filePath, file, {
          cacheControl: "3600",
          contentType: "application/pdf",
        });

      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage
        .from("legal-documents")
        .getPublicUrl(filePath);

      const { error: updateError } = await supabase
        .from("legal_documents")
        .update({
          url: urlData.publicUrl,
          file_path: filePath,
          updated_at: new Date().toISOString(),
        })
        .eq("doc_key", doc.doc_key);

      if (updateError) throw updateError;

      // Clean up the previous upload (ignore failures — the new doc is live)
      if (doc.file_path) {
        await supabase.storage.from("legal-documents").remove([doc.file_path]);
      }

      toast.success(`${doc.name} updated`, { id: toastId });
      await fetchDocuments();
    } catch (error) {
      console.error("Error uploading document:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to upload document",
        { id: toastId }
      );
    } finally {
      setUploading(null);
    }
  };

  const triggerUpload = (doc: LegalDocument) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "application/pdf";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) handleUpload(doc, file);
    };
    input.click();
  };

  return (
    <div className="min-h-screen bg-brand-cream p-8">
      <div className="max-w-4xl mx-auto mt-12">
        <h1 className="text-4xl font-kiona text-brand-brown-dark mb-4">
          Legal Documents
        </h1>
        <p className="text-brand-brown-dark/70 mb-12">
          Upload a new PDF to replace a document. The links in the website
          footer update automatically.
        </p>

        {loading ? (
          <div className="flex items-center justify-center p-12">
            <Loader2 className="w-8 h-8 animate-spin text-brand-brown-dark" />
          </div>
        ) : (
          <div className="space-y-6">
            {documents.map((doc) => (
              <div
                key={doc.doc_key}
                className="bg-white rounded-md shadow-md p-6 flex flex-col sm:flex-row sm:items-center gap-4"
              >
                <div className="flex items-center gap-4 flex-1">
                  <div className="bg-brand-cream p-3 rounded-md">
                    <FileText className="w-6 h-6 text-brand-brown-dark" />
                  </div>
                  <div>
                    <h2 className="text-xl font-kiona text-brand-brown-dark">
                      {doc.name}
                    </h2>
                    <p className="text-sm text-brand-brown-dark/60">
                      Last updated{" "}
                      {new Date(doc.updated_at).toLocaleDateString("en-AU", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <a
                    href={doc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 border border-brand-brown-dark/20 text-brand-brown-dark rounded-md hover:bg-brand-brown-dark/5 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    View Current
                  </a>
                  <button
                    onClick={() => triggerUpload(doc)}
                    disabled={uploading !== null}
                    className="flex items-center gap-2 px-4 py-2 bg-brand-brown-dark text-brand-cream rounded-md hover:bg-brand-brown-dark/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {uploading === doc.doc_key ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Upload className="w-4 h-4" />
                    )}
                    {uploading === doc.doc_key ? "Uploading..." : "Upload New PDF"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
