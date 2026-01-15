import { createClient } from "@/utils/server";
import { redirect } from "next/navigation";
import { TeamManager } from "@/components/admin/TeamManager";

// Force dynamic rendering
export const dynamic = 'force-dynamic';

export default async function TeamPage() {
  const supabase = await createClient();
  
  // Get the current user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Redirect to login if not authenticated
  if (!user) {
    redirect("/admin/login");
  }

  return <TeamManager />;
}

