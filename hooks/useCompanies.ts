"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import type { Company } from "@/types/company"

export function useCompanies() {
  const [companies, setCompanies] = useState<Company[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        setLoading(true)
        const response = await axios.get("/api/companies")
        setCompanies(response.data)
        setError(null)
      } catch (err) {
        console.error("Error fetching companies:", err)
        setError("Failed to fetch companies")
      } finally {
        setLoading(false)
      }
    }

    fetchCompanies()
  }, [])

  const addCompany = async (companyData: Omit<Company, "id">) => {
    try {
      setLoading(true)
      const response = await axios.post("/api/companies", companyData)
      setCompanies((prev) => [...prev, response.data])
      return response.data
    } catch (err) {
      console.error("Error adding company:", err)
      setError("Failed to add company")
      throw err
    } finally {
      setLoading(false)
    }
  }

  const updateCompany = async (id: string, companyData: Partial<Company>) => {
    try {
      setLoading(true)
      const response = await axios.patch(`/api/companies/${id}`, companyData)
      setCompanies((prev) => prev.map((company) => (company.id === id ? response.data : company)))
      return response.data
    } catch (err) {
      console.error(`Error updating company ${id}:`, err)
      setError("Failed to update company")
      throw err
    } finally {
      setLoading(false)
    }
  }

  const deleteCompany = async (id: string) => {
    try {
      setLoading(true)
      await axios.delete(`/api/companies/${id}`)
      setCompanies((prev) => prev.filter((company) => company.id !== id))
    } catch (err) {
      console.error(`Error deleting company ${id}:`, err)
      setError("Failed to delete company")
      throw err
    } finally {
      setLoading(false)
    }
  }

  return {
    companies,
    loading,
    error,
    addCompany,
    updateCompany,
    deleteCompany,
  }
}

