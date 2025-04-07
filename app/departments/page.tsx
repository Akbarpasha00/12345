import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"
import prisma from "@/lib/prisma"
import { DepartmentTable } from "./components/department-table"

export default async function DepartmentsPage() {
  const departments = await prisma.department.findMany({
    orderBy: {
      name: "asc",
    },
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Departments</h1>
        <Button asChild>
          <Link href="/departments/new">
            <Plus className="mr-2 h-4 w-4" />
            Add Department
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Department Management</CardTitle>
          <CardDescription>View and manage all departments in the system</CardDescription>
        </CardHeader>
        <CardContent>
          <DepartmentTable initialDepartments={departments} />
        </CardContent>
      </Card>
    </div>
  )
}

