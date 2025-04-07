"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import type { SWECOffer } from "@/types/swec-offer"
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
import { Search, Filter, Download, Edit, Trash2, Eye, MoreHorizontal, Building2 } from "lucide-react"
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

interface SWECOffersTableProps {
  initialOffers: SWECOffer[]
}

export function SWECOffersTable({ initialOffers }: SWECOffersTableProps) {
  const [offers, setOffers] = useState<SWECOffer[]>(initialOffers)
  const [searchTerm, setSearchTerm] = useState("")
  const [branchFilter, setBranchFilter] = useState("All")
  const [yearFilter, setYearFilter] = useState("All")
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [offerToDelete, setOfferToDelete] = useState<string | null>(null)
  const router = useRouter()

  const filteredOffers = offers.filter((offer) => {
    const matchesSearch =
      offer.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      offer.rollNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      offer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      offer.companyName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      false

    const matchesBranch = branchFilter === "All" || offer.branch === branchFilter
    const matchesYear = yearFilter === "All" || offer.yearOfPassout === yearFilter

    return matchesSearch && matchesBranch && matchesYear
  })

  const handleDeleteOffer = async () => {
    if (!offerToDelete) return

    try {
      const response = await fetch(`/api/swec-offers/${offerToDelete}`, {
        method: "DELETE",
      })

      if (response.ok) {
        setOffers(offers.filter((offer) => offer.id !== offerToDelete))
        router.refresh()
      } else {
        console.error("Failed to delete SWEC offer")
      }
    } catch (error) {
      console.error("Error deleting SWEC offer:", error)
    } finally {
      setIsDeleteDialogOpen(false)
      setOfferToDelete(null)
    }
  }

  // Get unique branches and years for filtering
  const branches = ["All", ...new Set(offers.map((offer) => offer.branch))]
  const years = ["All", ...new Set(offers.map((offer) => offer.yearOfPassout))]

  return (
    <>
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
                Branch
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Filter by Branch</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {branches.map((branch) => (
                <DropdownMenuItem key={branch} onClick={() => setBranchFilter(branch)}>
                  {branch}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                Year
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Filter by Year</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {years.map((year) => (
                <DropdownMenuItem key={year} onClick={() => setYearFilter(year)}>
                  {year}
                </DropdownMenuItem>
              ))}
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
              <TableHead>Name</TableHead>
              <TableHead>Roll Number</TableHead>
              <TableHead>Branch</TableHead>
              <TableHead>Year</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Package</TableHead>
              <TableHead>TPO Name</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOffers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="h-24 text-center">
                  No SWEC offers found.
                </TableCell>
              </TableRow>
            ) : (
              filteredOffers.map((offer) => (
                <TableRow key={offer.id}>
                  <TableCell className="font-medium">{offer.studentName}</TableCell>
                  <TableCell>{offer.rollNumber}</TableCell>
                  <TableCell>{offer.branch}</TableCell>
                  <TableCell>{offer.yearOfPassout}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Building2 className="mr-2 h-4 w-4 text-muted-foreground" />
                      {offer.companyName}
                    </div>
                  </TableCell>
                  <TableCell>{offer.package}</TableCell>
                  <TableCell>{offer.tpoName}</TableCell>
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
                          <Link href={`/dashboard/swec-offers/${offer.id}`}>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={`/dashboard/swec-offers/${offer.id}/edit`}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-destructive"
                          onClick={() => {
                            setOfferToDelete(offer.id)
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
              This action cannot be undone. This will permanently delete the SWEC offer and all associated data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteOffer} className="bg-destructive text-destructive-foreground">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

