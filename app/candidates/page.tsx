import { CandidateTable } from "./components/candidate-table"
import { db } from "@/lib/db"

export const dynamic = "force-dynamic"

export default async function CandidatesPage() {
  const candidates = await db.candidates.findMany({})

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Candidates</h1>
        <p className="text-muted-foreground">Manage candidate profiles and placement status.</p>
      </div>
      <CandidateTable candidates={candidates} />
    </div>
  )
}

