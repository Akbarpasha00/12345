"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import type { StudentFormData } from "@/types/student"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"

interface StudentFormProps {
  initialData?: any
  studentId?: string
}

export function StudentForm({ initialData, studentId }: StudentFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState<StudentFormData>(
    initialData || {
      name: "",
      email: "",
      phone: "",
      gender: "",
      sscPercentage: 0,
      hscPercentage: 0,
      cgpa: 0,
      branch: "",
      college: "",
      placementStatus: "",
      company: "",
      package: "",
      reference: "",
    },
  )

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const url = studentId ? `/api/students/${studentId}` : "/api/students"
      const method = studentId ? "PATCH" : "POST"

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error("Failed to save student")
      }

      toast({
        title: studentId ? "Student updated" : "Student created",
        description: studentId
          ? "The student has been updated successfully."
          : "The student has been added to the system.",
      })

      router.push("/dashboard/students")
      router.refresh()
    } catch (error) {
      console.error("Error saving student:", error)
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input id="name" name="name" value={formData.name} onChange={handleChange} placeholder="John Doe" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="john@example.com"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+91 9876543210"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="gender">Gender</Label>
          <Select value={formData.gender} onValueChange={(value) => handleSelectChange("gender", value)}>
            <SelectTrigger id="gender">
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Male">Male</SelectItem>
              <SelectItem value="Female">Female</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="space-y-2">
          <Label htmlFor="sscPercentage">SSC Percentage</Label>
          <Input
            id="sscPercentage"
            name="sscPercentage"
            type="number"
            step="0.01"
            value={formData.sscPercentage}
            onChange={handleChange}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="hscPercentage">HSC Percentage</Label>
          <Input
            id="hscPercentage"
            name="hscPercentage"
            type="number"
            step="0.01"
            value={formData.hscPercentage}
            onChange={handleChange}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="cgpa">CGPA</Label>
          <Input
            id="cgpa"
            name="cgpa"
            type="number"
            step="0.01"
            value={formData.cgpa}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="branch">Branch</Label>
          <Input
            id="branch"
            name="branch"
            value={formData.branch}
            onChange={handleChange}
            placeholder="Computer Science"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="college">College Name</Label>
          <Input
            id="college"
            name="college"
            value={formData.college}
            onChange={handleChange}
            placeholder="University of Example"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="space-y-2">
          <Label htmlFor="placementStatus">Placement Status</Label>
          <Select
            value={formData.placementStatus || ""}
            onValueChange={(value) => handleSelectChange("placementStatus", value)}
          >
            <SelectTrigger id="placementStatus">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Active">Active</SelectItem>
              <SelectItem value="Placed">Placed</SelectItem>
              <SelectItem value="Interviewing">Interviewing</SelectItem>
              <SelectItem value="Inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="company">Company Name</Label>
          <Input
            id="company"
            name="company"
            value={formData.company || ""}
            onChange={handleChange}
            placeholder="Acme Inc."
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="package">Package (LPA)</Label>
          <Input
            id="package"
            name="package"
            value={formData.package || ""}
            onChange={handleChange}
            placeholder="12.5"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="reference">Reference</Label>
        <Input
          id="reference"
          name="reference"
          value={formData.reference || ""}
          onChange={handleChange}
          placeholder="How did you hear about this student?"
        />
      </div>

      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={() => router.push("/dashboard/students")} disabled={isLoading}>
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Saving..." : studentId ? "Update Student" : "Add Student"}
        </Button>
      </div>
    </form>
  )
}

