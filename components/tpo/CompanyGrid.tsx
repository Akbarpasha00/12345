"use client"

import { useState } from "react"
import Link from "next/link"
import { Building2, Edit, Plus, Trash } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
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

type Company = {
  _id: string
  name: string
  industry: string
  location: string
  website: string
  contactEmail: string
  contactPhone: string
  description: string
  logo?: string
  status: "active" | "inactive"
}

interface CompanyGridProps {
  companies: Company[]
  onDelete?: (id: string) => void
}

export function CompanyGrid({ companies, onDelete }: CompanyGridProps) {
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [companyToDelete, setCompanyToDelete] = useState<string | null>(null)

  const handleDelete = (id: string) => {
    setCompanyToDelete(id)
    setIsDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    if (companyToDelete && onDelete) {
      onDelete(companyToDelete)
    }
    setIsDeleteDialogOpen(false)
    setCompanyToDelete(null)
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Companies</h2>
        <Button asChild>
          <Link href="/dashboard/companies/new">
            <Plus className="mr-2 h-4 w-4" /> Add Company
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {companies.map((company) => (
          <Card key={company._id} className="overflow-hidden">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl">{company.name}</CardTitle>
                  <CardDescription>{company.industry}</CardDescription>
                </div>
                <Badge variant={company.status === "active" ? "default" : "secondary"}>{company.status}</Badge>
              </div>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="flex items-center mb-2">
                <Building2 className="h-4 w-4 mr-2 opacity-70" />
                <span className="text-sm">{company.location}</span>
              </div>
              <p className="text-sm line-clamp-2">{company.description}</p>
            </CardContent>
            <CardFooter className="flex justify-between pt-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="sm" onClick={() => setSelectedCompany(company)}>
                    View Details
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  {selectedCompany && (
                    <>
                      <DialogHeader>
                        <DialogTitle>{selectedCompany.name}</DialogTitle>
                        <DialogDescription>{selectedCompany.industry}</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div>
                          <h4 className="text-sm font-medium">Location</h4>
                          <p className="text-sm">{selectedCompany.location}</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium">Website</h4>
                          <p className="text-sm">{selectedCompany.website}</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium">Contact</h4>
                          <p className="text-sm">{selectedCompany.contactEmail}</p>
                          <p className="text-sm">{selectedCompany.contactPhone}</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium">Description</h4>
                          <p className="text-sm">{selectedCompany.description}</p>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" asChild>
                          <Link href={`/dashboard/companies/${selectedCompany._id}/edit`}>
                            <Edit className="mr-2 h-4 w-4" /> Edit
                          </Link>
                        </Button>
                      </DialogFooter>
                    </>
                  )}
                </DialogContent>
              </Dialog>
              <div className="flex space-x-2">
                <Button variant="outline" size="icon" asChild>
                  <Link href={`/dashboard/companies/${company._id}/edit`}>
                    <Edit className="h-4 w-4" />
                  </Link>
                </Button>
                <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline" size="icon" onClick={() => handleDelete(company._id)}>
                      <Trash className="h-4 w-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete the company and all associated data.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={confirmDelete}>Delete</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

