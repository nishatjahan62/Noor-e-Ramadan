// app/dashboard/page.js  (Server Component)
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/login");
  }

  return (
    <div>
      <h1>Welcome to Dashboard, {session.user.name || session.user.email}!</h1>
      {/* তোমার GoalsSection + BookmarkSection */}
    </div>
  );
}