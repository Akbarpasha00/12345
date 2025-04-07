export interface SWECOffer {
  id: string
  studentName: string
  rollNumber: string
  branch: string
  yearOfPassout: string
  email: string
  mobile: string
  companyId: string
  companyName?: string
  package: string
  tpoName: string
  offerDate: Date
  status: string
  createdAt: Date
  updatedAt: Date
}

export interface SWECOfferFormData {
  studentName: string
  rollNumber: string
  branch: string
  yearOfPassout: string
  email: string
  mobile: string
  companyId: string
  package: string
  tpoName: string
  offerDate: Date
  status: string
}

