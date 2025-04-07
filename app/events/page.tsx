import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"
import prisma from "@/lib/prisma"
import { EventTable } from "./components/event-table"

export default async function EventsPage() {
  const events = await prisma.event.findMany({
    orderBy: {
      startDate: "desc",
    },
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Events</h1>
        <Button asChild>
          <Link href="/events/new">
            <Plus className="mr-2 h-4 w-4" />
            Add Event
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Event Management</CardTitle>
          <CardDescription>View and manage all events in the system</CardDescription>
        </CardHeader>
        <CardContent>
          <EventTable initialEvents={events} />
        </CardContent>
      </Card>
    </div>
  )
}

