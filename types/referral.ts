export interface Referral {
  id: string
  candidateId: string
  candidate: {
    name: string
    email: string
  }
  referrerId: string
  referrer: {
    name: string
    email: string
  }
  status: string
  notes?: string
  createdAt: Date
  updatedAt: Date
}

export interface ReferralFormData {
  candidateId: string
  notes?: string
}

