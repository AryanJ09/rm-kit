// Pattern example, not a component: the Case detail screen of the mobile shell, from the prototype. The case value with its
// contact actions, the gates a case passes as steps, the remarks, and a link back to the lead it came from.
// Assembled only from kit components: ApplicationShell (inside header), SummaryCard, Button, Steps.
import * as React from "react"
import { EllipsisIcon, MailIcon, MessageSquareIcon, PhoneIcon } from "lucide-react"

import { ApplicationShell } from "@/rm-style/ui/application-shell"
import type { Destination } from "@/rm-style/ui/application-shell/bottom-navigation"
import { Button } from "@/rm-style/ui/button"
import { SummaryCard } from "@/rm-style/ui/cards"
import { Steps, type StepItem } from "@/rm-style/ui/steps"
import { footerNoteText, shellWorkspaces } from "./mobile-home"

const gates: StepItem[] = [
  { id: "docs", title: "Documents verified", description: "All mandatory documents are in the folder.", state: "done" },
  { id: "credit", title: "Credit review", description: "With the credit team.", state: "active" },
  { id: "disburse", title: "Disbursal", state: "locked", lockedHint: 'Complete "Credit review" first' },
]

const contact = [
  { label: "Call", icon: <PhoneIcon /> },
  { label: "Message", icon: <MessageSquareIcon /> },
  { label: "Email", icon: <MailIcon /> },
  { label: "More", icon: <EllipsisIcon /> },
]

export type MobileCaseDetailProps = {
  footerNote?: boolean
  active?: Destination
  onNavigate?: (destination: Destination) => void
}

/** Case detail inside the framed mobile shell. */
export function MobileCaseDetail({ footerNote = true, active = "CRM", onNavigate }: MobileCaseDetailProps) {
  return (
    <ApplicationShell
      variant="mobile"
      title="Case"
      initials="LP"
      workspaces={shellWorkspaces}
      navigation={{ active, onActiveChange: onNavigate }}
      pageHeader={{ context: "inside", title: "Case SR-20931", description: "Rajesh Mehra", onBack: () => {}, time: "12:30" }}
      footerNote={footerNote ? footerNoteText : undefined}
    >
      <div className="flex min-h-(--size-share-full) flex-col gap-(--spacing-stack-md) bg-surface-hover p-(--spacing-inline-lg)">
        <SummaryCard title="Case value" subtitle="₹6.54 L" status={{ label: "In progress", variant: "moderate" }}>
          <div className="grid grid-cols-4 gap-(--spacing-inline-sm)">
            {contact.map((c) => (
              <Button key={c.label} variant="secondary" size="sm" aria-label={c.label}>
                {c.icon}
              </Button>
            ))}
          </div>
        </SummaryCard>

        <SummaryCard title="Case gates">
          <Steps steps={gates} />
        </SummaryCard>

        <SummaryCard title="Remarks" note="Waiting on the income proof from the customer." action={{ label: "Add", onClick: () => {}, variant: "secondary" }} />
        <Button variant="link">View activity log</Button>
        <Button variant="ghost">How this lead became this case</Button>
      </div>
    </ApplicationShell>
  )
}
