"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import type { ScheduledDriveFormData } from "@/types/scheduled-drive"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "@/components/ui/use-toast"

interface ScheduledDriveFormProps {
  initialData?: any
  driveId?: string
  companies: any[]
}

export function ScheduledDriveForm({ initialData, driveId, companies }: ScheduledDriveFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState<ScheduledDriveFormData>(
    initialData || {
      companyId: "",
      date: new Date(),
      location: "",
      rounds: 3,
      selectionProcedure: "",
      eligibilityCriteria: {
        minCGPA: 7.0,
        minPercentage: 70,
        branches: ["CSE", "IT", "ECE"],
      },
      description: "",
      status: "Upcoming",
    },
  )

  const [selectedBranches, setSelectedBranches] = useState<string[]>(
    initialData?.eligibilityCriteria?.branches || ["CSE", "IT", "ECE"],
  )

  const branches = [
    { id: "CSE", label: "Computer Science Engineering" },
    { id: "IT", label: "Information Technology" },
    { id: "ECE", label: "Electronics & Communication" },
    { id: "EEE", label: "Electrical Engineering" },
    { id: "MECH", label: "Mechanical Engineering" },
    { id: "CIVIL", label: "Civil Engineering" },
  ]

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: Number(value) }))
  }

  const handleEligibilityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      eligibilityCriteria: {
        ...prev.eligibilityCriteria,
        [name]: Number(value),
      },
    }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleBranchToggle = (branch: string) => {
    setSelectedBranches((prev) => (prev.includes(branch) ? prev.filter((b) => b !== branch) : [...prev, branch]))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Update branches in form data
    const updatedFormData = {
      ...formData,
      eligibilityCriteria: {
        ...formData.eligibilityCriteria,
        branches: selectedBranches,
      },
    }

    try {
      const url = driveId ? `/api/scheduled-drives/${driveId}` : "/api/scheduled-drives"
      const method = driveId ? "PATCH" : "POST"

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedFormData),
      })

      if (!response.ok) {
        throw new Error("Failed to save scheduled drive")
      }

      toast({
        title: driveId ? "Scheduled drive updated" : "Scheduled drive created",
        description: driveId
          ? "The scheduled drive has been updated successfully."
          : "The scheduled drive has been added to the system.",
      })

      router.push("/dashboard/scheduled-drives")
      router.refresh()
    } catch (error) {
      console.error("Error saving scheduled drive:", error)
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
          <Label htmlFor="companyId">Company</Label>
          <Select value={formData.companyId} onValueChange={(value) => handleSelectChange("companyId", value)} required>
            <SelectTrigger id="companyId">
              <SelectValue placeholder="Select company" />
            </SelectTrigger>
            <SelectContent>
              {companies.map((company) => (
                <SelectItem key={company._id.toString()} value={company._id.toString()}>
                  {company.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="date">Drive Date</Label>
          <Input
            id="date"
            name="date"
            type="date"
            value={formData.date instanceof Date ? formData.date.toISOString().split("T")[0] : formData.date}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Virtual or On-site location"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="rounds">Number of Rounds</Label>
          <Input
            id="rounds"
            name="rounds"
            type="number"
            min="1"
            value={formData.rounds}
            onChange={handleNumberChange}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="selectionProcedure">Selection Procedure</Label>
        <Textarea
          id="selectionProcedure"
          name="selectionProcedure"
          value={formData.selectionProcedure}
          onChange={handleChange}
          placeholder="Describe the selection process (e.g., Aptitude Test, Technical Interview, HR Round)"
          required
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Eligibility Criteria</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="minCGPA">Minimum CGPA</Label>
            <Input
              id="minCGPA"
              name="minCGPA"
              type="number"
              step="0.1"
              min="0"
              max="10"
              value={formData.eligibilityCriteria.minCGPA}
              onChange={handleEligibilityChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="minPercentage">Minimum Percentage</Label>
            <Input
              id="minPercentage"
              name="minPercentage"
              type="number"
              step="0.1"
              min="0"
              max="100"
              value={formData.eligibilityCriteria.minPercentage}
              onChange={handleEligibilityChange}
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Eligible Branches</Label>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {branches.map((branch) => (
              <div key={branch.id} className="flex items-center space-x-2">
                <Checkbox
                  id={`branch-${branch.id}`}
                  checked={selectedBranches.includes(branch.id)}
                  onCheckedChange={() => handleBranchToggle(branch.id)}
                />
                <Label htmlFor={`branch-${branch.id}`}>{branch.label}</Label>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Additional Information</Label>
        <Textarea
          id="description"
          name="description"
          value={formData.description || ""}
          onChange={handleChange}
          placeholder="Any additional information about the drive"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="status">Status</Label>
        <Select value={formData.status} onValueChange={(value) => handleSelectChange("status", value)}>
          <SelectTrigger id="status">
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Upcoming">Upcoming</SelectItem>
            <SelectItem value="In Progress">In Progress</SelectItem>
            <SelectItem value="Completed">Completed</SelectItem>
            <SelectItem value="Cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex justify-end space-x-2">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/dashboard/scheduled-drives")}
          disabled={isLoading}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Saving..." : driveId ? "Update Drive" : "Add Drive"}
        </Button>
      </div>
    </form>
  )
}

