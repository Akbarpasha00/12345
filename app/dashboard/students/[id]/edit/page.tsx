import { notFound } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"
import { getCollection } from "@/lib/mongo"
import { ObjectId } from "mongodb"
import { StudentForm } from "@/components/tpo/StudentForm"

interface EditStudentPageProps {
  params: {
    id: string
  }
}

export default async function EditStudentPage({ params }: EditStudentPageProps) {
  const studentsCollection = await getCollection("students")
  const student = await studentsCollection.findOne({ _id: new ObjectId(params.id) })

  if (!student) {
    notFound()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Edit Student</h1>
        <Button variant="outline" asChild>
          <Link href={`/dashboard/students/${params.id}`}>
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Student
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Edit Student Information</CardTitle>
          <CardDescription>Update the student details below.</CardDescription>
        </CardHeader>
        <CardContent>
          <StudentForm initialData={student} studentId={params.id} />
        </CardContent>
      </Card>
    </div>
  )
}

