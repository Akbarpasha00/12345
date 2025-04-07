export interface Candidate {
  id: string
  name: string
  email: string
  phone: string
  gender: string
  sscPercentage: number
  interPercentage: number
  btechPercentage: number
  pgPercentage?: number
  branch: string
  college: string
  offerStatus?: string
  company?: string
  ctc?: string
  reference?: string
  createdAt: Date
  updatedAt: Date
}

export interface CandidateFormData {
  name: string
  email: string
  phone: string
  gender: string
  sscPercentage: number
  interPercentage: number
  btechPercentage: number
  pgPercentage?: number
  branch: string
  college: string
  offerStatus?: string
  company?: string
  ctc?: string
  reference?: string
}

