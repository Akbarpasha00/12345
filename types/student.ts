export interface Student {
  _id: string
  name: string
  email: string
  phone: string
  gender: string
  sscPercentage: number
  hscPercentage: number
  cgpa: number
  branch: string
  college: string
  placementStatus?: string
  company?: string
  package?: string
  skills?: string[]
  reference?: string
  createdAt: Date
  updatedAt: Date
}

export interface StudentFormData {
  name: string
  email: string
  phone: string
  gender: string
  sscPercentage: number
  hscPercentage: number
  cgpa: number
  branch: string
  college: string
  placementStatus?: string
  company?: string
  package?: string
  skills?: string[]
  reference?: string
}

