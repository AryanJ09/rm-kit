// Pattern example, not a component: the RM's own profile screen of the mobile shell, from the prototype. Two tabs:
// Portfolio (My Customers: the numbers and the matrix) and SOP (the score, then goals with progress, a target and a cap).
// Assembled only from kit components: ApplicationShell (inside page header), PersonCard, Tabs (secondary, filled and soft),
// StatCard (title, strip, children), Matrix, SummaryCard, Accordion (card), Progress (label and markers), AiSuggestion.
import * as React from "react"
import { IdCardIcon } from "lucide-react"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/rm-style/ui/accordion"
import { AiSuggestion } from "@/rm-style/ui/ai-suggestion"
import { Badge } from "@/rm-style/ui/badge"
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

// A goal with a target and a cap, shaped from the prototype's SOP categories (value, target and cap share one unit).
const goal = (label: string, achieved: number, achievedLabel: string, target: number, targetLabel: string, cap: number, capLabel: string): Goal => ({
  label, achieved, achievedLabel, target, targetLabel, cap, capLabel,
})
const total = (achieved: number): Goal => ({ label: "", achieved, achievedLabel: `${achieved}%`, target: 100, targetLabel: "100%" })

type Part = Goal & { children?: Goal[] }
type Group = { id: string; title: string; subtitle: string; total: Goal; parts: Part[]; checks?: { label: string; pill: string; tone: "success" | "aggressive" }[] }
const groups: Group[] = [
  {
    id: "deposit",
    title: "Deposit & NTB",
    subtitle: "Wtg: 20% • SOP: 12.8",
    total: total(64),
    parts: [goal("SA Book Growth", 42, "₹42L", 60, "₹60L", 75, "₹75L"), goal("NTB Value", 28, "₹28L", 45, "₹45L", 55, "₹55L"), goal("NTB Families", 3, "3", 4, "4", 5, "5")],
  },
  {
    id: "fee",
    title: "Fee Income & X-Sell",
    subtitle: "Wtg: 20% • SOP: 14.2",
    total: total(71),
    parts: [
      { label: "Investment", achieved: 78, achievedLabel: "78%", target: 100, targetLabel: "100%", children: [goal("MF NAS", 9.5, "₹9.5L", 12, "₹12L", 15, "₹15L"), goal("Trinity", 6.2, "₹6.2L", 7, "₹7L", 9, "₹9L")] },
      goal("Protection (LI / GI)", 4.8, "₹4.8L", 6, "₹6L", 7.5, "₹7.5L"),
      goal("Payments & Others (CMS / POS / Kotax / Salary Active)", 34, "34", 30, "30", 40, "40"),
    ],
  },
  {
    id: "tfx",
    title: "TFX (FES & TFX Income)",
    subtitle: "Wtg: 15% • SOP: 7.2",
    total: total(48),
    parts: [goal("NTFX", 1.1, "₹1.1L", 3, "₹3L", 4, "₹4L"), goal("TFX on Existing Stock + Individual FES", 12, "₹12L", 20, "₹20L", 26, "₹26L")],
  },
  {
    id: "assets",
    title: "Assets",
    subtitle: "Wtg: 10% • SOP: 5.2",
    total: total(52),
    parts: [
      goal("High Yield Loans (PL, BL, GL, LAS)", 38, "₹38L", 60, "₹60L", 75, "₹75L"),
      goal("Retail Loans (HL, CL, BBG-HL, Vishwas-HL, BBG-HL)", 1.45, "₹1.45Cr", 2, "₹2Cr", 2.5, "₹2.5Cr"),
      goal("Business Banking Loans (WC, SME, Agri, LAP, SBE, FG, Vishwas-LAP, BBG-LAP)", 0.96, "₹0.96Cr", 1.8, "₹1.8Cr", 2.2, "₹2.2Cr"),
      goal("Carded Solitaire", 14, "14", 15, "15", 20, "20"),
    ],
  },
  {
    id: "docs",
    title: "Dockers and compliance",
    subtitle: "Wtg: 10% • SOP: 4.5",
    total: total(45),
    parts: [
      { label: "Customer coverage", achieved: 72, achievedLabel: "72%", target: 100, targetLabel: "100%" },
      { label: "Digital Adoption", achieved: 65, achievedLabel: "65%", target: 80, targetLabel: "80%" },
    ],
    checks: [
      { label: "External Certification", pill: "Certified", tone: "success" },
      { label: "LMS - Learning module", pill: "Completed", tone: "success" },
      { label: "Risk & Conduct", pill: "Open", tone: "aggressive" },
    ],
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
                              {p.children?.map((c) => (
                                <div key={c.label} className="flex flex-col gap-(--spacing-inline-md) pl-(--spacing-inline-md)">
                                  <span className="text-(length:--font-size-sm) text-muted-foreground">{c.label}</span>
                                  <Progress size="lg" tone="secure" {...bar(c)} />
                                </div>
                              ))}
                            </React.Fragment>
                          ))}
                          {g.checks?.map((c) => (
                            <React.Fragment key={c.label}>
                              <Separator />
                              <div className="flex items-center justify-between">
                                <span className="text-(length:--font-size-sm) font-(--typography-label-md-font-weight)">{c.label}</span>
                                <Badge variant={c.tone}>{c.pill}</Badge>
                              </div>
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
