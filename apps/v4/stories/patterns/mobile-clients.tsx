// Pattern example, not a component: the Clients screen of the mobile application shell, from the prototype (Clients).
// Assembled only from kit components: ApplicationShell (page header), Search (helper lines), Button (filter, with a count),
// Chip (the chosen filter), SectionHeader ("CLIENTS (n)"), ItemList + PersonCard (rows), SummaryCard (empty), Alert and Button.
import * as React from "react"
import { ListFilterIcon } from "lucide-react"

import { Alert, AlertDescription, AlertTitle } from "@/rm-style/ui/alert"
import { BottomSheet, BottomSheetContent, BottomSheetTrigger } from "@/rm-style/ui/bottom-sheet"
import { ApplicationShell } from "@/rm-style/ui/application-shell"
import type { Destination } from "@/rm-style/ui/application-shell/bottom-navigation"
import { Button } from "@/rm-style/ui/button"
import { ItemList, PersonCard, SummaryCard } from "@/rm-style/ui/cards"
import { Chip } from "@/rm-style/ui/chip/chip"
import { SectionHeader } from "@/rm-style/ui/section-header"
import { Search } from "@/rm-style/ui/search"
import { footerNoteText, shellWorkspaces } from "./mobile-home"

export type ClientsState = "default" | "filtered" | "empty" | "loading" | "error"

type Client = {
  initials: string
  name: string
  crn: string
  family: number
  auth: boolean
  /** The last line of the row: a contact, an alert, or nothing. */
  line: { text: string; tone: "success" | "danger" | "neutral"; strong: boolean }
  /** Shown only when the Re-KYC filter is on. */
  overdue?: boolean
}

const clients: Client[] = [
  { initials: "RM", name: "Rajesh Mehra", crn: "56792323", family: 13, auth: true, line: { text: "Last contacted 14 Aug 2026, 12:32 pm · In person", tone: "neutral", strong: true } },
  { initials: "SM", name: "Sunita Mishra", crn: "56792324", family: 3, auth: true, line: { text: "Last contacted 11 Aug 2026, 10:05 am · Voice call", tone: "neutral", strong: true }, overdue: true },
  { initials: "RK", name: "Rajesh Kumar", crn: "35495720", family: 2, auth: true, line: { text: "Last contacted 08 Aug 2026, 03:20 pm · In person", tone: "neutral", strong: true } },
  { initials: "DS", name: "Deepa Sharma", crn: "35495721", family: 1, auth: true, line: { text: "Contact not initiated", tone: "neutral", strong: true } },
  { initials: "JR", name: "Jayanti Raj", crn: "45495722", family: 3, auth: true, line: { text: "Overdue · 26 Aug 2026", tone: "danger", strong: true }, overdue: true },
  { initials: "VN", name: "Vikram Nair", crn: "35495722", family: 4, auth: true, line: { text: "Overdue · 18 Aug 2026", tone: "danger", strong: true }, overdue: true },
  { initials: "AD", name: "Anita Desai", crn: "56792325", family: 2, auth: false, line: { text: "Contact not initiated", tone: "neutral", strong: true } },
]

// The prototype's "Filter Clients" sheet: sections of chips. Apply sets the chosen filters on the screen.
const filterSections = [
  { title: "Today's focus", options: ["Maturities due", "Re-KYC due", "Birthdays today", "Large debits/credits"] },
  { title: "Contacted in current cycle", options: ["Contacted", "Not contacted"] },
  { title: "Financial risk profile", options: ["Secure", "Conservative", "Moderate", "Growth", "Aggressive"] },
]

// Family view: a household filter. Each product is a multi-select chip; the helper says what the filter does.
const familyProducts = [
  "Alfma Capital India Fund (Agastya)", "Bagmane REIT", "AllAccurate Building Beats PMS", "3P India Equity Fund-1",
  "Arttha Capital Fund IV", "ICICI Prudential Contra", "Kotak India Focus Portfolio Investment Approach",
  "Abakkus Diversified Alpha Approach", "Abakkus Flexi Edge Fund", "Karma Capital Jasmine Fund",
  "AlfAccurate Budding Beast", "AlfAccurate GEMS", "ICICI Prudential PIPE", "SageOne Flagship Growth OE Fund",
  "SageOne Core Portfolio (SCP)", "Clarus Equity Fund",
]

export type MobileClientsProps = {
  state?: ClientsState
  footerNote?: boolean
  active?: Destination
  onNavigate?: (destination: Destination) => void
}

/** Clients inside the framed mobile shell. The state sets where the screen starts; the search and the chip then work live. */
export function MobileClients({ state = "default", footerNote = true, active = "Clients", onNavigate }: MobileClientsProps) {
  const startQuery = state === "empty" ? "Sharma" : ""
  const [query, setQuery] = React.useState(startQuery)
  const [applied, setApplied] = React.useState<string[]>(state === "filtered" ? ["Re-KYC due"] : [])
  const [draft, setDraft] = React.useState<string[]>(applied)
  const [sheetOpen, setSheetOpen] = React.useState(false)
  React.useEffect(() => {
    setQuery(startQuery)
    setApplied(state === "filtered" ? ["Re-KYC due"] : [])
    setDraft(state === "filtered" ? ["Re-KYC due"] : [])
  }, [state, startQuery])

  const q = query.trim().toLowerCase()
  const list = clients.filter(
    (c) => (applied.length === 0 || c.overdue) && (!q || c.name.toLowerCase().includes(q) || c.crn.includes(q))
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
      pageHeader={{ context: "page", title: "Clients", time: "12:30" }}
      footerNote={footerNote ? footerNoteText : undefined}
    >
      <div className="flex min-h-(--size-share-full) flex-col gap-(--spacing-inline-lg) bg-surface-hover p-(--spacing-inline-lg)">
        <div className="flex items-start gap-(--spacing-inline-md)">
          <div className="min-w-0 flex-1">
            <Search
              placeholder="Search name, CRN or a filter"
              value={query}
              onValueChange={setQuery}
              loading={loading}
              state={error ? "error" : "default"}
              helper={loading ? "Loading clients…" : error ? "Search unavailable. Try again." : undefined}
            />
          </div>
          <BottomSheet open={sheetOpen} onOpenChange={(o) => { setSheetOpen(o); if (o) setDraft(applied) }}>
            <BottomSheetTrigger render={<Button size="icon-md" aria-label="Filter clients" count={applied.length || undefined} />}>
              <ListFilterIcon />
            </BottomSheetTrigger>
            <BottomSheetContent
              title="Filter Clients"
              description="Choose the filters for the client list."
              footer={
                <>
                  <Button variant="secondary" onClick={() => setDraft([])}>Reset</Button>
                  <Button onClick={() => { setApplied(draft); setSheetOpen(false) }}>Apply</Button>
                </>
              }
            >
              <div className="flex flex-col gap-(--spacing-inline-lg) pb-(--spacing-inline-md)">
                {filterSections.map((sec) => (
                  <div key={sec.title} className="flex flex-col gap-(--spacing-stack-sm)">
                    <span className="text-(length:--font-size-xs) text-muted-foreground uppercase tracking-(--letter-spacing-widest)">{sec.title}</span>
                    <div className="flex flex-wrap gap-(--spacing-stack-2xs)">
                      {sec.options.map((o) => (
                        <Chip key={o} pressed={draft.includes(o)} onPressedChange={(on) => setDraft((d) => (on ? [...d, o] : d.filter((x) => x !== o)))}>
                          {o}
                        </Chip>
                      ))}
                    </div>
                  </div>
                ))}
                <div className="flex flex-col gap-(--spacing-stack-sm)">
                  <span className="text-(length:--font-size-xs) text-muted-foreground uppercase tracking-(--letter-spacing-widest)">Family view</span>
                  <span className="text-(length:--font-size-sm) font-(--typography-label-md-font-weight)">Products</span>
                  <span className="text-(length:--font-size-xs) text-muted-foreground">Filters by household: shows the family head when any member holds or is eligible for the selected product.</span>
                  <div className="flex flex-wrap gap-(--spacing-stack-2xs)">
                    {familyProducts.map((o) => (
                      <Chip key={o} pressed={draft.includes(o)} onPressedChange={(on) => setDraft((d) => (on ? [...d, o] : d.filter((x) => x !== o)))}>
                        {o}
                      </Chip>
                    ))}
                  </div>
                </div>
              </div>
            </BottomSheetContent>
          </BottomSheet>
        </div>
        {applied.length > 0 && !loading && !error && (
          <div className="flex flex-wrap gap-(--spacing-stack-2xs)">
            {applied.map((f) => (
              <Chip key={f} pressed onRemove={() => setApplied((a) => a.filter((x) => x !== f))}>
                {f}
              </Chip>
            ))}
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
          <ItemList>
            {[0, 1, 2].map((i) => (
              <PersonCard key={i} inList state="loading" name="" />
            ))}
          </ItemList>
        ) : list.length === 0 ? (
          <SummaryCard
            title="No clients match these filters"
            description="Try removing a filter or searching by name or CRN."
            action={{
              label: "Reset filters",
              onClick: () => {
                setQuery("")
                setApplied([])
              },
            }}
          />
        ) : (
          <>
            <SectionHeader title={`Clients (${list.length})`} />
            <ItemList>
              {list.map((c) => (
                <PersonCard
                  key={c.crn}
                  inList
                  name={c.name}
                  initials={c.initials}
                  lines={[`CRN: ${c.crn}`]}
                  tags={[{ label: "Head", variant: "neutral" }, { label: `Family of ${c.family}`, variant: "neutral" }]}
                  notes={[{ text: c.line.text, tone: c.line.tone, strong: c.line.strong }]}
                  role={{ label: c.auth ? "Auth" : "Non-Auth", variant: c.auth ? "success" : "neutral" }}
                  chevron={false}
                  onClick={() => {}}
                />
              ))}
            </ItemList>
          </>
        )}
      </div>
    </ApplicationShell>
  )
}
