"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import type { Drive } from "@/types/drive"

export function useDrives() {
  const [drives, setDrives] = useState<Drive[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchDrives = async () => {
      try {
        setLoading(true)
        const response = await axios.get("/api/drives")
        setDrives(response.data)
        setError(null)
      } catch (err) {
        console.error("Error fetching drives:", err)
        setError("Failed to fetch drives")
      } finally {
        setLoading(false)
      }
    }

    fetchDrives()
  }, [])

  const addDrive = async (driveData: Omit<Drive, "id">) => {
    try {
      setLoading(true)
      const response = await axios.post("/api/drives", driveData)
      setDrives((prev) => [...prev, response.data])
      return response.data
    } catch (err) {
      console.error("Error adding drive:", err)
      setError("Failed to add drive")
      throw err
    } finally {
      setLoading(false)
    }
  }

  const updateDrive = async (id: string, driveData: Partial<Drive>) => {
    try {
      setLoading(true)
      const response = await axios.patch(`/api/drives/${id}`, driveData)
      setDrives((prev) => prev.map((drive) => (drive.id === id ? response.data : drive)))
      return response.data
    } catch (err) {
      console.error(`Error updating drive ${id}:`, err)
      setError("Failed to update drive")
      throw err
    } finally {
      setLoading(false)
    }
  }

  const deleteDrive = async (id: string) => {
    try {
      setLoading(true)
      await axios.delete(`/api/drives/${id}`)
      setDrives((prev) => prev.filter((drive) => drive.id !== id))
    } catch (err) {
      console.error(`Error deleting drive ${id}:`, err)
      setError("Failed to delete drive")
      throw err
    } finally {
      setLoading(false)
    }
  }

  const registerCandidate = async (driveId: string, candidateId: string) => {
    try {
      setLoading(true)
      const response = await axios.post(`/api/drives/${driveId}/register`, { candidateId })
      return response.data
    } catch (err) {
      console.error(`Error registering candidate for drive ${driveId}:`, err)
      setError("Failed to register candidate for drive")
      throw err
    } finally {
      setLoading(false)
    }
  }

  return {
    drives,
    loading,
    error,
    addDrive,
    updateDrive,
    deleteDrive,
    registerCandidate,
  }
}

