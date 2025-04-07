"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import type { Offer } from "@/types/offer"

export function useOffers() {
  const [offers, setOffers] = useState<Offer[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        setLoading(true)
        const response = await axios.get("/api/offers")
        setOffers(response.data)
        setError(null)
      } catch (err) {
        console.error("Error fetching offers:", err)
        setError("Failed to fetch offers")
      } finally {
        setLoading(false)
      }
    }

    fetchOffers()
  }, [])

  const addOffer = async (offerData: Omit<Offer, "id">) => {
    try {
      setLoading(true)
      const response = await axios.post("/api/offers", offerData)
      setOffers((prev) => [...prev, response.data])
      return response.data
    } catch (err) {
      console.error("Error adding offer:", err)
      setError("Failed to add offer")
      throw err
    } finally {
      setLoading(false)
    }
  }

  const updateOffer = async (id: string, offerData: Partial<Offer>) => {
    try {
      setLoading(true)
      const response = await axios.patch(`/api/offers/${id}`, offerData)
      setOffers((prev) => prev.map((offer) => (offer.id === id ? response.data : offer)))
      return response.data
    } catch (err) {
      console.error(`Error updating offer ${id}:`, err)
      setError("Failed to update offer")
      throw err
    } finally {
      setLoading(false)
    }
  }

  const deleteOffer = async (id: string) => {
    try {
      setLoading(true)
      await axios.delete(`/api/offers/${id}`)
      setOffers((prev) => prev.filter((offer) => offer.id !== id))
    } catch (err) {
      console.error(`Error deleting offer ${id}:`, err)
      setError("Failed to delete offer")
      throw err
    } finally {
      setLoading(false)
    }
  }

  return {
    offers,
    loading,
    error,
    addOffer,
    updateOffer,
    deleteOffer,
  }
}

