export interface ScheduledDrive {
  id: string
  companyId: string
  companyName?: string
  date: Date
  location: string
  rounds: number
  selectionProcedure: string
  eligibilityCriteria: {
    minCGPA: number
    minPercentage: number
    branches: string[]
  }
  description?: string
  status: string
  createdAt: Date
  updatedAt: Date
}

export interface ScheduledDriveFormData {
  companyId: string
  date: Date
  location: string
  rounds: number
  selectionProcedure: string
  eligibilityCriteria: {
    minCGPA: number
    minPercentage: number
    branches: string[]
  }
  description?: string
  status: string
}

