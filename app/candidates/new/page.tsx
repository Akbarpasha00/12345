import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CandidateForm } from "../components/candidate-form"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"

export default function NewCandidatePage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Add New Candidate</h1>
        <Button variant="outline" asChild>
          <Link href="/candidates">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Candidates
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Candidate Information</CardTitle>
          <CardDescription>Enter the candidate details below to add them to the system.</CardDescription>
        </CardHeader>
        <CardContent>
          <CandidateForm />
        </CardContent>
      </Card>
    </div>
  )
}

