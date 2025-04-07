"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, Upload, AlertCircle, CheckCircle, Download } from "lucide-react"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/components/ui/use-toast"

export default function ImportStudentsPage() {
  const [file, setFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadResult, setUploadResult] = useState<{
    success: boolean
    message: string
    imported?: number
    errors?: string[]
  } | null>(null)
  const { toast } = useToast()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0]

      // Check if file is CSV
      if (!selectedFile.name.endsWith(".csv")) {
        toast({
          title: "Invalid file format",
          description: "Please upload a CSV file",
          variant: "destructive",
        })
        return
      }

      setFile(selectedFile)
      setUploadResult(null)
    }
  }

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!file) {
      toast({
        title: "No file selected",
        description: "Please select a CSV file to import",
        variant: "destructive",
      })
      return
    }

    setIsUploading(true)
    setUploadProgress(0)

    // Create a FormData object to send the file
    const formData = new FormData()
    formData.append("file", file)

    try {
      // Start progress updates
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => {
          const newProgress = prev + 5
          return newProgress >= 90 ? 90 : newProgress
        })
      }, 300)

      // Make the actual API call
      const response = await fetch("/api/students/import", {
        method: "POST",
        body: formData,
      })

      clearInterval(progressInterval)
      setUploadProgress(100)

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Failed to import students")
      }

      const result = await response.json()

      setUploadResult({
        success: true,
        message: result.message || "Import completed successfully",
        imported: result.imported || 0,
        errors: result.errors || [],
      })

      toast({
        title: "Import successful",
        description: `Successfully imported ${result.imported || 0} students`,
      })
    } catch (error) {
      console.error("Error uploading file:", error)
      setUploadResult({
        success: false,
        message: error instanceof Error ? error.message : "An error occurred during import",
        errors: ["Failed to process the CSV file. Please check the format and try again."],
      })

      toast({
        title: "Import failed",
        description: error instanceof Error ? error.message : "Failed to import students",
        variant: "destructive",
      })
    } finally {
      setIsUploading(false)
    }
  }

  const handleDownloadTemplate = () => {
    // Create CSV content
    const headers =
      "name,email,phone,gender,branch,college,sscPercentage,hscPercentage,cgpa,placementStatus,company,package\n"
    const sampleRow =
      "John Doe,john@example.com,9876543210,Male,Computer Science,Example University,85.5,78.2,8.7,Active,,\n"
    const csvContent = headers + sampleRow

    // Create a blob and download
    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "student-import-template.csv"
    document.body.appendChild(a)
    a.click()
    window.URL.revokeObjectURL(url)
    document.body.removeChild(a)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Import Students</h1>
        <Button variant="outline" asChild>
          <Link href="/dashboard/students">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Students
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>CSV Import</CardTitle>
          <CardDescription>Upload a CSV file containing student data to import into the system.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleUpload} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="csv-file">CSV File</Label>
              <Input id="csv-file" type="file" accept=".csv" onChange={handleFileChange} disabled={isUploading} />
              <p className="text-sm text-muted-foreground">
                The CSV file should have the following columns: name, email, phone, gender, branch, college, etc.
              </p>
            </div>

            {isUploading && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Uploading...</span>
                  <span className="text-sm text-muted-foreground">{uploadProgress}%</span>
                </div>
                <Progress value={uploadProgress} className="h-2" />
              </div>
            )}

            {uploadResult && (
              <Alert variant={uploadResult.success ? "default" : "destructive"}>
                {uploadResult.success ? <CheckCircle className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
                <AlertTitle>{uploadResult.success ? "Import Successful" : "Import Failed"}</AlertTitle>
                <AlertDescription>
                  <p>{uploadResult.message}</p>
                  {uploadResult.imported !== undefined && (
                    <p className="mt-2">Successfully imported {uploadResult.imported} students.</p>
                  )}
                  {uploadResult.errors && uploadResult.errors.length > 0 && (
                    <div className="mt-2">
                      <p className="font-medium">Errors:</p>
                      <ul className="ml-6 list-disc">
                        {uploadResult.errors.map((error, index) => (
                          <li key={index} className="text-sm">
                            {error}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </AlertDescription>
              </Alert>
            )}

            <div className="flex justify-end space-x-2">
              <Button
                type="button"
                variant="outline"
                disabled={isUploading}
                onClick={() => {
                  setFile(null)
                  setUploadResult(null)
                }}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={!file || isUploading}>
                {isUploading ? (
                  <>Uploading...</>
                ) : (
                  <>
                    <Upload className="mr-2 h-4 w-4" />
                    Upload and Import
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Import Template</CardTitle>
          <CardDescription>Download a template CSV file to use for importing students.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium">Student Import Template</h3>
              <p className="text-sm text-muted-foreground">
                This template contains all required fields for importing student data.
              </p>
            </div>
            <Button onClick={handleDownloadTemplate}>
              <Download className="mr-2 h-4 w-4" />
              Download Template
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

