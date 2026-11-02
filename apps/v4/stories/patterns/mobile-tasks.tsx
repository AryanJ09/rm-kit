// Pattern example, not a component: the Tasks screen of the mobile shell, from the prototype: one task card per category.
// Assembled only from kit components: ApplicationShell (inside header) and TaskCard.
import * as React from "react"
import { CakeIcon, CalendarCheckIcon, CreditCardIcon, ShieldCheckIcon, TriangleAlertIcon, TrendingUpIcon } from "lucide-react"

import { ApplicationShell } from "@/rm-style/ui/application-shell"
import type { Destination } from "@/rm-style/ui/application-shell/bottom-navigation"
import { TaskCard, type CardState } from "@/rm-style/ui/cards"
import { footerNoteText, shellWorkspaces } from "./mobile-home"

const tasks = [
  { count: 9, icon: ShieldCheckIcon, title: "Re-KYC due", text: "Meet regulatory requirement", accent: "brand" },
  { count: 6, icon: CalendarCheckIcon, title: "Follow-ups", text: "Check today's scheduled follow-ups", accent: "brand" },
  { count: 6, icon: CreditCardIcon, title: "Large debits/credits", text: "Cross-sell or prevent attrition", accent: "brand" },
  { count: 5, icon: TriangleAlertIcon, title: "Open Escalations", text: "Connect internally to fastrack resolution", accent: "warning" },
  { count: 5, icon: TrendingUpIcon, title: "Journey drop-offs", text: "Assist journey completion", accent: "info" },
  { count: 2, icon: CakeIcon, title: "Birthdays today", text: "Wish and build stronger relationship", accent: "brand" },
] as const

export type MobileTasksProps = {
  state?: CardState
  footerNote?: boolean
  active?: Destination
  onNavigate?: (destination: Destination) => void
}

/** Tasks inside the framed mobile shell. */
export function MobileTasks({ state = "default", footerNote = true, active = "Home", onNavigate }: MobileTasksProps) {
  return (
    <ApplicationShell
      variant="mobile"
      title="Tasks"
      initials="LP"
      workspaces={shellWorkspaces}
      navigation={{ active, onActiveChange: onNavigate }}
      pageHeader={{ context: "inside", title: "Tasks", onBack: () => {}, time: "12:30" }}
      footerNote={footerNote ? footerNoteText : undefined}
    >
      <div className="flex min-h-(--size-share-full) flex-col gap-(--spacing-stack-md) bg-surface-hover p-(--spacing-inline-lg)">
        {tasks.map((t) => (
          <TaskCard key={t.title} {...t} state={state} onClick={() => {}} />
        ))}
      </div>
    </ApplicationShell>
  )
}
