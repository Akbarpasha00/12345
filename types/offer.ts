export interface Offer {
  id: string
  title: string
  companyId: string
  company: {
    name: string
  }
  location: string
  salary: string
  positions: number
  deadline: Date
  status: string
  skills: string[]
  description?: string
  createdAt: Date
  updatedAt: Date
}

export interface OfferFormData {
  title: string
  companyId: string
  location: string
  salary: string
  positions: number
  deadline: Date
  status: string
  skills: string[]
  description?: string
}

