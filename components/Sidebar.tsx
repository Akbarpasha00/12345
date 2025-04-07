"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import {
  BarChart3,
  Users,
  Building2,
  Briefcase,
  Calendar,
  Settings,
  LogOut,
  LineChart,
  FileText,
  Upload,
  Download,
  School,
  CheckCircle,
} from "lucide-react"
import { signOut } from "next-auth/react"
import {
  Sidebar as SidebarComponent,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useSession } from "next-auth/react"

export function Sidebar() {
  const pathname = usePathname()
  const { data: session } = useSession()

  // Define all menu items for admin
  const dashboardItems = [{ name: "Dashboard", href: "/dashboard", icon: BarChart3 }]

  const studentItems = [
    { name: "Students", href: "/dashboard/students", icon: Users },
    { name: "Import Students", href: "/dashboard/students/import", icon: Upload },
    { name: "Export Students", href: "/dashboard/students/export", icon: Download },
  ]

  const placementItems = [
    { name: "Companies", href: "/dashboard/companies", icon: Building2 },
    { name: "Jobs", href: "/dashboard/jobs", icon: Briefcase },
    { name: "Offers", href: "/dashboard/offers", icon: Calendar },
    { name: "Scheduled Drives", href: "/dashboard/scheduled-drives", icon: Calendar },
    { name: "SWEC Offers", href: "/dashboard/swec-offers", icon: CheckCircle },
  ]

  const academicItems = [
    { name: "Departments", href: "/dashboard/departments", icon: School },
    { name: "Events", href: "/dashboard/events", icon: Calendar },
  ]

  const analyticsItems = [
    { name: "Analytics", href: "/dashboard/analytics", icon: LineChart },
    { name: "Reports", href: "/dashboard/reports", icon: FileText },
  ]

  const settingsItems = [{ name: "Settings", href: "/dashboard/settings", icon: Settings }]

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/login" })
  }

  // Get user initials for avatar
  const getUserInitials = () => {
    if (!session?.user?.name) return "A"
    return session.user.name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .substring(0, 2)
  }

  return (
    <SidebarComponent>
      <SidebarHeader className="flex flex-col items-center px-4 py-2 space-y-2">
        <div className="flex items-center gap-2 w-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/logo.png" alt="Logo" />
            <AvatarFallback>{getUserInitials()}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <span className="font-semibold">TPO Portal</span>
            <div className="text-xs text-white px-2 py-0.5 rounded-md bg-red-500">ADMIN</div>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {dashboardItems.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton asChild isActive={pathname === item.href} tooltip={item.name}>
                    <Link href={item.href}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Students</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {studentItems.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton asChild isActive={pathname === item.href} tooltip={item.name}>
                    <Link href={item.href}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Placement</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {placementItems.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton asChild isActive={pathname === item.href} tooltip={item.name}>
                    <Link href={item.href}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Academic</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {academicItems.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton asChild isActive={pathname === item.href} tooltip={item.name}>
                    <Link href={item.href}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Analytics</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {analyticsItems.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton asChild isActive={pathname === item.href} tooltip={item.name}>
                    <Link href={item.href}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {settingsItems.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton asChild isActive={pathname === item.href} tooltip={item.name}>
                    <Link href={item.href}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={handleSignOut}>
              <LogOut className="h-4 w-4" />
              <span>Sign out</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </SidebarComponent>
  )
}

