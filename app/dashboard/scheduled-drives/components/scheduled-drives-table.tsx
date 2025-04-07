"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import type { ScheduledDrive } from "@/types/scheduled-drive"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, Download, Edit, Trash2, Eye, MoreHorizontal, Calendar, MapPin } from "lucide-react"
import Link from "next/link"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface ScheduledDrivesTableProps {
  initialDrives: ScheduledDrive[]
}

export function ScheduledDrivesTable({ initialDrives }: ScheduledDrivesTableProps) {
  const [drives, setDrives] = useState<ScheduledDrive[]>(initialDrives)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("All")
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [driveToDelete, setDriveToDelete] = useState<string | null>(null)
  const router = useRouter()

  const filteredDrives = drives.filter((drive) => {
    const matchesSearch =
      drive.companyName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      false ||
      drive.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      drive.selectionProcedure.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "All" || drive.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const handleDeleteDrive = async () => {
    if (!driveToDelete) return

    try {
      const response = await fetch(`/api/scheduled-drives/${driveToDelete}`, {
        method: "DELETE",
      })

      if (response.ok) {
        setDrives(drives.filter((drive) => drive.id !== driveToDelete))
        router.refresh()
      } else {
        console.error("Failed to delete scheduled drive")
      }
    } catch (error) {
      console.error("Error deleting scheduled drive:", error)
    } finally {
      setIsDeleteDialogOpen(false)
      setDriveToDelete(null)
    }
  }

  const statusColors: Record<string, string> = {
    Upcoming: "bg-blue-500",
    "In Progress": "bg-yellow-500",
    Completed: "bg-green-500",
    Cancelled: "bg-red-500",
  }

  return (
    <>
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

      <div className="mt-6 rounded-md border overflow-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Company</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Rounds</TableHead>
              <TableHead>Eligibility</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredDrives.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  No scheduled drives found.
                </TableCell>
              </TableRow>
            ) : (
              filteredDrives.map((drive) => (
                <TableRow key={drive.id}>
                  <TableCell className="font-medium">{drive.companyName}</TableCell>
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
                  <TableCell>{drive.rounds}</TableCell>
                  <TableCell>
                    <div className="text-xs">
                      <div>CGPA: {drive.eligibilityCriteria.minCGPA}+</div>
                      <div>Percentage: {drive.eligibilityCriteria.minPercentage}%+</div>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {drive.eligibilityCriteria.branches.map((branch, i) => (
                          <Badge key={i} variant="outline" className="text-xs">
                            {branch}
                          </Badge>
                        ))}
                      </div>
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
                        <DropdownMenuItem asChild>
                          <Link href={`/dashboard/scheduled-drives/${drive.id}`}>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={`/dashboard/scheduled-drives/${drive.id}/edit`}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-destructive"
                          onClick={() => {
                            setDriveToDelete(drive.id)
                            setIsDeleteDialogOpen(true)
                          }}
                        >
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

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the scheduled drive and all associated data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteDrive} className="bg-destructive text-destructive-foreground">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

