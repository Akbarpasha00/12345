export interface Company {
  id: string
  name: string
  industry: string
  location: string
  website?: string
  employees?: string
  openPositions: number
  description?: string
  status: string
  createdAt: Date
  updatedAt: Date
}

export interface CompanyFormData {
  name: string
  industry: string
  location: string
  website?: string
  employees?: string
  openPositions: number
  description?: string
  status: string
}

