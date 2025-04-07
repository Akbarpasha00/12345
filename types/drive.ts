export interface Drive {
  id: string
  companyId: string
  company: {
    name: string
  }
  date: Date
  location: string
  positions: string[]
  eligibility: string
  description?: string
  status: string
  createdAt: Date
  updatedAt: Date
  _count?: {
    driveRegistrations: number
  }
}

export interface DriveFormData {
  companyId: string
  date: Date
  location: string
  positions: string[]
  eligibility: string
  description?: string
  status: string
}

