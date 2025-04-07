import { CompanyGrid } from "./components/company-grid"
import { db } from "@/lib/db"

export const dynamic = "force-dynamic"

export default async function CompaniesPage() {
  const companies = await db.companies.findMany({})

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Companies</h1>
        <p className="text-muted-foreground">Manage company profiles and recruitment partners.</p>
      </div>
      <CompanyGrid companies={companies} />
    </div>
  )
}

