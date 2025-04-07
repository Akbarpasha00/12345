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
import { Search, Plus, MoreHorizontal, Filter, Download, Edit, Trash2, Eye, Calendar } from "lucide-react"

// Mock data for job offers
const mockOffers = [
  {
    id: "1",
    title: "Senior Frontend Developer",
    company: "Tech Innovations Inc.",
    location: "San Francisco, CA (Remote)",
    salary: "$120,000 - $150,000",
    positions: 3,
    deadline: "2025-04-15",
    status: "Open",
    skills: ["React", "TypeScript", "Redux"],
  },
  {
    id: "2",
    title: "Data Scientist",
    company: "Global Systems Ltd.",
    location: "New York, NY (Hybrid)",
    salary: "$110,000 - $140,000",
    positions: 2,
    deadline: "2025-04-10",
    status: "Open",
    skills: ["Python", "Machine Learning", "SQL"],
  },
  {
    id: "3",
    title: "DevOps Engineer",
    company: "Cloud Services Inc.",
    location: "Seattle, WA (On-site)",
    salary: "$130,000 - $160,000",
    positions: 1,
    deadline: "2025-03-30",
    status: "Filled",
    skills: ["AWS", "Docker", "Kubernetes"],
  },
  {
    id: "4",
    title: "UX/UI Designer",
    company: "Innovate Technologies",
    location: "Austin, TX (Remote)",
    salary: "$90,000 - $120,000",
    positions: 2,
    deadline: "2025-04-20",
    status: "Open",
    skills: ["Figma", "Adobe XD", "User Research"],
  },
  {
    id: "5",
    title: "Backend Developer",
    company: "Data Solutions Corp.",
    location: "Boston, MA (Hybrid)",
    salary: "$115,000 - $145,000",
    positions: 2,
    deadline: "2025-04-05",
    status: "Open",
    skills: ["Node.js", "Express", "MongoDB"],
  },
]

const statusColors: Record<string, string> = {
  Open: "bg-green-500",
  Filled: "bg-blue-500",
  Closed: "bg-gray-500",
}

export default function OffersPage() {
  const [offers, setOffers] = useState(mockOffers)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("All")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  // Filter offers based on search term and status
  const filteredOffers = offers.filter((offer) => {
    const matchesSearch =
      offer.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      offer.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      offer.location.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "All" || offer.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const handleAddOffer = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would add the offer to the database
    setIsAddDialogOpen(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Job Offers</h1>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Offer
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Add New Job Offer</DialogTitle>
              <DialogDescription>Enter the job offer details below to add it to the system.</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleAddOffer}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Job Title</Label>
                    <Input id="title" placeholder="Senior Frontend Developer" required />
                  </div>
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
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input id="location" placeholder="San Francisco, CA (Remote)" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="salary">Salary Range</Label>
                    <Input id="salary" placeholder="$120,000 - $150,000" required />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="positions">Number of Positions</Label>
                    <Input id="positions" type="number" placeholder="3" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="deadline">Application Deadline</Label>
                    <Input id="deadline" type="date" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="skills">Required Skills (comma separated)</Label>
                  <Input id="skills" placeholder="React, TypeScript, Redux" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Job Description</Label>
                  <Textarea id="description" placeholder="Detailed job description..." />
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Add Offer</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Job Offer Management</CardTitle>
          <CardDescription>View and manage all job offers in the system</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative w-full sm:max-w-xs">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search offers..."
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
                  <DropdownMenuItem onClick={() => setStatusFilter("Open")}>Open</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter("Filled")}>Filled</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter("Closed")}>Closed</DropdownMenuItem>
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
                  <TableHead>Job Title</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Salary</TableHead>
                  <TableHead>Deadline</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOffers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center">
                      No job offers found.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredOffers.map((offer) => (
                    <TableRow key={offer.id}>
                      <TableCell className="font-medium">{offer.title}</TableCell>
                      <TableCell>{offer.company}</TableCell>
                      <TableCell>{offer.location}</TableCell>
                      <TableCell>{offer.salary}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                          {new Date(offer.deadline).toLocaleDateString()}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={`${statusColors[offer.status]} text-white`}>{offer.status}</Badge>
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

