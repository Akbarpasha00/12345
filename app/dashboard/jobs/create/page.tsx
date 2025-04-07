import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"
import { getCollection } from "@/lib/mongo"
import { JobForm } from "@/components/tpo/JobForm"

export default async function CreateJobPage() {
  const companiesCollection = await getCollection("companies")
  const companies = await companiesCollection.find().sort({ name: 1 }).toArray()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Create New Job</h1>
        <Button variant="outline" asChild>
          <Link href="/dashboard/jobs">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Jobs
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Job Information</CardTitle>
          <CardDescription>Enter the job details below to add it to the system.</CardDescription>
        </CardHeader>
        <CardContent>
          <JobForm companies={companies} />
        </CardContent>
      </Card>
    </div>
  )
}

