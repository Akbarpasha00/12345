import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { getCollection } from "@/lib/mongo"
import { PlacementPie } from "@/components/charts/PlacementPie"
import { TrendGraph } from "@/components/charts/TrendGraph"

export default async function AnalyticsPage() {
  const studentsCollection = await getCollection("students")
  const offersCollection = await getCollection("offers")
  const companiesCollection = await getCollection("companies")

  // Get placement statistics
  const totalStudents = await studentsCollection.countDocuments()
  const placedStudents = await studentsCollection.countDocuments({ placementStatus: "Placed" })
  const placementRate = totalStudents > 0 ? (placedStudents / totalStudents) * 100 : 0

  // Get top companies by offers
  const companies = await companiesCollection.find().toArray()
  const companyOffers = await offersCollection
    .aggregate([{ $group: { _id: "$companyId", count: { $sum: 1 } } }])
    .toArray()

  // Map company IDs to names and counts
  const topCompanies = companyOffers
    .map((item) => {
      const company = companies.find((c) => c._id.toString() === item._id?.toString())
      return {
        name: company?.name || "Unknown",
        count: item.count,
      }
    })
    .sort((a, b) => b.count - a.count)
    .slice(0, 5)

  // Get salary statistics
  const offers = await offersCollection.find().toArray()
  const salaries = offers.map((offer) => offer.salary).filter(Boolean)
  const avgSalary = salaries.length > 0 ? salaries.reduce((sum, salary) => sum + salary, 0) / salaries.length : 0

  // Get monthly placement trends for the last 6 months
  const sixMonthsAgo = new Date()
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6)

  const monthlyPlacements = await offersCollection
    .aggregate([
      {
        $match: {
          createdAt: { $gte: sixMonthsAgo },
        },
      },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
          },
          count: { $sum: 1 },
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } },
    ])
    .toArray()

  // Format for chart
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  const trendData = monthlyPlacements.map((item) => ({
    month: months[item._id.month - 1],
    placements: item.count,
  }))

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
        <Button asChild>
          <Link href="/dashboard/analytics/api-summary">Gemini AI Summary</Link>
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Placement Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{placementRate.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">
              {placedStudents} out of {totalStudents} students placed
            </p>
            <div className="mt-4 h-[180px]">
              <PlacementPie
                data={[
                  { name: "Placed", value: placedStudents },
                  { name: "Not Placed", value: totalStudents - placedStudents },
                ]}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Average Package</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{avgSalary.toLocaleString("en-IN")}</div>
            <p className="text-xs text-muted-foreground">Based on {salaries.length} offers</p>
            <div className="mt-6">
              <div className="space-y-2">
                <div className="flex items-center">
                  <span className="text-sm font-medium">Highest Package:</span>
                  <span className="ml-auto text-sm">₹{Math.max(...salaries, 0).toLocaleString("en-IN")}</span>
                </div>
                <div className="flex items-center">
                  <span className="text-sm font-medium">Lowest Package:</span>
                  <span className="ml-auto text-sm">₹{Math.min(...salaries, 0).toLocaleString("en-IN")}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Top Recruiting Companies</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topCompanies.length === 0 ? (
                <p className="text-sm text-muted-foreground">No company data available.</p>
              ) : (
                topCompanies.map((company, index) => (
                  <div key={company.name} className="flex items-center">
                    <span className="text-sm">
                      {index + 1}. {company.name}
                    </span>
                    <span className="ml-auto text-sm font-medium">{company.count} offers</span>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Placement Trends</CardTitle>
          <CardDescription>Monthly placement statistics for the last 6 months</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <TrendGraph data={trendData} />
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="department" className="space-y-4">
        <TabsList>
          <TabsTrigger value="department">Department Wise</TabsTrigger>
          <TabsTrigger value="gender">Gender Wise</TabsTrigger>
          <TabsTrigger value="category">Category Wise</TabsTrigger>
        </TabsList>

        <TabsContent value="department" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Department Wise Placement Statistics</CardTitle>
              <CardDescription>Placement rates across different departments</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Department statistics will be displayed here.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="gender" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Gender Wise Placement Statistics</CardTitle>
              <CardDescription>Placement rates by gender</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Gender statistics will be displayed here.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="category" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Category Wise Placement Statistics</CardTitle>
              <CardDescription>Placement rates by student category</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Category statistics will be displayed here.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

