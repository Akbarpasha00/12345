"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DatePicker } from "@/components/ui/date-picker"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "sonner"

const formSchema = z.object({
  studentName: z.string().min(2, { message: "Student name is required" }),
  studentId: z.string().min(1, { message: "Student ID is required" }),
  branch: z.string().min(1, { message: "Branch is required" }),
  companyName: z.string().min(2, { message: "Company name is required" }),
  role: z.string().min(1, { message: "Role is required" }),
  offerDate: z.date({ required_error: "Offer date is required" }),
  ctc: z.string().min(1, { message: "CTC is required" }),
  location: z.string().min(1, { message: "Location is required" }),
  isInternship: z.boolean().default(false),
  notes: z.string().optional(),
})

export function SWECOfferForm({ offer = null }) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const branches = [
    { id: "CSE", label: "Computer Science Engineering" },
    { id: "IT", label: "Information Technology" },
    { id: "ECE", label: "Electronics & Communication Engineering" },
    { id: "EEE", label: "Electrical & Electronics Engineering" },
    { id: "MECH", label: "Mechanical Engineering" },
    { id: "CIVIL", label: "Civil Engineering" },
  ]

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      studentName: offer?.studentName || "",
      studentId: offer?.studentId || "",
      branch: offer?.branch || "",
      companyName: offer?.companyName || "",
      offerDate: offer?.offerDate ? new Date(offer.offerDate) : new Date(),
      ctc: offer?.ctc || "",
      role: offer?.role || "",
      location: offer?.location || "",
      isInternship: offer?.isInternship || false,
      notes: offer?.notes || "",
    },
  })

  async function onSubmit(values) {
    setIsLoading(true)
    try {
      const url = offer ? `/api/swec-offers/${offer.id}` : "/api/swec-offers"
      const method = offer ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })

      if (!response.ok) {
        throw new Error("Failed to save offer")
      }

      toast.success(offer ? "Offer updated successfully" : "Offer created successfully")
      router.push("/dashboard/swec-offers")
      router.refresh()
    } catch (error) {
      toast.error("Something went wrong. Please try again.")
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{offer ? "Edit SWEC Offer" : "Create SWEC Offer"}</CardTitle>
        <CardDescription>
          {offer ? "Update the details of the existing SWEC offer." : "Enter the details of the new SWEC offer."}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="studentName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Student Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="studentId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Student ID</FormLabel>
                    <FormControl>
                      <Input placeholder="2023001" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="branch"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Branch</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select branch" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {branches.map((branch) => (
                          <SelectItem key={branch.id} value={branch.id}>
                            {branch.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="companyName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Google" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="offerDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Offer Date</FormLabel>
                    <DatePicker date={field.value} setDate={field.onChange} />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="ctc"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CTC</FormLabel>
                    <FormControl>
                      <Input placeholder="12 LPA" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <FormControl>
                      <Input placeholder="Software Engineer" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input placeholder="Bangalore" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="isInternship"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-4">
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Is this an internship offer?</FormLabel>
                      <FormDescription>Check this if the offer is for an internship position.</FormDescription>
                    </div>
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notes</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Any additional notes about the offer" className="min-h-[100px]" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Saving..." : offer ? "Update Offer" : "Create Offer"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

export default SWECOfferForm

