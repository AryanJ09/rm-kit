import { productSeries } from "../examples/product-series"
// Pattern example, not a component: the Client 360 screen of the mobile application shell, from the prototype
// (Clients > a client). Assembled only from kit components: ApplicationShell (inside page header), PersonCard, StatCard,
// AiSuggestion, Tabs, Switch, GroupCard, SummaryCard, ItemCard + ItemList, TrendCard, AllocationCard, Accordion (card).
import * as React from "react"

import { AiSuggestion } from "@/rm-style/ui/ai-suggestion"
import { ApplicationShell } from "@/rm-style/ui/application-shell"
import type { Destination } from "@/rm-style/ui/application-shell/bottom-navigation"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/rm-style/ui/accordion"
import { AllocationCard, TrendCard } from "@/rm-style/ui/chart-cards"
import { CardKeyValue, GroupCard, ItemCard, ItemList, PersonCard, StatCard, SummaryCard } from "@/rm-style/ui/cards"
import { Switch } from "@/rm-style/ui/switch"
import { Counter } from "@/rm-style/ui/counter"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/rm-style/ui/table"
import { Tabs, TabsList, TabsTrigger } from "@/rm-style/ui/tabs"
import { TooltipProvider } from "@/rm-style/ui/tooltip"
import { datasets, tabs as tabSpec } from "../RM Kit/Chart/chart-data"
import { footerNoteText, shellWorkspaces } from "./mobile-home"

export type Client360Tab = "cues" | "profile"

type Member = { name: string; crn: string; cues: number; initials: string }
const members: Member[] = [
  { name: "Rajesh Mehra", crn: "56792323", cues: 4, initials: "R" },
  { name: "Anchal Mehra", crn: "70011001", cues: 3, initials: "A" },
  { name: "Subodh Kumar Mehra", crn: "70011002", cues: 2, initials: "S" },
  { name: "Sankalp Mehra", crn: "70011003", cues: 1, initials: "S" },
]

const products = [
  { title: "REIT", meta: "Bagmane REIT", count: 5 },
  { title: "PMS", meta: "AllAccurate Building Beats PMS", count: 4 },
  { title: "Venture Debt Fund", meta: "Arttha Capital Fund IV", count: 4 },
]

const familyMembers = [
  { name: "Anchal Mehra", crn: "70011001", aum: "₹2.1 Cr", auth: true },
  { name: "Subodh Kumar Mehra", crn: "70011002", aum: "₹85 L", auth: false },
]

const recent = [
  { title: "UPI merchant payment", meta: "5 August 2026", amount: "₹1.7 K", direction: "out" as const },
  { title: "Salary credit NEFT", meta: "1 August 2026", amount: "₹68 K", direction: "in" as const },
]

const activations = [
  { title: "Phone banking", meta: "Active since: not specified", status: "Not reg", variant: "neutral" as const },
  { title: "Net banking", meta: "Active since: 0 days", status: "Not reg", variant: "neutral" as const },
  { title: "Mobile banking", meta: "Active since: 0 days", status: "Not reg", variant: "neutral" as const },
  { title: "Embark", meta: "Active since: 0 days", status: "Not active", variant: "aggressive" as const },
  { title: "WhatsApp", meta: "Active since: not specified", status: "Active", variant: "success" as const },
  { title: "Bill pay", meta: "Active since: not specified", status: "Not active", variant: "aggressive" as const },
  { title: "UPI", meta: "Active since: not specified", status: "Active", variant: "success" as const },
  { title: "Credit card", meta: "Active since: 0 days", status: "Not active", variant: "aggressive" as const },
  { title: "POS", meta: "Active since: 0 days", status: "Not active", variant: "aggressive" as const },
  { title: "ATM", meta: "Active since: 0 days", status: "Not active", variant: "aggressive" as const },
  { title: "Active Money", meta: "Active since: not specified", status: "Not active", variant: "aggressive" as const },
]

const requests = [
  { title: "Payment related · funds transfer request", meta: "SR 02939293 · created 10 days ago · web", priority: "High", status: "On hold" },
  { title: "Digital fraud related · FnD block fail handling", meta: "SR 02939297 · closed on 3 Aug 2026 · email", priority: "High", status: "On hold" },
]

const offUs = [
  { label: "Loan sanction", value: "₹46.5 L" },
  { label: "Working capital", value: "₹4 Cr" },
  { label: "Trading debit", value: "₹11.5 L" },
  { label: "Credit card limit", value: "₹7.5 L" },
  { label: "Insurance debit", value: "₹24 L" },
]

const trendMap = { positive: "up", negative: "down", neutral: "neutral" } as const
const bankingSpec = tabSpec.rv
const bankingExample = { headline: { label: "Current value", value: "₹11.3 Cr" }, growth: [
  { label: "YoY growth", change: "+20.2%", trend: trendMap.positive },
  { label: "YTD growth", change: "+6.2%", trend: trendMap.positive },
  { label: "MoM growth", change: "+2.1%", trend: trendMap.positive },
] }

const wealthParts = [
  { id: "equity", label: "Equity", colour: productSeries.equityAllocation?.colour, share: 60.3, value: "₹6.81 Cr", cost: "₹5.2 Cr", returns: "+18.4%", benchmark: "+14.1%", products: [
    { label: "Direct equity", value: "₹5.54 Cr", change: "+₹2.75 L (+20.79%)", trend: "up" as const, holdings: "2 holdings" },
    { label: "Mutual funds & ETFs", value: "₹1.27 Cr", change: "+₹42 K (+5.25%)", trend: "up" as const, holdings: "1 holding" },
  ] },
  { id: "fixed-income", label: "Fixed income", colour: productSeries.fixedIncomeAllocation?.colour, share: 23.8, value: "₹2.69 Cr", cost: "₹2.5 Cr", returns: "-0.6%", benchmark: "+5.9%", products: [
    { label: "Bonds, Debentures & other fixed income", value: "₹2.69 Cr", change: "-₹25 K", trend: "down" as const, holdings: "1 holding" },
  ] },
  { id: "alt-fixed-income", label: "Alternate fixed income", colour: productSeries.altFixedIncome?.colour, share: 11.9, value: "₹1.35 Cr", cost: "₹1.2 Cr", returns: "+7.2%", benchmark: "+6.4%", products: [] },
  { id: "cash", label: "Cash", colour: productSeries.cash?.colour, share: 4.0, value: "₹44.9 L", cost: "₹44.9 L", returns: "0.00%", benchmark: "—", products: [] },
]

const sections = ["Personal details", "Family details", "Recent transactions", "Service activations", "Service requests", "Off-us relationships"] as const

export type MobileClient360Props = {
  name?: string
  crn?: string
  tab?: Client360Tab
  onTabChange?: (tab: Client360Tab) => void
  active?: Destination
  onNavigate?: (destination: Destination) => void
  footerNote?: boolean
}

/** The Client 360 screen: a profile, a metric strip, an AI suggestion, then Cues or Profile. */
export function MobileClient360({
  name = "Rajesh Mehra",
  crn = "56792323",
  tab: tabProp,
  onTabChange,
  active = "Clients",
  onNavigate,
  footerNote = true,
}: MobileClient360Props) {
  const [inner, setInner] = React.useState<Client360Tab>("cues")
  const tab = tabProp ?? inner
  const change = (t: Client360Tab) => {
    if (tabProp === undefined) setInner(t)
    onTabChange?.(t)
  }
  const [byProduct, setByProduct] = React.useState(false)
  const [auth, setAuth] = React.useState(true)
  const [scope, setScope] = React.useState(false)
  const banking = datasets["rv.rajesh"]

  return (
    <TooltipProvider>
      <ApplicationShell
        variant="mobile"
        title="Home"
        initials="LP"
        workspaces={shellWorkspaces}
        navigation={{ active, onActiveChange: onNavigate }}
        pageHeader={{ context: "inside", title: `${name} · ${crn}`, titleStyle: "text", time: "12:30", onBack: () => {} }}
        footerNote={footerNote ? footerNoteText : undefined}
      >
        <div className="flex min-h-(--size-share-full) flex-col gap-(--spacing-stack-lg) bg-surface-hover p-(--spacing-inline-lg)">
          <PersonCard
            name={name}
            initials="RM"
            tags={[{ label: "Head", variant: "neutral" }, { label: "Family of 13", variant: "neutral" }, { label: "Re-KYC due", variant: "growth", dot: true }, { label: "Auth signatory", variant: "success", dot: true }]}
            notes={[{ text: "63 years, M", tone: "neutral" }, { text: "BKC, Mumbai", tone: "neutral" }]}
            footer={
              <div className="flex items-center justify-between gap-(--spacing-inline-sm)">
                <span className="text-(length:--font-size-xs) text-muted-foreground">Meetings · last contacted 14 Aug 2026, 12:32 pm</span>
                <Counter count={6} tone="default" />
              </div>
            }
          />
          <StatCard layout="inline" divided metrics={[{ label: "Family AUM", value: "₹37 Cr" }, { label: "Individual AUM", value: "₹11.3 Cr" }, { label: "Holding", value: "4", info: "CA/SA/TD" }]} />
          <AiSuggestion>Customer is eligible for Solitaire. Complete KYC requirements and initiate Solitaire enrollment.</AiSuggestion>

          <Tabs value={tab} onValueChange={(v) => change(String(v) as Client360Tab)}>
            <TabsList variant="secondary" className="w-(--size-share-full)">
              <TabsTrigger value="cues" className="flex-1">Cues</TabsTrigger>
              <TabsTrigger value="profile" className="flex-1">Profile</TabsTrigger>
            </TabsList>
          </Tabs>

          {tab === "cues" ? (
            <div className="flex flex-col gap-(--spacing-stack-md)">
              <div className="flex items-center gap-(--spacing-inline-sm)">
                <Switch startLabel="Members" endLabel="Products" checked={byProduct} onCheckedChange={setByProduct} />
              </div>
              {!byProduct ? (
                members.map((m, i) => (
                  <GroupCard key={m.crn} title={m.name} subtitle={`CRN: ${m.crn}`} initials={m.initials} count={m.cues} countLabel="Cues" defaultOpen={i === 0}>
                    <SummaryCard tone="info" title="Nominee update" status={{ label: "Mandatory", variant: "aggressive" }} note="No nominee recorded on the primary savings account. Regulatory deadline in 30 days." />
                    <SummaryCard title="REIT · Bagmane REIT" note="Capital appreciation potential in urbanization drives demand in emerging IT corridors." onMore={() => {}} />
                  </GroupCard>
                ))
              ) : (
                <ItemList>
                  {products.map((p) => (
                    <ItemCard key={p.title} inList eyebrow={p.title} title={p.meta} tags={[{ label: `${p.count} members`, variant: "neutral" }]} onClick={() => {}} />
                  ))}
                </ItemList>
              )}
            </div>
          ) : (
            <div className="flex flex-col gap-(--spacing-stack-md)">
              <TrendCard
                title="Banking portfolio"
                subtitle={bankingSpec.subtitle}
                headline={bankingExample.headline}
                growth={bankingExample.growth}
                chart={{ seriesMeta: productSeries, series: banking.series, points: banking.points, unit: banking.unit, summary: banking.summary ?? "Banking portfolio" }}
                footnote={"footnote" in bankingSpec ? bankingSpec.footnote : undefined}
              />
              <AllocationCard
                title="Wealth portfolio"
                scope={{ options: [{ id: "family", label: "Family" }, { id: "individual", label: "Individual" }], value: scope ? "individual" : "family", onChange: (id) => setScope(id === "individual") }}
                total={{ label: "AUM", value: "₹11.3 Cr" }}
                parts={wealthParts}
              />
              <Accordion variant="card" defaultValue={["Personal details", "Family details", "Recent transactions"]}>
                {sections.map((title) => (
                  <AccordionItem key={title} value={title}>
                    <AccordionTrigger
                      count={title === "Family details" ? 13 : title === "Recent transactions" ? 2 : title === "Service requests" ? 2 : title === "Off-us relationships" ? 5 : undefined}
                    >
                      {title}
                    </AccordionTrigger>
                    <AccordionContent>
                      {title === "Personal details" && (
                        <div className="flex flex-col gap-(--spacing-inline-md)">
                          <CardKeyValue label="Date of birth">21 Aug 1962</CardKeyValue>
                          <CardKeyValue label="Client category">Platinum</CardKeyValue>
                          <div className="flex flex-wrap gap-(--spacing-stack-2xs)">
                            <AiSuggestion variant="pill" onClick={() => {}}>Customer details</AiSuggestion>
                            <AiSuggestion variant="pill" onClick={() => {}}>Personal info</AiSuggestion>
                            <AiSuggestion variant="pill" onClick={() => {}}>Contact details</AiSuggestion>
                          </div>
                        </div>
                      )}
                      {title === "Family details" && (
                        <div className="flex flex-col gap-(--spacing-inline-md)">
                          <Switch startLabel="Auth" endLabel="Non-Auth" checked={!auth} onCheckedChange={(v) => setAuth(!v)} />
                          <p className="m-0 text-(length:--font-size-xs) text-muted-foreground">
                            {familyMembers.filter((f) => f.auth === auth).length === 0 ? "Showing 0 of 13 family members." : `Showing ${familyMembers.filter((f) => f.auth === auth).length} of 13 family members.`}
                          </p>
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Name ↑</TableHead>
                                <TableHead>CRN</TableHead>
                                <TableHead>AUM</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {familyMembers.filter((f) => f.auth === auth).length === 0 ? (
                                <TableRow>
                                  <TableCell colSpan={3} className="text-center text-muted-foreground">No family members match this filter.</TableCell>
                                </TableRow>
                              ) : (
                                familyMembers.filter((f) => f.auth === auth).map((f) => (
                                  <TableRow key={f.crn}>
                                    <TableCell>{f.name}</TableCell>
                                    <TableCell>{f.crn}</TableCell>
                                    <TableCell>{f.aum}</TableCell>
                                  </TableRow>
                                ))
                              )}
                            </TableBody>
                          </Table>
                        </div>
                      )}
                      {title === "Recent transactions" && (
                        <ItemList>
                          {recent.map((r) => (
                            <ItemCard key={r.title} inList title={r.title} meta={r.meta} trailing={<span className={r.direction === "in" ? "font-(--typography-label-strong-font-weight) text-(color:--category-success-text)" : "font-(--typography-label-strong-font-weight) text-(color:--category-aggressive-text)"}>{r.amount}{r.direction === "in" ? " ↑" : " ↓"}</span>} />
                          ))}
                        </ItemList>
                      )}
                      {title === "Service activations" && (
                        <ItemList>
                          {activations.map((a) => (
                            <ItemCard key={a.title} inList title={a.title} meta={a.meta} tags={[{ label: a.status, variant: a.variant }]} />
                          ))}
                        </ItemList>
                      )}
                      {title === "Service requests" && (
                        <ItemList>
                          {requests.map((r) => (
                            <ItemCard key={r.meta} inList title={r.title} meta={r.meta} tags={[{ label: r.priority, variant: "aggressive" }, { label: r.status, variant: "neutral" }]} />
                          ))}
                        </ItemList>
                      )}
                      {title === "Off-us relationships" && (
                        <div className="flex flex-col gap-(--spacing-inline-sm)">
                          {offUs.map((o) => (
                            <CardKeyValue key={o.label} label={o.label}>
                              <span className="font-(--typography-label-strong-font-weight)">{o.value}</span>
                            </CardKeyValue>
                          ))}
                        </div>
                      )}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          )}
        </div>
      </ApplicationShell>
    </TooltipProvider>
  )
}
