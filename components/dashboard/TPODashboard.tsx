import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, Building2, Briefcase, Calendar, TrendingUp, CheckCircle } from "lucide-react"
import { getCollection } from "@/lib/mongo"

export async function TPODashboard() {
  // Fetch counts for dashboard stats
  const studentsCollection = await getCollection("students")
  const studentsCount = await studentsCollection.countDocuments()
  const placedStudentsCount = await studentsCollection.countDocuments({ placementStatus: "Placed" })
  const placementRate = studentsCount > 0 ? (placedStudentsCount / studentsCount) * 100 : 0

  const companiesCollection = await getCollection("companies")
  const companiesCount = await companiesCollection.countDocuments()

  const jobsCollection = await getCollection("jobs")
  const jobsCount = await jobsCollection.countDocuments({ status: "Open" })

  const offersCollection = await getCollection("offers")
  const offersCount = await offersCollection.countDocuments()

  // Fetch recent placements
  const recentPlacements = await studentsCollection
    .find({ placementStatus: "Placed" })
    .sort({ updatedAt: -1 })
    .limit(5)
    .toArray()

  // Fetch upcoming job drives
  const upcomingDrives = await jobsCollection
    .find({
      status: "Upcoming",
      date: { $gte: new Date() },
    })
    .sort({ date: 1 })
    .limit(5)
    .toArray()

  // For each drive, fetch the company name
  for (const drive of upcomingDrives) {
    const company = await companiesCollection.findOne({ _id: drive.companyId })
    drive.company = { name: company?.name || "Unknown Company" }
  }

  const stats = [
    {
      title: "Total Students",
      value: studentsCount.toString(),
      description: "Active students in the system",
      icon: Users,
      trend: "+12.5%",
      trendUp: true,
    },
    {
      title: "Placement Rate",
      value: `${placementRate.toFixed(1)}%`,
      description: `${placedStudentsCount} out of ${studentsCount} placed`,
      icon: CheckCircle,
      trend: "+8.2%",
      trendUp: true,
    },
    {
      title: "Open Jobs",
      value: jobsCount.toString(),
      description: "Available positions",
      icon: Briefcase,
      trend: "+28.4%",
      trendUp: true,
    },
    {
      title: "Upcoming Drives",
      value: upcomingDrives.length.toString(),
      description: "Scheduled in next 30 days",
      icon: Calendar,
      trend: "+15.3%",
      trendUp: true,
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">TPO Dashboard</h1>
        <div className="bg-blue-500 text-white px-3 py-1 rounded-md text-sm font-medium">TPO Access</div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="dashboard-card">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
              <div className={`mt-2 flex items-center text-xs ${stat.trendUp ? "text-green-500" : "text-red-500"}`}>
                {stat.trendUp ? (
                  <TrendingUp className="mr-1 h-3 w-3" />
                ) : (
                  <TrendingUp className="mr-1 h-3 w-3 rotate-180" />
                )}
                {stat.trend} from last month
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="placements">Placements</TabsTrigger>
          <TabsTrigger value="companies">Companies</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Recent Placements</CardTitle>
                <CardDescription>Latest successful placements</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentPlacements.length === 0 ? (
                    <p className="text-sm text-muted-foreground">No recent placements found.</p>
                  ) : (
                    recentPlacements.map((student) => (
                      <div key={student._id.toString()} className="flex items-center gap-4">
                        <div className="rounded-full bg-primary/10 p-2">
                          <CheckCircle className="h-4 w-4 text-primary" />
                        </div>
                        <div className="flex-1 space-y-1">
                          <p className="text-sm font-medium">{student.name}</p>
                          <p className="text-xs text-muted-foreground">Placed at {student.company}</p>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {new Date(student.updatedAt).toLocaleDateString()}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Upcoming Job Drives</CardTitle>
                <CardDescription>Scheduled in the next 30 days</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingDrives.length === 0 ? (
                    <p className="text-sm text-muted-foreground">No upcoming drives found.</p>
                  ) : (
                    upcomingDrives.map((drive) => (
                      <div key={drive._id.toString()} className="flex items-center gap-4">
                        <div className="rounded-full bg-primary/10 p-2">
                          <Calendar className="h-4 w-4 text-primary" />
                        </div>
                        <div className="flex-1 space-y-1">
                          <p className="text-sm font-medium">{drive.company.name} Drive</p>
                          <p className="text-xs text-muted-foreground">{new Date(drive.date).toLocaleDateString()}</p>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {Math.ceil((new Date(drive.date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))}{" "}
                          days
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common TPO tasks</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Button className="w-full justify-start" variant="outline">
                    <Users className="mr-2 h-4 w-4" />
                    Add New Student
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Building2 className="mr-2 h-4 w-4" />
                    Add New Company
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Briefcase className="mr-2 h-4 w-4" />
                    Post New Job
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Calendar className="mr-2 h-4 w-4" />
                    Schedule Drive
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="placements" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Placement Statistics</CardTitle>
              <CardDescription>Detailed placement metrics and trends</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Placement statistics will be displayed here.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="companies" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Company Engagement</CardTitle>
              <CardDescription>Track company participation and recruitment</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Company engagement metrics will be displayed here.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

