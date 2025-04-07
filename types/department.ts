export interface Department {
  id: string
  name: string
  code: string
  description?: string
  headOfDept?: string
  createdAt: Date
  updatedAt: Date
}

export interface DepartmentFormData {
  name: string
  code: string
  description?: string
  headOfDept?: string
}

