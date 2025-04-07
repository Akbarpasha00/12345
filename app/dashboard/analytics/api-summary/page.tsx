import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"
import { getCollection } from "@/lib/mongo"
import { generateSummary } from "@/lib/gemini"

export default async function ApiSummaryPage() {
  // Get data for Gemini to analyze
  const studentsCollection = await getCollection("students")
  const offersCollection = await getCollection("offers")
  const companiesCollection = await getCollection("companies")
  const jobsCollection = await getCollection("jobs")

  const totalStudents = await studentsCollection.countDocuments()
  const placedStudents = await studentsCollection.countDocuments({ placementStatus: "Placed" })
  const totalCompanies = await companiesCollection.countDocuments()
  const totalJobs = await jobsCollection.countDocuments()
  const totalOffers = await offersCollection.countDocuments()

  // Get average package
  const offers = await offersCollection.find().toArray()
  const salaries = offers.map((offer) => offer.salary).filter(Boolean)
  const avgSalary = salaries.length > 0 ? salaries.reduce((sum, salary) => sum + salary, 0) / salaries.length : 0

  // Get top companies
  const companyOffers = await offersCollection
    .aggregate([{ $group: { _id: "$companyId", count: { $sum: 1 } } }])
    .toArray()

  // Prepare data for Gemini
  const placementData = {
    totalStudents,
    placedStudents,
    placementRate: totalStudents > 0 ? (placedStudents / totalStudents) * 100 : 0,
    totalCompanies,
    totalJobs,
    totalOffers,
    avgSalary,
    highestSalary: Math.max(...salaries, 0),
    lowestSalary: Math.min(...salaries, 0),
  }

  // Generate summary using Gemini
  const summary = await generateSummary(placementData)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">AI-Generated Placement Summary</h1>
        <Button variant="outline" asChild>
          <Link href="/dashboard/analytics">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Analytics
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Gemini AI Analysis</CardTitle>
          <CardDescription>AI-generated insights based on your placement data</CardDescription>
        </CardHeader>
        <CardContent className="prose max-w-none">
          <div dangerouslySetInnerHTML={{ __html: summary }} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Data Used for Analysis</CardTitle>
          <CardDescription>Raw data provided to the AI for analysis</CardDescription>
        </CardHeader>
        <CardContent>
          <pre className="bg-muted p-4 rounded-md overflow-auto">{JSON.stringify(placementData, null, 2)}</pre>
        </CardContent>
      </Card>
    </div>
  )
}

