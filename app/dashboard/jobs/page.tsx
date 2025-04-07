import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"
import { getCollection } from "@/lib/mongo"
import { JobTable } from "@/components/tpo/JobTable"

export default async function JobsPage() {
  const jobsCollection = await getCollection("jobs")
  const jobs = await jobsCollection.find().sort({ createdAt: -1 }).toArray()

  // Get company names for each job
  const companiesCollection = await getCollection("companies")
  for (const job of jobs) {
    if (job.companyId) {
      const company = await companiesCollection.findOne({ _id: job.companyId })
      job.companyName = company?.name || "Unknown Company"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Job Listings</h1>
        <Button asChild>
          <Link href="/dashboard/jobs/create">
            <Plus className="mr-2 h-4 w-4" />
            Add Job
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Job Management</CardTitle>
          <CardDescription>View and manage all job listings in the system</CardDescription>
        </CardHeader>
        <CardContent>
          <JobTable initialJobs={jobs} />
        </CardContent>
      </Card>
    </div>
  )
}

