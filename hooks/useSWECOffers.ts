"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import type { SWECOffer } from "@/types/swec-offer"

export function useSWECOffers() {
  const [swecOffers, setSWECOffers] = useState<SWECOffer[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchSWECOffers = async () => {
      try {
        setLoading(true)
        const response = await axios.get("/api/swec-offers")
        setSWECOffers(response.data)
        setError(null)
      } catch (err) {
        console.error("Error fetching SWEC offers:", err)
        setError("Failed to fetch SWEC offers")
      } finally {
        setLoading(false)
      }
    }

    fetchSWECOffers()
  }, [])

  const addSWECOffer = async (offerData: Omit<SWECOffer, "id">) => {
    try {
      setLoading(true)
      const response = await axios.post("/api/swec-offers", offerData)
      setSWECOffers((prev) => [...prev, response.data])
      return response.data
    } catch (err) {
      console.error("Error adding SWEC offer:", err)
      setError("Failed to add SWEC offer")
      throw err
    } finally {
      setLoading(false)
    }
  }

  const updateSWECOffer = async (id: string, offerData: Partial<SWECOffer>) => {
    try {
      setLoading(true)
      const response = await axios.patch(`/api/swec-offers/${id}`, offerData)
      setSWECOffers((prev) => prev.map((offer) => (offer.id === id ? response.data : offer)))
      return response.data
    } catch (err) {
      console.error(`Error updating SWEC offer ${id}:`, err)
      setError("Failed to update SWEC offer")
      throw err
    } finally {
      setLoading(false)
    }
  }

  const deleteSWECOffer = async (id: string) => {
    try {
      setLoading(true)
      await axios.delete(`/api/swec-offers/${id}`)
      setSWECOffers((prev) => prev.filter((offer) => offer.id !== id))
    } catch (err) {
      console.error(`Error deleting SWEC offer ${id}:`, err)
      setError("Failed to delete SWEC offer")
      throw err
    } finally {
      setLoading(false)
    }
  }

  return {
    swecOffers,
    loading,
    error,
    addSWECOffer,
    updateSWECOffer,
    deleteSWECOffer,
  }
}

