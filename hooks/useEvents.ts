"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import type { Event } from "@/types/event"

export function useEvents() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true)
        const response = await axios.get("/api/events")
        setEvents(response.data)
        setError(null)
      } catch (err) {
        console.error("Error fetching events:", err)
        setError("Failed to fetch events")
      } finally {
        setLoading(false)
      }
    }

    fetchEvents()
  }, [])

  const addEvent = async (eventData: Omit<Event, "id">) => {
    try {
      setLoading(true)
      const response = await axios.post("/api/events", eventData)
      setEvents((prev) => [...prev, response.data])
      return response.data
    } catch (err) {
      console.error("Error adding event:", err)
      setError("Failed to add event")
      throw err
    } finally {
      setLoading(false)
    }
  }

  const updateEvent = async (id: string, eventData: Partial<Event>) => {
    try {
      setLoading(true)
      const response = await axios.patch(`/api/events/${id}`, eventData)
      setEvents((prev) => prev.map((event) => (event.id === id ? response.data : event)))
      return response.data
    } catch (err) {
      console.error(`Error updating event ${id}:`, err)
      setError("Failed to update event")
      throw err
    } finally {
      setLoading(false)
    }
  }

  const deleteEvent = async (id: string) => {
    try {
      setLoading(true)
      await axios.delete(`/api/events/${id}`)
      setEvents((prev) => prev.filter((event) => event.id !== id))
    } catch (err) {
      console.error(`Error deleting event ${id}:`, err)
      setError("Failed to delete event")
      throw err
    } finally {
      setLoading(false)
    }
  }

  return {
    events,
    loading,
    error,
    addEvent,
    updateEvent,
    deleteEvent,
  }
}

