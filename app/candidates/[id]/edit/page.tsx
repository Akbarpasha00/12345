import { getCandidateById } from "@/lib/db"
import { notFound } from "next/navigation"
import CandidateForm from "../../components/candidate-form"

export const metadata = {
  title: "Edit Candidate",
  description: "Edit candidate details",
}

export default async function EditCandidatePage({ params }) {
  const candidate = await getCandidateById(params.id)

  if (!candidate) {
    notFound()
  }

  return (
    <div className="container mx-auto py-10">
      <CandidateForm initialData={candidate} />
    </div>
  )
}

