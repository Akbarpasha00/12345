import { notFound } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"
import { getCollection } from "@/lib/mongo"
import { ObjectId } from "mongodb"
import { JobForm } from "@/components/tpo/JobForm"

interface EditJobPageProps {
  params: {
    id: string
  }
}

export default async function EditJobPage({ params }: EditJobPageProps) {
  const jobsCollection = await getCollection("jobs")
  const job = await jobsCollection.findOne({ _id: new ObjectId(params.id) })

  if (!job) {
    notFound()
  }

  const companiesCollection = await getCollection("companies")
  const companies = await companiesCollection.find().sort({ name: 1 }).toArray()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Edit Job</h1>
        <Button variant="outline" asChild>
          <Link href={`/dashboard/jobs/${params.id}`}>
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Job
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Edit Job Information</CardTitle>
          <CardDescription>Update the job details below.</CardDescription>
        </CardHeader>
        <CardContent>
          <JobForm initialData={job} jobId={params.id} companies={companies} />
        </CardContent>
      </Card>
    </div>
  )
}

