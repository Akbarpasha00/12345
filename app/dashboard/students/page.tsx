import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"
import { getCollection } from "@/lib/mongo"
import { StudentTable } from "@/components/tpo/StudentTable"

export default async function StudentsPage() {
  const studentsCollection = await getCollection("students")
  const students = await studentsCollection.find().sort({ createdAt: -1 }).toArray()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Students</h1>
        <Button asChild>
          <Link href="/dashboard/students/create">
            <Plus className="mr-2 h-4 w-4" />
            Add Student
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Student Management</CardTitle>
          <CardDescription>View and manage all students in the system</CardDescription>
        </CardHeader>
        <CardContent>
          <StudentTable initialStudents={students} />
        </CardContent>
      </Card>
    </div>
  )
}

