// Pattern example, not a component: the Cases screen of the mobile shell, from the prototype: a page header, a search, and
// the cases as rows (or the empty message). Assembled only from kit components: ApplicationShell, Search, ItemList + ItemCard,
// SummaryCard (empty).
import * as React from "react"

import { ApplicationShell } from "@/rm-style/ui/application-shell"
import type { Destination } from "@/rm-style/ui/application-shell/bottom-navigation"
import { ItemCard, ItemList, SummaryCard } from "@/rm-style/ui/cards"
import { Search } from "@/rm-style/ui/search"
import { footerNoteText, shellWorkspaces } from "./mobile-home"

export type CasesState = "default" | "empty"

const cases = [
  { id: "SR-20931", customer: "Rajesh Mehra", category: "Loan", branch: "Mumbai West", status: "In progress" as const },
  { id: "SR-20932", customer: "Sunita Mishra", category: "Deposit", branch: "Pune", status: "New" as const },
  { id: "SR-20935", customer: "Deepa Sharma", category: "Card", branch: "Mumbai West", status: "Closed" as const },
]
const statusVariant = { New: "moderate", "In progress": "growth", Closed: "success" } as const

export type MobileCasesProps = {
  state?: CasesState
  footerNote?: boolean
  active?: Destination
  onNavigate?: (destination: Destination) => void
}

/** Cases inside the framed mobile shell. The search filters live. */
export function MobileCases({ state = "default", footerNote = true, active = "CRM", onNavigate }: MobileCasesProps) {
  const [query, setQuery] = React.useState("")
  const q = query.trim().toLowerCase()
  const list = state === "empty" ? [] : cases.filter((c) => !q || `${c.id} ${c.branch} ${c.category} ${c.customer}`.toLowerCase().includes(q))
  return (
    <ApplicationShell
      variant="mobile"
      title="Cases"
      initials="LP"
      workspaces={shellWorkspaces}
      navigation={{ active, onActiveChange: onNavigate }}
      pageHeader={{ context: "page", title: "Cases", time: "12:30" }}
      footerNote={footerNote ? footerNoteText : undefined}
    >
      <div className="flex min-h-(--size-share-full) flex-col gap-(--spacing-stack-md) bg-surface-hover p-(--spacing-inline-lg)">
        <Search value={query} onValueChange={setQuery} placeholder="Search by case #, branch, or category" label="Search cases" />
        {list.length === 0 ? (
          <SummaryCard title="No cases yet." description="Cases you're working on will appear here." />
        ) : (
          <ItemList>
            {list.map((c) => (
              <ItemCard
                key={c.id}
                inList
                title={c.customer}
                meta={`${c.id} • ${c.branch}`}
                description={c.category}
                tags={[{ label: c.status, variant: statusVariant[c.status] }]}
                onClick={() => {}}
              />
            ))}
          </ItemList>
        )}
      </div>
    </ApplicationShell>
  )
}
