"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import type { ScheduledDrive } from "@/types/scheduled-drive"

export function useScheduledDrives() {
  const [scheduledDrives, setScheduledDrives] = useState<ScheduledDrive[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchScheduledDrives = async () => {
      try {
        setLoading(true)
        const response = await axios.get("/api/scheduled-drives")
        setScheduledDrives(response.data)
        setError(null)
      } catch (err) {
        console.error("Error fetching scheduled drives:", err)
        setError("Failed to fetch scheduled drives")
      } finally {
        setLoading(false)
      }
    }

    fetchScheduledDrives()
  }, [])

  const addScheduledDrive = async (driveData: Omit<ScheduledDrive, "id">) => {
    try {
      setLoading(true)
      const response = await axios.post("/api/scheduled-drives", driveData)
      setScheduledDrives((prev) => [...prev, response.data])
      return response.data
    } catch (err) {
      console.error("Error adding scheduled drive:", err)
      setError("Failed to add scheduled drive")
      throw err
    } finally {
      setLoading(false)
    }
  }

  const updateScheduledDrive = async (id: string, driveData: Partial<ScheduledDrive>) => {
    try {
      setLoading(true)
      const response = await axios.patch(`/api/scheduled-drives/${id}`, driveData)
      setScheduledDrives((prev) => prev.map((drive) => (drive.id === id ? response.data : drive)))
      return response.data
    } catch (err) {
      console.error(`Error updating scheduled drive ${id}:`, err)
      setError("Failed to update scheduled drive")
      throw err
    } finally {
      setLoading(false)
    }
  }

  const deleteScheduledDrive = async (id: string) => {
    try {
      setLoading(true)
      await axios.delete(`/api/scheduled-drives/${id}`)
      setScheduledDrives((prev) => prev.filter((drive) => drive.id !== id))
    } catch (err) {
      console.error(`Error deleting scheduled drive ${id}:`, err)
      setError("Failed to delete scheduled drive")
      throw err
    } finally {
      setLoading(false)
    }
  }

  return {
    scheduledDrives,
    loading,
    error,
    addScheduledDrive,
    updateScheduledDrive,
    deleteScheduledDrive,
  }
}

