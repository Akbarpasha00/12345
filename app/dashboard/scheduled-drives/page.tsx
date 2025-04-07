import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"
import { getCollection } from "@/lib/mongo"
import { ScheduledDrivesTable } from "./components/scheduled-drives-table"

export default async function ScheduledDrivesPage() {
  const drivesCollection = await getCollection("scheduledDrives")
  const drives = await drivesCollection.find().sort({ date: -1 }).toArray()

  // Get company names for each drive
  const companiesCollection = await getCollection("companies")
  for (const drive of drives) {
    if (drive.companyId) {
      const company = await companiesCollection.findOne({ _id: drive.companyId })
      drive.companyName = company?.name || "Unknown Company"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Scheduled Drives</h1>
        <Button asChild>
          <Link href="/dashboard/scheduled-drives/new">
            <Plus className="mr-2 h-4 w-4" />
            Add Scheduled Drive
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Scheduled Drives Management</CardTitle>
          <CardDescription>View and manage all scheduled placement drives in the system</CardDescription>
        </CardHeader>
        <CardContent>
          <ScheduledDrivesTable initialDrives={drives} />
        </CardContent>
      </Card>
    </div>
  )
}

