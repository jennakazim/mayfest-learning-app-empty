import { getServerSession } from "next-auth/next";
import { type Session } from "next-auth";
import { authOptions } from "@/server/auth";
import AnimatedHomePage from "@/components/AnimatedHomePafe";
import DashboardPage from "@/app/dashboard/page";

export default async function HomePage() {
  const session: Session | null = await getServerSession(authOptions);
  if (session) {
    return <DashboardPage />;
  }
  return <AnimatedHomePage session={session} />;
}
