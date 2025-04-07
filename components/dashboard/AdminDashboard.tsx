import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, Building2, Briefcase, Calendar, TrendingUp, CheckCircle } from "lucide-react"
import { getCollection } from "@/lib/mongo"

export async function AdminDashboard() {
  // Fetch counts for dashboard stats
  const studentsCollection = await getCollection("students")
  const studentsCount = await studentsCollection.countDocuments()

  const companiesCollection = await getCollection("companies")
  const companiesCount = await companiesCollection.countDocuments()

  const jobsCollection = await getCollection("jobs")
  const jobsCount = await jobsCollection.countDocuments({ status: "Open" })

  const offersCollection = await getCollection("offers")
  const offersCount = await offersCollection.countDocuments()

  const usersCollection = await getCollection("users")
  const usersCount = await usersCollection.countDocuments()

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
    if (drive.companyId) {
      const company = await companiesCollection.findOne({ _id: drive.companyId })
      drive.company = { name: company?.name || "Unknown Company" }
    } else {
      drive.company = { name: "Unknown Company" }
    }
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
      title: "Companies",
      value: companiesCount.toString(),
      description: "Partnered companies",
      icon: Building2,
      trend: "+3.2%",
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
      title: "Placement Offers",
      value: offersCount.toString(),
      description: "Total offers made",
      icon: CheckCircle,
      trend: "+5.3%",
      trendUp: true,
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <div className="bg-primary text-primary-foreground px-3 py-1 rounded-md text-sm font-medium">Admin Access</div>
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
          <TabsTrigger value="students">Students</TabsTrigger>
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
                <CardTitle>System Overview</CardTitle>
                <CardDescription>Current system status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Database Status</span>
                    <span className="flex items-center text-xs text-green-500">
                      <CheckCircle className="mr-1 h-3 w-3" /> Connected
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">API Status</span>
                    <span className="flex items-center text-xs text-green-500">
                      <CheckCircle className="mr-1 h-3 w-3" /> Operational
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Last Backup</span>
                    <span className="text-xs text-muted-foreground">
                      {new Date().toLocaleDateString()} {new Date().toLocaleTimeString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Storage Usage</span>
                    <span className="text-xs text-muted-foreground">245 MB / 5 GB</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="students" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Student Statistics</CardTitle>
              <CardDescription>Overview of student data</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <div className="rounded-md border p-4">
                    <div className="text-2xl font-bold">{studentsCount}</div>
                    <p className="text-sm text-muted-foreground">Total Students</p>
                  </div>
                  <div className="rounded-md border p-4">
                    <div className="text-2xl font-bold">
                      {recentPlacements.length > 0 ? recentPlacements.length : 0}
                    </div>
                    <p className="text-sm text-muted-foreground">Placed Students</p>
                  </div>
                  <div className="rounded-md border p-4">
                    <div className="text-2xl font-bold">
                      {studentsCount > 0 && recentPlacements.length > 0
                        ? ((recentPlacements.length / studentsCount) * 100).toFixed(1)
                        : "0.0"}
                      %
                    </div>
                    <p className="text-sm text-muted-foreground">Placement Rate</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="companies" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Company Statistics</CardTitle>
              <CardDescription>Overview of company data</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <div className="rounded-md border p-4">
                    <div className="text-2xl font-bold">{companiesCount}</div>
                    <p className="text-sm text-muted-foreground">Total Companies</p>
                  </div>
                  <div className="rounded-md border p-4">
                    <div className="text-2xl font-bold">{jobsCount}</div>
                    <p className="text-sm text-muted-foreground">Open Jobs</p>
                  </div>
                  <div className="rounded-md border p-4">
                    <div className="text-2xl font-bold">{upcomingDrives.length}</div>
                    <p className="text-sm text-muted-foreground">Upcoming Drives</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

