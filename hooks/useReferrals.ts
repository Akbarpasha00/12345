"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import type { Referral } from "@/types/referral"

export function useReferrals() {
  const [referrals, setReferrals] = useState<Referral[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchReferrals = async () => {
      try {
        setLoading(true)
        const response = await axios.get("/api/referrals")
        setReferrals(response.data)
        setError(null)
      } catch (err) {
        console.error("Error fetching referrals:", err)
        setError("Failed to fetch referrals")
      } finally {
        setLoading(false)
      }
    }

    fetchReferrals()
  }, [])

  const addReferral = async (referralData: Omit<Referral, "id">) => {
    try {
      setLoading(true)
      const response = await axios.post("/api/referrals", referralData)
      setReferrals((prev) => [...prev, response.data])
      return response.data
    } catch (err) {
      console.error("Error adding referral:", err)
      setError("Failed to add referral")
      throw err
    } finally {
      setLoading(false)
    }
  }

  const updateReferral = async (id: string, referralData: Partial<Referral>) => {
    try {
      setLoading(true)
      const response = await axios.patch(`/api/referrals/${id}`, referralData)
      setReferrals((prev) => prev.map((referral) => (referral.id === id ? response.data : referral)))
      return response.data
    } catch (err) {
      console.error(`Error updating referral ${id}:`, err)
      setError("Failed to update referral")
      throw err
    } finally {
      setLoading(false)
    }
  }

  const deleteReferral = async (id: string) => {
    try {
      setLoading(true)
      await axios.delete(`/api/referrals/${id}`)
      setReferrals((prev) => prev.filter((referral) => referral.id !== id))
    } catch (err) {
      console.error(`Error deleting referral ${id}:`, err)
      setError("Failed to delete referral")
      throw err
    } finally {
      setLoading(false)
    }
  }

  return {
    referrals,
    loading,
    error,
    addReferral,
    updateReferral,
    deleteReferral,
  }
}

