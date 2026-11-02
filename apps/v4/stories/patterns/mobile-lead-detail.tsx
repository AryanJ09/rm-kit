// Pattern example, not a component: the Lead detail screen of the mobile shell, from the prototype. The lead, its progress as
// steps, the outcome buttons (Mark won, Drop lead), the AI actions, the detail sections and the remarks.
// Assembled only from kit components: ApplicationShell (inside header), SummaryCard, Steps, Button (success), AiSuggestion,
// Accordion (card) with CardKeyValue, ItemCard.
import * as React from "react"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/rm-style/ui/accordion"
import { AiSuggestion } from "@/rm-style/ui/ai-suggestion"
import { ApplicationShell } from "@/rm-style/ui/application-shell"
import type { Destination } from "@/rm-style/ui/application-shell/bottom-navigation"
import { Button } from "@/rm-style/ui/button"
import { CardKeyValue, ItemCard, SummaryCard } from "@/rm-style/ui/cards"
import { Steps, type StepItem } from "@/rm-style/ui/steps"
import { footerNoteText, shellWorkspaces } from "./mobile-home"

const sections = [
  { id: "company", title: "Company details", rows: [["Company", "Trivedi Enterprises"], ["Segment", "Business"], ["Vintage", "9 years"]] },
  { id: "loan", title: "Loan details", rows: [["Product", "Secured lending"], ["Amount", "₹18.3 L"], ["Tenure", "60 months"]] },
  { id: "personal", title: "Personal info", rows: [["Contact person", "Amit Trivedi"], ["PAN", "ABCPT1234F"]] },
  { id: "contact", title: "Contact info", rows: [["Mobile", "+91 98200 00000"], ["Email", "amit@trivedi.example"]] },
]

export type MobileLeadDetailProps = {
  footerNote?: boolean
  active?: Destination
  onNavigate?: (destination: Destination) => void
}

/** Lead detail inside the framed mobile shell. Tapping the active step completes it and unlocks the next. */
export function MobileLeadDetail({ footerNote = true, active = "Leads", onNavigate }: MobileLeadDetailProps) {
  const [done, setDone] = React.useState(1)
  const steps: StepItem[] = [
    { id: "qualify", title: "Qualify this lead", description: "Confirm the customer's requirement and details.", state: done > 0 ? "done" : "active" },
    { id: "offer", title: "Construct an offer", description: "Pick a preset and share indicative terms with the customer.", state: done > 1 ? "done" : done === 1 ? "active" : "locked", lockedHint: 'Complete "Qualify this lead" first' },
    { id: "next", title: "Set next steps", description: "Name the readiness gaps and what happens next.", state: done > 2 ? "done" : done === 2 ? "active" : "locked", lockedHint: 'Complete "Construct an offer" first' },
  ]
  return (
    <ApplicationShell
      variant="mobile"
      title="Lead"
      initials="LP"
      workspaces={shellWorkspaces}
      navigation={{ active, onActiveChange: onNavigate }}
      pageHeader={{ context: "inside", title: "Trivedi Enterprises", description: "CV-10764", onBack: () => {}, time: "12:30" }}
      footerNote={footerNote ? footerNoteText : undefined}
    >
      <div className="flex min-h-(--size-share-full) flex-col gap-(--spacing-stack-md) bg-surface-hover p-(--spacing-inline-lg)">
        <SummaryCard title="Lead info" subtitle="Secured lending · ₹18.3 L" status={{ label: "Qualifying", variant: "moderate" }} items={[{ label: "Owner", value: "Amit Sharma" }, { label: "Segment", value: "Business" }]} />

        <SummaryCard title="Lead progress">
          <Steps steps={steps} onOpen={() => setDone((d) => Math.min(d + 1, steps.length))} />
        </SummaryCard>

        <div className="flex gap-(--spacing-inline-md) *:flex-1">
          <Button variant="success">Mark won</Button>
          <Button variant="secondary">Drop lead</Button>
        </div>

        <AiSuggestion variant="row" onClick={() => {}}>Ask Kompanion</AiSuggestion>
        <div>
          <AiSuggestion variant="pill" onClick={() => {}}>Simulate credit assessment</AiSuggestion>
        </div>

        <ItemCard title="Documents folder" meta="3 documents" onClick={() => {}} />

        <Accordion variant="card" defaultValue={["company"]}>
          {sections.map((s) => (
            <AccordionItem key={s.id} value={s.id}>
              <AccordionTrigger>{s.title}</AccordionTrigger>
              <AccordionContent>
                {s.rows.map(([label, value]) => (
                  <CardKeyValue key={label} label={label}>{value}</CardKeyValue>
                ))}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <SummaryCard title="Remarks" note="Customer wants a decision before the quarter end." action={{ label: "Edit", onClick: () => {}, variant: "secondary" }} />
        <Button variant="link">View activity log</Button>
      </div>
    </ApplicationShell>
  )
}
