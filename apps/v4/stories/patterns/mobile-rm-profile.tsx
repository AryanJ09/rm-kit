// Pattern example, not a component: the RM's own profile screen of the mobile shell, from the prototype. Two tabs:
// Portfolio (My Customers: the numbers and the matrix) and SOP (the score, then goals with progress, a target and a cap).
// Assembled only from kit components: ApplicationShell (inside page header), PersonCard, Tabs (secondary, filled and soft),
// StatCard (title, strip, children), Matrix, SummaryCard, Accordion (card), Progress (label and markers), AiSuggestion.
import * as React from "react"
import { IdCardIcon } from "lucide-react"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/rm-style/ui/accordion"
import { AiSuggestion } from "@/rm-style/ui/ai-suggestion"
import { ApplicationShell } from "@/rm-style/ui/application-shell"
import type { Destination } from "@/rm-style/ui/application-shell/bottom-navigation"
import { PersonCard, StatCard, SummaryCard } from "@/rm-style/ui/cards"
import { Matrix, type MatrixColumn, type MatrixRow } from "@/rm-style/ui/matrix"
import { Progress } from "@/rm-style/ui/progress"
import { Separator } from "@/rm-style/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/rm-style/ui/tabs"
import { footerNoteText, shellWorkspaces } from "./mobile-home"

const columns: MatrixColumn[] = [
  { id: "guard", label: "Guard", tone: "success", hint: "Guard: in programme, target met" },
  { id: "revive", label: "Revive", tone: "aggressive", hint: "Revive: in programme, below threshold" },
  { id: "upgrade", label: "Upgrade", tone: "growth", hint: "Upgrade: target met, not signed up" },
  { id: "acquire", label: "Acquire", tone: "moderate", hint: "Acquire: potential, below threshold" },
]
const rows: MatrixRow[] = [
  { id: "solitaire", label: "Solitaire+", caption: "100 CRNs" },
  { id: "privy-plus", label: "Privy+", caption: "80 CRNs" },
  { id: "privy", label: "Privy", caption: "120 CRNs" },
]
const values = {
  solitaire: { guard: 60, revive: 40, upgrade: 40, acquire: 80 },
  "privy-plus": { guard: 30, revive: 50, upgrade: 55, acquire: 120 },
  privy: { guard: 95, revive: 25, upgrade: 70, acquire: 150 },
}

// A goal bar: where the achieved fill ends and where the target and cap flags sit, all on one scale (a little past the cap).
type Goal = { label: string; achieved: number; achievedLabel: string; target: number; targetLabel: string; cap?: number; capLabel?: string }
function bar(g: Goal) {
  const max = (g.cap ?? g.target) * 1.06
  const pos = (v: number) => (v / max) * 100
  return {
    value: pos(g.achieved),
    valueLabel: `Achieved: ${g.achievedLabel}`,
    markers: [
      { value: pos(g.target), label: "Target", detail: g.targetLabel },
      ...(g.cap !== undefined && g.capLabel ? [{ value: pos(g.cap), label: "Cap", detail: g.capLabel, tone: "accent" as const }] : []),
    ],
  }
}

const rvGrowth: Goal = { label: "RV Growth", achieved: 1.2, achievedLabel: "₹1.2Cr", target: 2, targetLabel: "₹2Cr", cap: 2.5, capLabel: "₹2.5Cr" }
const groups = [
  {
    id: "deposit",
    title: "Deposit & NTB",
    subtitle: "Wtg: 20% • SOP: 12.8",
    total: { label: "", achieved: 64, achievedLabel: "64%", target: 100, targetLabel: "100%" } as Goal,
    parts: [
      { label: "SA Book Growth", achieved: 42, achievedLabel: "₹42L", target: 60, targetLabel: "₹60L", cap: 75, capLabel: "₹75L" },
      { label: "NTB Value", achieved: 28, achievedLabel: "₹28L", target: 45, targetLabel: "₹45L", cap: 55, capLabel: "₹55L" },
      { label: "NTB Families", achieved: 3, achievedLabel: "3", target: 4, targetLabel: "4", cap: 5, capLabel: "5" },
    ] as Goal[],
  },
  {
    id: "fee",
    title: "Fee Income & X-Sell",
    subtitle: "Wtg: 20% • SOP: 14.2",
    total: { label: "", achieved: 71, achievedLabel: "71%", target: 100, targetLabel: "100%" } as Goal,
    parts: [] as Goal[],
  },
]

export type RmProfileTab = "portfolio" | "sop"

export type MobileRmProfileProps = {
  tab?: RmProfileTab
  onTabChange?: (tab: RmProfileTab) => void
  footerNote?: boolean
  active?: Destination
  onNavigate?: (destination: Destination) => void
}

/** The RM's profile inside the framed mobile shell. */
export function MobileRmProfile({ tab: tabProp, onTabChange, footerNote = true, active = "Home", onNavigate }: MobileRmProfileProps) {
  const [inner, setInner] = React.useState<RmProfileTab>("portfolio")
  const tab = tabProp ?? inner
  const change = (t: RmProfileTab) => {
    if (tabProp === undefined) setInner(t)
    onTabChange?.(t)
  }
  const [period, setPeriod] = React.useState("qtd")
  const [view, setView] = React.useState("goals")

  return (
    <ApplicationShell
      variant="mobile"
      title="Profile"
      initials="LP"
      workspaces={shellWorkspaces}
      navigation={{ active, onActiveChange: onNavigate }}
      pageHeader={{ context: "inside", title: "Profile", onBack: () => {}, time: "12:30" }}
      footerNote={footerNote ? footerNoteText : undefined}
    >
      <div className="flex min-h-(--size-share-full) flex-col gap-(--spacing-stack-md) bg-surface-hover p-(--spacing-inline-lg)">
        <PersonCard
          name="Lakshmesh Prabhu"
          initials="LP"
          lines={["(Corporate Banking, Kotak) · Senior Manager", "Relationship Management - Mumbai"]}
          tags={[{ label: "8147", variant: "neutral", icon: <IdCardIcon /> }]}
        />

        <Tabs value={tab} onValueChange={(v) => change(v as RmProfileTab)}>
          <TabsList variant="secondary" className="w-(--size-share-full)">
            <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
            <TabsTrigger value="sop">SOP</TabsTrigger>
          </TabsList>

          <TabsContent value="portfolio" className="flex flex-col gap-(--spacing-stack-md)">
            <StatCard
              title="My Customers"
              layout="inline"
              divided
              metrics={[
                { label: "CRNs", value: "323" },
                { label: "Families", value: "310" },
                { label: "QTD Coverage", value: "23%", tone: "success" },
              ]}
            >
              <Matrix columns={columns} rows={rows} values={values} />
            </StatCard>
          </TabsContent>

          <TabsContent value="sop" className="flex flex-col gap-(--spacing-stack-md)">
            <div className="flex items-center justify-between">
              <Tabs value={period} onValueChange={(v) => setPeriod(String(v))}>
                <TabsList variant="secondary" appearance="soft">
                  <TabsTrigger value="qtd">QTD</TabsTrigger>
                  <TabsTrigger value="mtd">MTD</TabsTrigger>
                </TabsList>
              </Tabs>
              <Tabs value={view} onValueChange={(v) => setView(String(v))}>
                <TabsList variant="secondary" appearance="soft">
                  <TabsTrigger value="goals">Goals</TabsTrigger>
                  <TabsTrigger value="nudges">Nudges</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            <SummaryCard title="SOP Score 58.9" />

            {view === "goals" ? (
              <>
                <SummaryCard title={rvGrowth.label} subtitle="Wtg: 25% • SOP: 15">
                  <Progress size="lg" {...bar(rvGrowth)} />
                </SummaryCard>
                <Accordion variant="card" defaultValue={["deposit"]}>
                  {groups.map((g) => (
                    <AccordionItem key={g.id} value={g.id}>
                      <AccordionTrigger>
                        <span className="flex flex-col">
                          <span>{g.title}</span>
                          <span className="text-(length:--font-size-xs) font-(--typography-caption-font-weight) text-muted-foreground">{g.subtitle}</span>
                        </span>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="flex flex-col gap-(--spacing-inline-md)">
                          <Separator />
                          <Progress size="lg" {...bar(g.total)} />
                          {g.parts.map((p) => (
                            <React.Fragment key={p.label}>
                              <Separator />
                              <span className="text-(length:--font-size-sm) font-(--typography-label-md-font-weight)">{p.label}</span>
                              <Progress size="lg" tone="secure" {...bar(p)} />
                            </React.Fragment>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </>
            ) : (
              <div className="flex flex-col gap-(--spacing-inline-sm)">
                <AiSuggestion>RV is behind plan by ₹0.8Cr. Two clients are close to the upgrade threshold.</AiSuggestion>
                <AiSuggestion>NTB families are below the cap. A referral round this week would close the gap.</AiSuggestion>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </ApplicationShell>
  )
}
