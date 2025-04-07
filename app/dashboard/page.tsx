import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { AdminDashboard } from "@/components/dashboard/AdminDashboard"

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)

  // We only need to show the admin dashboard
  return <AdminDashboard />
}

