import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"
import { getCollection } from "@/lib/mongo"
import { SWECOffersTable } from "./components/swec-offers-table"

export default async function SWECOffersPage() {
  const offersCollection = await getCollection("swecOffers")
  const offers = await offersCollection.find().sort({ offerDate: -1 }).toArray()

  // Get company names for each offer
  const companiesCollection = await getCollection("companies")
  for (const offer of offers) {
    if (offer.companyId) {
      const company = await companiesCollection.findOne({ _id: offer.companyId })
      offer.companyName = company?.name || "Unknown Company"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">SWEC Offers</h1>
        <Button asChild>
          <Link href="/dashboard/swec-offers/new">
            <Plus className="mr-2 h-4 w-4" />
            Add SWEC Offer
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>SWEC Offers Management</CardTitle>
          <CardDescription>View and manage all SWEC placement offers in the system</CardDescription>
        </CardHeader>
        <CardContent>
          <SWECOffersTable initialOffers={offers} />
        </CardContent>
      </Card>
    </div>
  )
}

