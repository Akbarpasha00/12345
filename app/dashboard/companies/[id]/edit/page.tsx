import { notFound } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"
import { getCollection } from "@/lib/mongo"
import { ObjectId } from "mongodb"
import { CompanyForm } from "@/components/tpo/CompanyForm"

interface EditCompanyPageProps {
  params: {
    id: string
  }
}

export default async function EditCompanyPage({ params }: EditCompanyPageProps) {
  const companiesCollection = await getCollection("companies")
  const company = await companiesCollection.findOne({ _id: new ObjectId(params.id) })

  if (!company) {
    notFound()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Edit Company</h1>
        <Button variant="outline" asChild>
          <Link href={`/dashboard/companies/${params.id}`}>
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Company
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Edit Company Information</CardTitle>
          <CardDescription>Update the company details below.</CardDescription>
        </CardHeader>
        <CardContent>
          <CompanyForm initialData={company} companyId={params.id} />
        </CardContent>
      </Card>
    </div>
  )
}

