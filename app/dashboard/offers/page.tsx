import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"
import { getCollection } from "@/lib/mongo"
import { OfferTable } from "@/components/tpo/OfferTable"

export default async function OffersPage() {
  const offersCollection = await getCollection("offers")
  const offers = await offersCollection.find().sort({ createdAt: -1 }).toArray()

  // Get student and company names for each offer
  const studentsCollection = await getCollection("students")
  const companiesCollection = await getCollection("companies")

  for (const offer of offers) {
    if (offer.studentId) {
      const student = await studentsCollection.findOne({ _id: offer.studentId })
      offer.studentName = student?.name || "Unknown Student"
    }

    if (offer.companyId) {
      const company = await companiesCollection.findOne({ _id: offer.companyId })
      offer.companyName = company?.name || "Unknown Company"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Placement Offers</h1>
        <Button asChild>
          <Link href="/dashboard/offers/create">
            <Plus className="mr-2 h-4 w-4" />
            Add Offer
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Offer Management</CardTitle>
          <CardDescription>View and manage all placement offers in the system</CardDescription>
        </CardHeader>
        <CardContent>
          <OfferTable initialOffers={offers} />
        </CardContent>
      </Card>
    </div>
  )
}

