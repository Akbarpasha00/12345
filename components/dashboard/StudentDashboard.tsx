import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Briefcase, Calendar, GraduationCap, FileText, MapPin } from "lucide-react"
import { getCollection } from "@/lib/mongo"
import { ObjectId } from "mongodb"
import { Button } from "@/components/ui/button"

interface StudentDashboardProps {
  userId?: string
}

export async function StudentDashboard({ userId }: StudentDashboardProps) {
  // Fetch student profile if userId is provided
  let student = null
  if (userId) {
    const usersCollection = await getCollection("users")
    const user = await usersCollection.findOne({ _id: new ObjectId(userId) })

    if (user && user.studentId) {
      const studentsCollection = await getCollection("students")
      student = await studentsCollection.findOne({ _id: new ObjectId(user.studentId) })
    }
  }

  // If no student profile found, use demo data
  if (!student) {
    student = {
      name: "John Doe",
      email: "john.doe@example.com",
      branch: "Computer Science",
      college: "Example University",
      cgpa: 8.5,
      placementStatus: "Active",
      skills: ["JavaScript", "React", "Node.js", "MongoDB"],
    }
  }

  // Fetch job listings
  const jobsCollection = await getCollection("jobs")
  const jobs = await jobsCollection.find({ status: "Open" }).sort({ createdAt: -1 }).limit(5).toArray()

  // Fetch company names for jobs
  const companiesCollection = await getCollection("companies")
  for (const job of jobs) {
    if (job.companyId) {
      const company = await companiesCollection.findOne({ _id: job.companyId })
      job.companyName = company?.name || "Unknown Company"
    }
  }

  // Fetch upcoming drives
  const upcomingDrives = await jobsCollection
    .find({
      status: "Upcoming",
      date: { $gte: new Date() },
    })
    .sort({ date: 1 })
    .limit(3)
    .toArray()

  // For each drive, fetch the company name
  for (const drive of upcomingDrives) {
    const company = await companiesCollection.findOne({ _id: drive.companyId })
    drive.company = { name: company?.name || "Unknown Company" }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Student Dashboard</h1>
        <div className="bg-green-500 text-white px-3 py-1 rounded-md text-sm font-medium">Student Access</div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>My Profile</CardTitle>
            <CardDescription>Your personal and academic information</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <GraduationCap className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-medium">{student.name}</h3>
                  <p className="text-sm text-muted-foreground">{student.email}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4">
                <div>
                  <p className="text-sm font-medium">Branch</p>
                  <p className="text-sm text-muted-foreground">{student.branch}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">College</p>
                  <p className="text-sm text-muted-foreground">{student.college}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">CGPA</p>
                  <p className="text-sm text-muted-foreground">{student.cgpa}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Status</p>
                  <div className="flex items-center">
                    <span
                      className={`inline-block h-2 w-2 rounded-full ${student.placementStatus === "Placed" ? "bg-green-500" : "bg-blue-500"} mr-2`}
                    ></span>
                    <p className="text-sm text-muted-foreground">{student.placementStatus}</p>
                  </div>
                </div>
              </div>

              {student.skills && (
                <div className="pt-4">
                  <p className="text-sm font-medium mb-2">Skills</p>
                  <div className="flex flex-wrap gap-2">
                    {student.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="pt-4">
                <Button className="w-full">Update Profile</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Placement Drives</CardTitle>
            <CardDescription>Drives you can register for</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingDrives.length === 0 ? (
                <p className="text-sm text-muted-foreground">No upcoming drives found.</p>
              ) : (
                upcomingDrives.map((drive) => (
                  <div key={drive._id.toString()} className="flex items-start gap-4 border-b pb-4 last:border-0">
                    <div className="rounded-full bg-primary/10 p-2">
                      <Calendar className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">{drive.company.name} Drive</p>
                        <p className="text-xs text-muted-foreground">
                          {Math.ceil((new Date(drive.date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))}{" "}
                          days left
                        </p>
                      </div>
                      <p className="text-xs text-muted-foreground">Date: {new Date(drive.date).toLocaleDateString()}</p>
                      <p className="text-xs text-muted-foreground">Location: {drive.location}</p>
                      <div className="pt-2">
                        <Button size="sm" variant="outline" className="w-full">
                          Register Now
                        </Button>
                      </div>
                    </div>
                  </div>
                ))
              )}

              {upcomingDrives.length > 0 && (
                <div className="pt-2">
                  <Button variant="link" className="w-full">
                    View All Drives
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="jobs" className="space-y-4">
        <TabsList>
          <TabsTrigger value="jobs">Available Jobs</TabsTrigger>
          <TabsTrigger value="applications">My Applications</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
        </TabsList>

        <TabsContent value="jobs" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Latest Job Openings</CardTitle>
              <CardDescription>Jobs matching your profile</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {jobs.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No job openings found.</p>
                ) : (
                  jobs.map((job) => (
                    <div key={job._id.toString()} className="border-b pb-4 last:border-0">
                      <div className="flex items-center justify-between">
                        <h3 className="text-base font-medium">{job.title}</h3>
                        <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-100">
                          New
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">{job.companyName}</p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        <span className="inline-flex items-center text-xs text-muted-foreground">
                          <MapPin className="mr-1 h-3 w-3" /> {job.location}
                        </span>
                        <span className="inline-flex items-center text-xs text-muted-foreground">
                          <Briefcase className="mr-1 h-3 w-3" /> {job.positions} positions
                        </span>
                        <span className="inline-flex items-center text-xs text-muted-foreground">
                          <Calendar className="mr-1 h-3 w-3" /> Apply by {new Date(job.deadline).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="mt-2 flex flex-wrap gap-1">
                        {job.skills &&
                          job.skills.map((skill, index) => (
                            <span
                              key={index}
                              className="inline-flex items-center rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary"
                            >
                              {skill}
                            </span>
                          ))}
                      </div>
                      <div className="mt-3">
                        <Button size="sm">Apply Now</Button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="applications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>My Job Applications</CardTitle>
              <CardDescription>Track your application status</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">You haven't applied to any jobs yet.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="resources" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Placement Resources</CardTitle>
              <CardDescription>Helpful materials for your placement preparation</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="rounded-full bg-primary/10 p-2">
                    <FileText className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium">Resume Building Guide</h3>
                    <p className="text-xs text-muted-foreground">Learn how to create an effective resume</p>
                    <Button variant="link" className="h-auto p-0 text-xs">
                      Download PDF
                    </Button>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="rounded-full bg-primary/10 p-2">
                    <FileText className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium">Interview Preparation</h3>
                    <p className="text-xs text-muted-foreground">Tips and tricks for acing your interviews</p>
                    <Button variant="link" className="h-auto p-0 text-xs">
                      Download PDF
                    </Button>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="rounded-full bg-primary/10 p-2">
                    <FileText className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium">Technical Interview Questions</h3>
                    <p className="text-xs text-muted-foreground">Common technical questions and answers</p>
                    <Button variant="link" className="h-auto p-0 text-xs">
                      Download PDF
                    </Button>
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

