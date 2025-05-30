export interface Event {
  id: string
  title: string
  description?: string
  startDate: Date
  endDate: Date
  location?: string
  type: string
  status: string
  createdAt: Date
  updatedAt: Date
}

export interface EventFormData {
  title: string
  description?: string
  startDate: Date
  endDate: Date
  location?: string
  type: string
  status: string
}

