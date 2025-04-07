import SWECOfferForm from "../components/swec-offer-form"

export default function NewSWECOfferPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Add SWEC Offer</h1>
        <p className="text-muted-foreground">Create a new SWEC offer record in the system.</p>
      </div>
      <SWECOfferForm />
    </div>
  )
}

