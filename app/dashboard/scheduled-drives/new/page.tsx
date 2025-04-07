import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { getCollection } from "@/lib/mongo"
import { ScheduledDriveForm } from "../components/scheduled-drive-form"

export default async function NewScheduledDrivePage() {
  const companiesCollection = await getCollection("companies")
  const companies = await companiesCollection.find().sort({ name: 1 }).toArray()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Add New Scheduled Drive</h1>
        <Button variant="outline" asChild>
          <Link href="/dashboard/scheduled-drives">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Scheduled Drives
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Scheduled Drive Information</CardTitle>
          <CardDescription>Enter the scheduled drive details below to add it to the system.</CardDescription>
        </CardHeader>
        <CardContent>
          <ScheduledDriveForm companies={companies} />
        </CardContent>
      </Card>
    </div>
  )
}

