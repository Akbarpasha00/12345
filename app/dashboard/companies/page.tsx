import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"
import { getCollection } from "@/lib/mongo"
import { CompanyGrid } from "@/components/tpo/CompanyGrid"

export default async function CompaniesPage() {
  const companiesCollection = await getCollection("companies")
  const companies = await companiesCollection.find().sort({ createdAt: -1 }).toArray()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Companies</h1>
        <Button asChild>
          <Link href="/dashboard/companies/create">
            <Plus className="mr-2 h-4 w-4" />
            Add Company
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Company Management</CardTitle>
          <CardDescription>View and manage all partner companies in the system</CardDescription>
        </CardHeader>
        <CardContent>
          <CompanyGrid initialCompanies={companies} />
        </CardContent>
      </Card>
    </div>
  )
}

