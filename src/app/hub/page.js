export const dynamic = "force-dynamic";

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import HubClient from "./components/HubClient";

export default async function HubPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");
  return <HubClient session={session} />;
}