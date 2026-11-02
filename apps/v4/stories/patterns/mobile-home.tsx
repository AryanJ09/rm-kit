// Pattern example, not a component: the Home screen of the mobile application shell, from Figma "Homepage example".
// It is assembled only from kit components (ApplicationShell with its hero and footerNote slots, StatCard, TaskCard, ItemCard,
// SectionHeader, Alert, Empty). Sample text follows the Figma example; names are generic.
import * as React from "react"
import { CakeIcon, CalendarCheckIcon, ClipboardListIcon, CreditCardIcon, HouseIcon, ShieldCheckIcon, TrendingUpIcon, TriangleAlertIcon } from "lucide-react"

import { Alert, AlertDescription, AlertTitle } from "@/rm-style/ui/alert"
import { ApplicationShell, type ShellWorkspace } from "@/rm-style/ui/application-shell"
import type { Destination } from "@/rm-style/ui/application-shell/bottom-navigation"
import { Button } from "@/rm-style/ui/button"
import { ItemCard, ItemList, StatCard, TaskCard, type CardState } from "@/rm-style/ui/cards"
import { Empty, EmptyDescription, EmptyHeader, EmptyTitle } from "@/rm-style/ui/empty"
import { Search } from "@/rm-style/ui/search"
import { SectionHeader } from "@/rm-style/ui/section-header"

export const footerNoteText = "Powered by Brand • v0.2.0 • 08 Oct 2026"

export type HomeState = "populated" | "loading" | "empty" | "error"

export const shellWorkspaces: ShellWorkspace[] = [
  {
    id: "main",
    label: "Main",
    items: [
      { id: "home", label: "Home", icon: HouseIcon },
      { id: "tasks", label: "Tasks", icon: ClipboardListIcon },
    ],
  },
]

// The six task cards of the prototype: the icon and its tint change per category.
const tasks = [
  { count: 9, icon: ShieldCheckIcon, title: "Re-KYC due", text: "Meet regulatory requirement", accent: "brand" },
  { count: 6, icon: CalendarCheckIcon, title: "Follow-ups", text: "Check today's scheduled follow-ups", accent: "brand" },
  { count: 6, icon: CreditCardIcon, title: "Large debits/credits", text: "Cross-sell or prevent attrition", accent: "brand" },
  { count: 5, icon: TriangleAlertIcon, title: "Open Escalations", text: "Connect internally to fastrack resolution", accent: "warning" },
  { count: 5, icon: TrendingUpIcon, title: "Journey drop-offs", text: "Assist journey completion", accent: "info" },
  { count: 2, icon: CakeIcon, title: "Birthdays today", text: "Wish and build stronger relationship", accent: "brand" },
] as const

// The products of the prototype's Home list: a title, the type of the product (the trailing badge), a line, and risk tags.
const products = [
  { title: "Alfma Capital India Fund (Agastya)", kind: { label: "Private Equity Fund", variant: "neutral" as const }, description: "Leveraged acquisitions targeting high-margin business consolidation plays", risk: ["aggressive"] },
  { title: "Bagmane REIT", kind: { label: "REIT", variant: "neutral" as const }, description: "Capital appreciation potential in urbanization drives demand in emerging IT corridors", risk: ["moderate", "growth"] },
  { title: "AllAccurate Building Beats PMS", kind: { label: "PMS", variant: "neutral" as const }, description: "Concentrated holding in high-yield stocks with tactical sector rotation", risk: ["moderate", "growth", "aggressive"] },
  { title: "3P India Equity Fund-1", kind: { label: "AIF", variant: "neutral" as const }, description: "Flexi-cap, quality-focused value strategy with large-cap bias.", risk: ["conservative", "moderate", "growth", "aggressive"] },
  { title: "Arttha Capital Fund IV", kind: { label: "Venture Debt Fund", variant: "neutral" as const }, description: "Secure steady growth with lower risk through Arttha Capital Fund IV's dependable debt strategy.", risk: ["moderate", "growth"] },
] as const


export type MobileHomeProps = {
  state?: HomeState
  /** Slot toggles: turn the hero band and the footer note on and off. */
  hero?: boolean
  footerNote?: boolean
  active?: Destination
  onNavigate?: (destination: Destination) => void
  /** Replaces the Home content (used by the interactive story for screens not designed yet). */
  screen?: React.ReactNode
}

function HomeContent({ state }: { state: HomeState }) {
  const cardState: CardState = state === "loading" ? "loading" : state === "empty" ? "empty" : "default"
  return (
    <div className="flex min-h-(--size-share-full) flex-col gap-(--spacing-stack-lg) bg-surface-hover px-(--spacing-inline-md) pt-(--spacing-inline-lg) pb-(--spacing-stack-lg)">
      {state === "error" && (
        <Alert variant="error">
          <AlertTitle>Unable to load</AlertTitle>
          <AlertDescription>Task refresh failed. Portfolio summary may be out of date.</AlertDescription>
        </Alert>
      )}
      <div className="grid grid-cols-2 gap-(--spacing-inline-md)">
        {tasks.map((t) => (
          <TaskCard key={t.title} {...t} state={cardState} onClick={() => {}} />
        ))}
      </div>
      <div className="flex flex-col gap-(--spacing-stack-sm)">
        <SectionHeader title="Products" />
        {state === "empty" ? (
          <div className="rounded-(--radius-2xl) bg-card">
            <Empty>
              <EmptyHeader>
                <EmptyTitle>Your portfolio starts here</EmptyTitle>
                <EmptyDescription>No families or products are assigned to you yet.</EmptyDescription>
              </EmptyHeader>
            </Empty>
          </div>
        ) : state === "error" ? (
          <>
            <ItemList>
              <ItemCard inList state="error" errorTitle="Products unavailable" errorText="Check your connection and retry." title="" />
            </ItemList>
            <div>
              <Button variant="secondary">Retry task refresh</Button>
            </div>
          </>
        ) : (
          <ItemList>
            {products.map((p) => (
              <ItemCard
                key={p.title}
                inList
                title={p.title}
                kind={p.kind}
                description={p.description}
                state={state === "loading" ? "loading" : "default"}
                tags={p.risk.map((r) => ({ label: r[0].toUpperCase() + r.slice(1), variant: r }))}
                onClick={() => {}}
              />
            ))}
          </ItemList>
        )}
      </div>
    </div>
  )
}

/** Home screen inside the framed mobile shell. */
export function MobileHome({ state = "populated", hero = true, footerNote = true, active = "Home", onNavigate, screen }: MobileHomeProps) {
  return (
    <ApplicationShell
      variant="mobile"
      title="Hi Lakshmesh"
      initials="LP"
      notificationCount={0}
      workspaces={shellWorkspaces}
      navigation={{ active, onActiveChange: onNavigate }}
      hero={
        hero ? (
          <>
            <div className="flex gap-(--spacing-inline-md) px-(--spacing-group)">
              <div className="flex-1">
                <StatCard tone="inverse" layout="inline" state={state === "loading" ? "loading" : state === "empty" ? "empty" : "default"} metrics={[{ label: "CRN", value: "23" }, { label: "RV", value: "₹250 Cr", trend: "up" }]} />
              </div>
              <div className="flex-1">
                <StatCard tone="inverse" layout="inline" state={state === "loading" ? "loading" : state === "empty" ? "empty" : "default"} metrics={[{ label: "Provisional SOP Score", value: "58.9" }]} />
              </div>
            </div>
            <div className="px-(--spacing-inline-lg) pt-(--spacing-stack-3xs)">
              <Search placeholder="Search by CRN" />
            </div>
          </>
        ) : undefined
      }
      collapsedHeader={
        <>
          {[
            { label: "CRN", value: "23" },
            { label: "RV", value: "₹250 Cr" },
            { label: "SOP", value: "58.9" },
          ].map((m) => (
            <span key={m.label} className="inline-flex items-center gap-(--spacing-stack-2xs) rounded-(--radius-pill) bg-(color:--accent-subtle) px-(--spacing-inline-sm) py-(--spacing-stack-3xs) text-(length:--font-size-xs) text-foreground">
              <span className="text-muted-foreground">{m.label}</span>
              <span className="font-(--typography-label-strong-font-weight)">{m.value}</span>
            </span>
          ))}
        </>
      }
      footerNote={footerNote ? footerNoteText : undefined}
    >
      {screen ?? <HomeContent state={state} />}
    </ApplicationShell>
  )
}
