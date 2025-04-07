import { getCandidateById } from "@/lib/db"
import { notFound } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Edit } from "lucide-react"

export const metadata = {
  title: "Candidate Details",
  description: "View candidate details",
}

export default async function CandidatePage({ params }) {
  const candidate = await getCandidateById(params.id)

  if (!candidate) {
    notFound()
  }

  return (
    <div className="container mx-auto py-10">
      <div className="mb-6">
        <Link href="/candidates">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Candidates
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">{candidate.name}</CardTitle>
          <CardDescription>{candidate.email}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Student ID</h3>
              <p>{candidate.studentId}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Department</h3>
              <p>{candidate.department}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Year of Graduation</h3>
              <p>{candidate.graduationYear}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">CGPA</h3>
              <p>{candidate.cgpa}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Phone</h3>
              <p>{candidate.phone}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Status</h3>
              <p>{candidate.status}</p>
            </div>
          </div>

          {candidate.skills && (
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {candidate.skills.map((skill, index) => (
                  <span key={index} className="bg-primary/10 text-primary px-2 py-1 rounded-md text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {candidate.bio && (
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Bio</h3>
              <p className="text-sm">{candidate.bio}</p>
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Link href={`/candidates/${candidate.id}/edit`}>
            <Button>
              <Edit className="mr-2 h-4 w-4" />
              Edit Candidate
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}

