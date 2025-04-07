"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import type { Candidate } from "@/types/candidate"

export function useCandidates() {
  const [candidates, setCandidates] = useState<Candidate[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        setLoading(true)
        const response = await axios.get("/api/candidates")
        setCandidates(response.data)
        setError(null)
      } catch (err) {
        console.error("Error fetching candidates:", err)
        setError("Failed to fetch candidates")
      } finally {
        setLoading(false)
      }
    }

    fetchCandidates()
  }, [])

  const addCandidate = async (candidateData: Omit<Candidate, "id">) => {
    try {
      setLoading(true)
      const response = await axios.post("/api/candidates", candidateData)
      setCandidates((prev) => [...prev, response.data])
      return response.data
    } catch (err) {
      console.error("Error adding candidate:", err)
      setError("Failed to add candidate")
      throw err
    } finally {
      setLoading(false)
    }
  }

  const updateCandidate = async (id: string, candidateData: Partial<Candidate>) => {
    try {
      setLoading(true)
      const response = await axios.patch(`/api/candidates/${id}`, candidateData)
      setCandidates((prev) => prev.map((candidate) => (candidate.id === id ? response.data : candidate)))
      return response.data
    } catch (err) {
      console.error(`Error updating candidate ${id}:`, err)
      setError("Failed to update candidate")
      throw err
    } finally {
      setLoading(false)
    }
  }

  const deleteCandidate = async (id: string) => {
    try {
      setLoading(true)
      await axios.delete(`/api/candidates/${id}`)
      setCandidates((prev) => prev.filter((candidate) => candidate.id !== id))
    } catch (err) {
      console.error(`Error deleting candidate ${id}:`, err)
      setError("Failed to delete candidate")
      throw err
    } finally {
      setLoading(false)
    }
  }

  return {
    candidates,
    loading,
    error,
    addCandidate,
    updateCandidate,
    deleteCandidate,
  }
}

