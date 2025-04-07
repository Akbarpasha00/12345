"use client"

import { useState } from "react"
import Link from "next/link"
import { Edit, Plus, Trash } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

type Offer = {
  _id: string
  student: {
    _id: string
    name: string
    rollNo: string
  }
  company: {
    _id: string
    name: string
  }
  jobTitle: string
  salary: string
  offerDate: string
  joiningDate: string
  status: "accepted" | "declined" | "pending"
}

interface OfferTableProps {
  offers: Offer[]
  onDelete?: (id: string) => void
}

export function OfferTable({ offers, onDelete }: OfferTableProps) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [offerToDelete, setOfferToDelete] = useState<string | null>(null)

  const handleDelete = (id: string) => {
    setOfferToDelete(id)
    setIsDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    if (offerToDelete && onDelete) {
      onDelete(offerToDelete)
    }
    setIsDeleteDialogOpen(false)
    setOfferToDelete(null)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Offers</h2>
        <Button asChild>
          <Link href="/dashboard/offers/new">
            <Plus className="mr-2 h-4 w-4" /> Add Offer
          </Link>
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Student</TableHead>
              <TableHead>Roll No</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Job Title</TableHead>
              <TableHead>Salary</TableHead>
              <TableHead>Offer Date</TableHead>
              <TableHead>Joining Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {offers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} className="text-center py-4">
                  No offers found. Create your first offer.
                </TableCell>
              </TableRow>
            ) : (
              offers.map((offer) => (
                <TableRow key={offer._id}>
                  <TableCell className="font-medium">{offer.student.name}</TableCell>
                  <TableCell>{offer.student.rollNo}</TableCell>
                  <TableCell>{offer.company.name}</TableCell>
                  <TableCell>{offer.jobTitle}</TableCell>
                  <TableCell>{offer.salary}</TableCell>
                  <TableCell>{formatDate(offer.offerDate)}</TableCell>
                  <TableCell>{formatDate(offer.joiningDate)}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        offer.status === "accepted"
                          ? "bg-green-100 text-green-800"
                          : offer.status === "declined"
                            ? "bg-red-100 text-red-800"
                            : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {offer.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" size="icon" asChild>
                        <Link href={`/dashboard/offers/${offer._id}/edit`}>
                          <Edit className="h-4 w-4" />
                        </Link>
                      </Button>
                      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                        <AlertDialogTrigger asChild>
                          <Button variant="outline" size="icon" onClick={() => handleDelete(offer._id)}>
                            <Trash className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will permanently delete this offer.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={confirmDelete}>Delete</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

