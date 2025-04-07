import type { DefaultSession } from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      role: string
      studentId?: string
      companyId?: string
    } & DefaultSession["user"]
  }

  interface User {
    id: string
    role: string
    studentId?: string
    companyId?: string
  }
}

