import { createClient } from "@/utils/server";
import { redirect } from "next/navigation";
import { ImageLibrary } from "@/components/admin/ImageLibrary";
import Link from "next/link";

// Force dynamic rendering
export const dynamic = 'force-dynamic';

export default async function ImageLibraryPage() {
  const supabase = await createClient();
  
  // Get the current user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Redirect to login if not authenticated
  if (!user) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-brand-cream p-8">
      <div className="max-w-7xl mx-auto mt-12">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-kiona text-brand-brown-dark">
            Image Library
          </h1>
          <Link
            href="/admin"
            className="px-4 py-2 bg-brand-brown-dark/5 text-brand-brown-dark rounded-md hover:bg-brand-brown-dark/10 transition-colors"
          >
            Back to Dashboard
          </Link>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <ImageLibrary />
        </div>
      </div>
    </div>
  );
}

