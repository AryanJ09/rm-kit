// Pattern example, not a component: the Leads screen of the mobile application shell, from the prototype (Leads).
// Assembled only from kit components: ApplicationShell (page header with a text action), Search, Button (filter with
// count), ItemList + ItemCard (rows with a stage tag and a progress bar), Alert and Button.
import * as React from "react"
import { ListFilterIcon } from "lucide-react"

import { Alert, AlertDescription, AlertTitle } from "@/rm-style/ui/alert"
import { ApplicationShell } from "@/rm-style/ui/application-shell"
import type { Destination } from "@/rm-style/ui/application-shell/bottom-navigation"
import { Button } from "@/rm-style/ui/button"
import { ItemCard, ItemList, SummaryCard } from "@/rm-style/ui/cards"
import { Search } from "@/rm-style/ui/search"
import { footerNoteText, shellWorkspaces } from "./mobile-home"

export type LeadsState = "default" | "empty" | "loading" | "error"

type Stage = "New" | "Qualifying" | "Offer" | "Won" | "Dropped"
const stageTag: Record<Stage, { variant: "moderate" | "growth" | "success" | "neutral"; progress: number }> = {
  New: { variant: "moderate", progress: 15 },
  Qualifying: { variant: "moderate", progress: 45 },
  Offer: { variant: "growth", progress: 70 },
  Won: { variant: "success", progress: 100 },
  Dropped: { variant: "neutral", progress: 0 },
}

// The prototype's lead rows: the customer, the relationship manager's line (who, segment, amount, id), the product, the stage.
const leads: { customer: string; who: string; segment: string; amount: string; id: string; product: string; stage: Stage }[] = [
  { customer: "Trivedi Enterprises", who: "Amit Sharma", segment: "Business", amount: "₹18.3 L", id: "CV-10764", product: "Deposit", stage: "New" },
  { customer: "Sharma Industries", who: "Amit Sharma", segment: "Business", amount: "₹18.3 L", id: "CV-10765", product: "Deposit", stage: "Qualifying" },
  { customer: "Rajesh Mehra", who: "Rajesh Mehra", segment: "Individual", amount: "₹6.54 L", id: "CV-10766", product: "Deposit", stage: "Won" },
  { customer: "Key Industries", who: "Sunita Mishra", segment: "Individual", amount: "₹4.3 L", id: "CV-10767", product: "Unsecured lending", stage: "Qualifying" },
  { customer: "Bhavani Textiles", who: "Kiran Rao", segment: "Business", amount: "₹24.5 L", id: "CV-10768", product: "Secured lending", stage: "New" },
  { customer: "Om Corporate Services", who: "Ravi Malhotra", segment: "Corporate", amount: "₹52 L", id: "CV-10770", product: "Secured lending", stage: "Offer" },
  { customer: "Nikhil Agarwal", who: "Nikhil Agarwal", segment: "Individual", amount: "₹3.2 L", id: "CV-10769", product: "Unsecured lending", stage: "Dropped" },
]

export type MobileLeadsProps = {
  state?: LeadsState
  footerNote?: boolean
  active?: Destination
  onNavigate?: (destination: Destination) => void
  onAddLead?: () => void
}

/** Leads inside the framed mobile shell. */
export function MobileLeads({ state = "default", footerNote = true, active = "Leads", onNavigate, onAddLead }: MobileLeadsProps) {
  const [query, setQuery] = React.useState("")
  const q = query.trim().toLowerCase()
  const list = leads.filter((l) => !q || l.customer.toLowerCase().includes(q) || l.who.toLowerCase().includes(q))
  const loading = state === "loading"
  const error = state === "error"
  return (
    <ApplicationShell
      variant="mobile"
      title="Leads"
      initials="LP"
      workspaces={shellWorkspaces}
      navigation={{ active, onActiveChange: onNavigate }}
      pageHeader={{ context: "page", title: "Leads", time: "12:30", action: { label: "Add lead", onClick: onAddLead } }}
      footerNote={footerNote ? footerNoteText : undefined}
    >
      <div className="flex min-h-(--size-share-full) flex-col gap-(--spacing-inline-lg) bg-surface-hover p-(--spacing-inline-lg)">
        <div className="flex items-start gap-(--spacing-inline-md)">
          <div className="min-w-0 flex-1">
            <Search
              placeholder="Search leads"
              value={query}
              onValueChange={setQuery}
              loading={loading}
              state={error ? "error" : "default"}
              helper={error ? "Leads unavailable. Try again." : undefined}
            />
          </div>
          <Button size="icon-md" aria-label="Filter leads">
            <ListFilterIcon />
          </Button>
        </div>
        {error ? (
          <Alert variant="error">
            <AlertTitle>Unable to load leads</AlertTitle>
            <AlertDescription>Check your connection and try again.</AlertDescription>
          </Alert>
        ) : state === "empty" || list.length === 0 ? (
          <SummaryCard
            title="No leads yet."
            description="Add a lead when a customer shows interest, or create one from a cue disposition."
            action={{ label: "Add lead", onClick: onAddLead ?? (() => {}) }}
          />
        ) : (
          <ItemList>
            {list.map((l) => (
              <ItemCard
                key={l.id}
                inList
                title={l.customer}
                meta={`${l.who} • ${l.segment} • ${l.amount} • ${l.id}`}
                description={l.product}
                tags={[{ label: l.stage, variant: stageTag[l.stage].variant }]}
                progress={loading ? undefined : stageTag[l.stage].progress}
                state={loading ? "loading" : "default"}
                onClick={() => {}}
              />
            ))}
          </ItemList>
        )}
      </div>
    </ApplicationShell>
  )
}
