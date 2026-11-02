// Pattern example, not a component: the Clients screen of the mobile application shell, from Figma "Clients screen pattern".
// Assembled only from kit components: ApplicationShell (insidePage header with its plus action, footerNote, bottom navigation),
// Search (with helper), Chip, PersonCard, SummaryCard (with action), Alert and Button. Typing a surname filters the list.
import * as React from "react"

import { Alert, AlertDescription, AlertTitle } from "@/rm-style/ui/alert"
import { ApplicationShell } from "@/rm-style/ui/application-shell"
import type { Destination } from "@/rm-style/ui/application-shell/bottom-navigation"
import { Button } from "@/rm-style/ui/button"
import { PersonCard, SummaryCard } from "@/rm-style/ui/cards"
import { Chip } from "@/rm-style/ui/chip/chip"
import { Search } from "@/rm-style/ui/search"
import { footerNoteText, shellWorkspaces } from "./mobile-home"

export type ClientsState = "default" | "filtered" | "empty" | "loading" | "error"

type Client = {
  initials: string
  name: string
  crn: string
  status: string
  alert?: { text: string; tone: "danger" | "neutral" }
  due?: boolean
}

const clients: Client[] = [
  { initials: "RM", name: "Rajesh Mehra", crn: "56792323", status: "AUTH · Head · Family of 4" },
  { initials: "LP", name: "Lakshmesh Patel", crn: "11021023", status: "AUTH · Head · Family of 2" },
  { initials: "RM", name: "Rajesh Mehta", crn: "56792411", status: "AUTH · Head · Family of 4", alert: { text: "Overdue · 31 Aug 2026", tone: "danger" } },
  { initials: "JR", name: "Jayanti Raj", crn: "45495722", status: "AUTH · Head · Family of 3", alert: { text: "FD renewal due · ₹8 L", tone: "neutral" }, due: true },
  { initials: "PS", name: "Piyush Sahu", crn: "33100288", status: "AUTH · Head · Family of 2", alert: { text: "FD renewal due · ₹12 L", tone: "neutral" }, due: true },
  { initials: "SK", name: "Samata Khemalapure", crn: "78210934", status: "AUTH · Head · Family of 5", alert: { text: "FD renewal due · ₹5 L", tone: "neutral" }, due: true },
  { initials: "AK", name: "Anil Kulkarni", crn: "90211456", status: "AUTH · Head · Family of 3", alert: { text: "FD renewal due · ₹20 L", tone: "neutral" }, due: true },
]

const FILTER = "Renewals and Maturities"

export type MobileClientsProps = {
  state?: ClientsState
  footerNote?: boolean
  active?: Destination
  onNavigate?: (destination: Destination) => void
}

/** Clients screen inside the framed mobile shell. */
export function MobileClients({ state = "default", footerNote = true, active = "Clients", onNavigate }: MobileClientsProps) {
  // The state control sets where the screen starts; the search and the chip then work live.
  const startQuery = state === "empty" ? "Sharma" : ""
  const [query, setQuery] = React.useState(startQuery)
  const [filter, setFilter] = React.useState<string | null>(state === "filtered" ? FILTER : null)
  React.useEffect(() => {
    setQuery(startQuery)
    setFilter(state === "filtered" ? FILTER : null)
  }, [state, startQuery])

  const q = query.trim().toLowerCase()
  const list = clients.filter(
    (c) => (!filter || c.due) && (!q || c.name.toLowerCase().includes(q) || c.crn.includes(q))
  )
  const loading = state === "loading"
  const error = state === "error"

  return (
    <ApplicationShell
      variant="mobile"
      title="Clients"
      initials="LP"
      workspaces={shellWorkspaces}
      navigation={{ active, onActiveChange: onNavigate }}
      insidePage={{
        context: "inside-page-description",
        title: "Clients",
        description: loading || error ? "Clients" : `${list.length} ${list.length === 1 ? "client" : "clients"}`,
        time: "12:30",
        onBack: () => {},
        onAction: () => {},
        actionLabel: "Add client",
      }}
      footerNote={footerNote ? footerNoteText : undefined}
    >
      <div className="flex min-h-full flex-col gap-(--spacing-inline-lg) bg-surface-hover p-(--spacing-inline-lg)">
        <Search
          placeholder="Search name, CRN or a filter"
          value={query}
          onValueChange={setQuery}
          loading={loading}
          state={error ? "error" : "default"}
          helper={loading ? "Loading clients…" : error ? "Search unavailable. Try again." : undefined}
        />
        {filter && !loading && !error && (
          <div className="flex">
            <Chip pressed onRemove={() => setFilter(null)}>
              {filter}
            </Chip>
          </div>
        )}
        {error ? (
          <>
            <Alert variant="error">
              <AlertTitle>Unable to load clients</AlertTitle>
              <AlertDescription>Check your connection and try again.</AlertDescription>
            </Alert>
            <div>
              <Button>Try again</Button>
            </div>
          </>
        ) : loading ? (
          [0, 1, 2].map((i) => <PersonCard key={i} state="loading" name="" />)
        ) : list.length === 0 ? (
          <SummaryCard
            title="No clients match these filters"
            description="Try removing a filter or searching by name or CRN."
            action={{
              label: "Reset filters",
              onClick: () => {
                setQuery("")
                setFilter(null)
              },
            }}
          />
        ) : (
          list.map((c) => (
            <PersonCard
              key={c.crn}
              name={c.name}
              initials={c.initials}
              lines={[`CRN: ${c.crn}`]}
              notes={[
                { text: c.status, tone: "success" },
                ...(c.alert ? [{ text: c.alert.text, tone: c.alert.tone, strong: true }] : []),
              ]}
              onClick={() => {}}
            />
          ))
        )}
      </div>
    </ApplicationShell>
  )
}
