"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  Search,
  Plus,
  MoreHorizontal,
  Filter,
  Download,
  Edit,
  Trash2,
  Eye,
  Calendar,
  Building2,
  Users,
  MapPin,
} from "lucide-react"

// Mock data for placement drives
const mockDrives = [
  {
    id: "1",
    company: "Tech Innovations Inc.",
    date: "2025-03-25",
    location: "Virtual",
    positions: ["Frontend Developer", "Backend Developer"],
    eligibility: "CGPA >= 7.5",
    registeredCandidates: 45,
    status: "Upcoming",
  },
  {
    id: "2",
    company: "Global Systems Ltd.",
    date: "2025-04-05",
    location: "On-site (New York, NY)",
    positions: ["Data Scientist", "ML Engineer"],
    eligibility: "CGPA >= 8.0",
    registeredCandidates: 32,
    status: "Upcoming",
  },
  {
    id: "3",
    company: "Data Solutions Corp.",
    date: "2025-03-15",
    location: "Hybrid (Boston, MA)",
    positions: ["Database Administrator", "Backend Developer"],
    eligibility: "CGPA >= 7.0",
    registeredCandidates: 28,
    status: "Completed",
  },
  {
    id: "4",
    company: "Cloud Services Inc.",
    date: "2025-04-12",
    location: "On-site (Seattle, WA)",
    positions: ["DevOps Engineer", "Cloud Architect"],
    eligibility: "CGPA >= 7.5",
    registeredCandidates: 20,
    status: "Upcoming",
  },
  {
    id: "5",
    company: "Innovate Technologies",
    date: "2025-03-10",
    location: "Virtual",
    positions: ["UX/UI Designer", "Product Manager"],
    eligibility: "CGPA >= 7.0",
    registeredCandidates: 38,
    status: "Completed",
  },
]

const statusColors: Record<string, string> = {
  Upcoming: "bg-blue-500",
  "In Progress": "bg-yellow-500",
  Completed: "bg-green-500",
  Cancelled: "bg-red-500",
}

export default function DrivesPage() {
  const [drives, setDrives] = useState(mockDrives)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("All")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  // Filter drives based on search term and status
  const filteredDrives = drives.filter((drive) => {
    const matchesSearch =
      drive.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      drive.location.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "All" || drive.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const handleAddDrive = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would add the drive to the database
    setIsAddDialogOpen(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Placement Drives</h1>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Drive
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Add New Placement Drive</DialogTitle>
              <DialogDescription>Enter the placement drive details below to add it to the system.</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleAddDrive}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="company">Company</Label>
                    <Select>
                      <SelectTrigger id="company">
                        <SelectValue placeholder="Select company" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="tech-innovations">Tech Innovations Inc.</SelectItem>
                        <SelectItem value="global-systems">Global Systems Ltd.</SelectItem>
                        <SelectItem value="data-solutions">Data Solutions Corp.</SelectItem>
                        <SelectItem value="cloud-services">Cloud Services Inc.</SelectItem>
                        <SelectItem value="innovate-tech">Innovate Technologies</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="date">Drive Date</Label>
                    <Input id="date" type="date" required />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input id="location" placeholder="Virtual or On-site location" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="eligibility">Eligibility Criteria</Label>
                    <Input id="eligibility" placeholder="CGPA >= 7.5" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="positions">Positions (comma separated)</Label>
                  <Input id="positions" placeholder="Frontend Developer, Backend Developer" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Drive Description</Label>
                  <Textarea id="description" placeholder="Detailed information about the drive..." />
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Add Drive</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Placement Drive Management</CardTitle>
          <CardDescription>View and manage all placement drives in the system</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative w-full sm:max-w-xs">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search drives..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Filter className="mr-2 h-4 w-4" />
                    Filter
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setStatusFilter("All")}>All</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter("Upcoming")}>Upcoming</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter("In Progress")}>In Progress</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter("Completed")}>Completed</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter("Cancelled")}>Cancelled</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </div>
          </div>

          <div className="mt-6 rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Company</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Positions</TableHead>
                  <TableHead>Registered</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDrives.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center">
                      No placement drives found.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredDrives.map((drive) => (
                    <TableRow key={drive.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center">
                          <Building2 className="mr-2 h-4 w-4 text-muted-foreground" />
                          {drive.company}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                          {new Date(drive.date).toLocaleDateString()}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                          {drive.location}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {drive.positions.map((position) => (
                            <Badge key={position} variant="outline" className="text-xs">
                              {position}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Users className="mr-2 h-4 w-4 text-muted-foreground" />
                          {drive.registeredCandidates}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={`${statusColors[drive.status]} text-white`}>{drive.status}</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Open menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

