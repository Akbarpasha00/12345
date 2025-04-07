"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import type { Department } from "@/types/department"

export function useDepartments() {
  const [departments, setDepartments] = useState<Department[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        setLoading(true)
        const response = await axios.get("/api/departments")
        setDepartments(response.data)
        setError(null)
      } catch (err) {
        console.error("Error fetching departments:", err)
        setError("Failed to fetch departments")
      } finally {
        setLoading(false)
      }
    }

    fetchDepartments()
  }, [])

  const addDepartment = async (departmentData: Omit<Department, "id">) => {
    try {
      setLoading(true)
      const response = await axios.post("/api/departments", departmentData)
      setDepartments((prev) => [...prev, response.data])
      return response.data
    } catch (err) {
      console.error("Error adding department:", err)
      setError("Failed to add department")
      throw err
    } finally {
      setLoading(false)
    }
  }

  const updateDepartment = async (id: string, departmentData: Partial<Department>) => {
    try {
      setLoading(true)
      const response = await axios.patch(`/api/departments/${id}`, departmentData)
      setDepartments((prev) => prev.map((department) => (department.id === id ? response.data : department)))
      return response.data
    } catch (err) {
      console.error(`Error updating department ${id}:`, err)
      setError("Failed to update department")
      throw err
    } finally {
      setLoading(false)
    }
  }

  const deleteDepartment = async (id: string) => {
    try {
      setLoading(true)
      await axios.delete(`/api/departments/${id}`)
      setDepartments((prev) => prev.filter((department) => department.id !== id))
    } catch (err) {
      console.error(`Error deleting department ${id}:`, err)
      setError("Failed to delete department")
      throw err
    } finally {
      setLoading(false)
    }
  }

  return {
    departments,
    loading,
    error,
    addDepartment,
    updateDepartment,
    deleteDepartment,
  }
}

