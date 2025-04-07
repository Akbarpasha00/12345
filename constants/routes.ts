import { UserRole } from "./roles"

export const routes = {
  dashboard: {
    path: "/dashboard",
    allowedRoles: [UserRole.ADMIN, UserRole.TPO, UserRole.FACULTY, UserRole.STUDENT, UserRole.COMPANY],
  },
  students: {
    path: "/dashboard/students",
    allowedRoles: [UserRole.ADMIN, UserRole.TPO, UserRole.FACULTY],
  },
  companies: {
    path: "/dashboard/companies",
    allowedRoles: [UserRole.ADMIN, UserRole.TPO, UserRole.COMPANY],
  },
  jobs: {
    path: "/dashboard/jobs",
    allowedRoles: [UserRole.ADMIN, UserRole.TPO, UserRole.FACULTY, UserRole.STUDENT, UserRole.COMPANY],
  },
  offers: {
    path: "/dashboard/offers",
    allowedRoles: [UserRole.ADMIN, UserRole.TPO, UserRole.COMPANY],
  },
  analytics: {
    path: "/dashboard/analytics",
    allowedRoles: [UserRole.ADMIN, UserRole.TPO, UserRole.FACULTY],
  },
  settings: {
    path: "/dashboard/settings",
    allowedRoles: [UserRole.ADMIN, UserRole.TPO, UserRole.FACULTY, UserRole.STUDENT, UserRole.COMPANY],
  },
  profile: {
    path: "/dashboard/profile",
    allowedRoles: [UserRole.ADMIN, UserRole.TPO, UserRole.FACULTY, UserRole.STUDENT, UserRole.COMPANY],
  },
  departments: {
    path: "/dashboard/departments",
    allowedRoles: [UserRole.ADMIN, UserRole.TPO],
  },
  events: {
    path: "/dashboard/events",
    allowedRoles: [UserRole.ADMIN, UserRole.TPO, UserRole.FACULTY],
  },
  reports: {
    path: "/dashboard/reports",
    allowedRoles: [UserRole.ADMIN, UserRole.TPO],
  },
}

