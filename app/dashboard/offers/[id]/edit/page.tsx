import { notFound } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"
import { getCollection } from "@/lib/mongo"
import { ObjectId } from "mongodb"
import { OfferForm } from "@/components/tpo/OfferForm"

interface EditOfferPageProps {
  params: {
    id: string
  }
}

export default async function EditOfferPage({ params }: EditOfferPageProps) {
  const offersCollection = await getCollection("offers")
  const offer = await offersCollection.findOne({ _id: new ObjectId(params.id) })

  if (!offer) {
    notFound()
  }

  const studentsCollection = await getCollection("students")
  const students = await studentsCollection.find().sort({ name: 1 }).toArray()

  const companiesCollection = await getCollection("companies")
  const companies = await companiesCollection.find().sort({ name: 1 }).toArray()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Edit Offer</h1>
        <Button variant="outline" asChild>
          <Link href={`/dashboard/offers/${params.id}`}>
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Offer
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Edit Offer Information</CardTitle>
          <CardDescription>Update the offer details below.</CardDescription>
        </CardHeader>
        <CardContent>
          <OfferForm initialData={offer} offerId={params.id} students={students} companies={companies} />
        </CardContent>
      </Card>
    </div>
  )
}

