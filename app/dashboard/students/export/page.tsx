"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, Download, CheckCircle } from "lucide-react"
import Link from "next/link"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/components/ui/use-toast"

export default function ExportStudentsPage() {
  const [exportFormat, setExportFormat] = useState("csv")
  const [selectedFields, setSelectedFields] = useState<string[]>([
    "name",
    "email",
    "phone",
    "gender",
    "branch",
    "college",
  ])
  const [filter, setFilter] = useState("all")
  const [isExporting, setIsExporting] = useState(false)
  const [exportSuccess, setExportSuccess] = useState(false)
  const { toast } = useToast()

  const availableFields = [
    { id: "name", label: "Name" },
    { id: "email", label: "Email" },
    { id: "phone", label: "Phone" },
    { id: "gender", label: "Gender" },
    { id: "branch", label: "Branch" },
    { id: "college", label: "College" },
    { id: "sscPercentage", label: "SSC Percentage" },
    { id: "hscPercentage", label: "HSC Percentage" },
    { id: "cgpa", label: "CGPA" },
    { id: "placementStatus", label: "Placement Status" },
    { id: "company", label: "Company" },
    { id: "package", label: "Package" },
    { id: "createdAt", label: "Registration Date" },
  ]

  const handleFieldToggle = (field: string) => {
    setSelectedFields((prev) => (prev.includes(field) ? prev.filter((f) => f !== field) : [...prev, field]))
  }

  const handleExport = async () => {
    if (selectedFields.length === 0) {
      toast({
        title: "No fields selected",
        description: "Please select at least one field to export",
        variant: "destructive",
      })
      return
    }

    setIsExporting(true)

    try {
      // Prepare the export request
      const response = await fetch("/api/students/export", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          format: exportFormat,
          fields: selectedFields,
          filter,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to export students")
      }

      // Get the blob from the response
      const blob = await response.blob()

      // Create a download link
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `students-export.${exportFormat}`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)

      setExportSuccess(true)
      toast({
        title: "Export successful",
        description: "Your file has been downloaded successfully",
      })

      // Reset success message after 3 seconds
      setTimeout(() => {
        setExportSuccess(false)
      }, 3000)
    } catch (error) {
      console.error("Error exporting data:", error)
      toast({
        title: "Export failed",
        description: error instanceof Error ? error.message : "Failed to export students",
        variant: "destructive",
      })
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Export Students</h1>
        <Button variant="outline" asChild>
          <Link href="/dashboard/students">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Students
          </Link>
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Export Format</CardTitle>
            <CardDescription>Choose the format for your exported data.</CardDescription>
          </CardHeader>
          <CardContent>
            <RadioGroup value={exportFormat} onValueChange={setExportFormat} className="space-y-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="csv" id="csv" />
                <Label htmlFor="csv">CSV (Comma Separated Values)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="excel" id="excel" />
                <Label htmlFor="excel">Excel (.xlsx)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="json" id="json" />
                <Label htmlFor="json">JSON</Label>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Filter Options</CardTitle>
            <CardDescription>Select which students to include in the export.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="filter-type">Filter By</Label>
                <Select value={filter} onValueChange={setFilter}>
                  <SelectTrigger id="filter-type">
                    <SelectValue placeholder="Select filter" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Students</SelectItem>
                    <SelectItem value="placed">Placed Students Only</SelectItem>
                    <SelectItem value="not-placed">Unplaced Students Only</SelectItem>
                    <SelectItem value="active">Active Students Only</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="branch-filter">Branch</Label>
                <Select defaultValue="all">
                  <SelectTrigger id="branch-filter">
                    <SelectValue placeholder="Select branch" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Branches</SelectItem>
                    <SelectItem value="cse">Computer Science</SelectItem>
                    <SelectItem value="it">Information Technology</SelectItem>
                    <SelectItem value="ece">Electronics & Communication</SelectItem>
                    <SelectItem value="eee">Electrical Engineering</SelectItem>
                    <SelectItem value="mech">Mechanical Engineering</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Select Fields</CardTitle>
          <CardDescription>Choose which fields to include in the export.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Fields to Export</Label>
              <div className="space-x-2">
                <Button variant="outline" size="sm" onClick={() => setSelectedFields(availableFields.map((f) => f.id))}>
                  Select All
                </Button>
                <Button variant="outline" size="sm" onClick={() => setSelectedFields([])}>
                  Clear All
                </Button>
              </div>
            </div>

            <Separator />

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {availableFields.map((field) => (
                <div key={field.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={field.id}
                    checked={selectedFields.includes(field.id)}
                    onCheckedChange={() => handleFieldToggle(field.id)}
                  />
                  <Label htmlFor={field.id}>{field.label}</Label>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end space-x-2">
        {exportSuccess && (
          <Alert className="mr-auto max-w-md">
            <CheckCircle className="h-4 w-4" />
            <AlertTitle>Export Successful</AlertTitle>
            <AlertDescription>Your file has been downloaded successfully.</AlertDescription>
          </Alert>
        )}

        <Button
          variant="outline"
          disabled={isExporting}
          onClick={() => {
            setExportFormat("csv")
            setSelectedFields(["name", "email", "phone", "gender", "branch", "college"])
            setFilter("all")
          }}
        >
          Reset
        </Button>
        <Button onClick={handleExport} disabled={selectedFields.length === 0 || isExporting}>
          {isExporting ? (
            <>Exporting...</>
          ) : (
            <>
              <Download className="mr-2 h-4 w-4" />
              Export Students
            </>
          )}
        </Button>
      </div>
    </div>
  )
}

