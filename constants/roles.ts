export enum UserRole {
  ADMIN = "ADMIN",
  TPO = "TPO",
  FACULTY = "FACULTY",
  STUDENT = "STUDENT",
  COMPANY = "COMPANY",
}

export const rolePermissions = {
  [UserRole.ADMIN]: {
    canManageUsers: true,
    canManageStudents: true,
    canManageCompanies: true,
    canManageJobs: true,
    canManageOffers: true,
    canViewAnalytics: true,
    canManageSettings: true,
  },
  [UserRole.TPO]: {
    canManageUsers: false,
    canManageStudents: true,
    canManageCompanies: true,
    canManageJobs: true,
    canManageOffers: true,
    canViewAnalytics: true,
    canManageSettings: false,
  },
  [UserRole.FACULTY]: {
    canManageUsers: false,
    canManageStudents: true,
    canManageCompanies: false,
    canManageJobs: false,
    canManageOffers: false,
    canViewAnalytics: true,
    canManageSettings: false,
  },
  [UserRole.STUDENT]: {
    canManageUsers: false,
    canManageStudents: false,
    canManageCompanies: false,
    canManageJobs: false,
    canManageOffers: false,
    canViewAnalytics: false,
    canManageSettings: false,
  },
  [UserRole.COMPANY]: {
    canManageUsers: false,
    canManageStudents: false,
    canManageCompanies: false,
    canManageJobs: true,
    canManageOffers: true,
    canViewAnalytics: false,
    canManageSettings: false,
  },
}

