import type React from "react"
import { Sidebar } from "@/components/Sidebar"
import { Navbar } from "@/components/Navbar"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import { UserRole } from "@/constants/roles"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/api/auth/signin")
  }

  // Ensure only admin can access the dashboard
  if (session.user.role !== UserRole.ADMIN) {
    redirect("/login?error=AdminAccessRequired")
  }

  return (
    <SidebarProvider>
      <div className="flex h-screen">
        <Sidebar />
        <SidebarInset className="flex flex-col">
          <Navbar />
          <main className="flex-1 overflow-auto p-6">{children}</main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}

