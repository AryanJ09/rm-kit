// Pattern example, not a component: the Home screen of the mobile application shell, from Figma "Homepage example".
// It is assembled only from kit components (ApplicationShell with its hero and footerNote slots, StatCard, TaskCard, ItemCard,
// SectionHeader, Alert, Empty). Sample text follows the Figma example; names are generic.
import * as React from "react"
import { ArrowLeftRightIcon, CakeIcon, CalendarDaysIcon, ClipboardListIcon, HouseIcon, ShieldCheckIcon } from "lucide-react"

import { Alert, AlertDescription, AlertTitle } from "@/rm-style/ui/alert"
import { ApplicationShell, type ShellWorkspace } from "@/rm-style/ui/application-shell"
import type { Destination } from "@/rm-style/ui/application-shell/bottom-navigation"
import { Button } from "@/rm-style/ui/button"
import { ItemCard, ItemList, StatCard, TaskCard, type CardState } from "@/rm-style/ui/cards"
import { Empty, EmptyDescription, EmptyHeader, EmptyTitle } from "@/rm-style/ui/empty"
import { Search } from "@/rm-style/ui/search"
import { SectionHeader } from "@/rm-style/ui/section-header"

export type HomeState = "populated" | "loading" | "empty" | "error"

const workspaces: ShellWorkspace[] = [
  {
    id: "main",
    label: "Main",
    items: [
      { id: "home", label: "Home", icon: HouseIcon },
      { id: "tasks", label: "Tasks", icon: ClipboardListIcon },
    ],
  },
]

const tasks = [
  { count: 4, icon: CalendarDaysIcon, title: "Maturities Due", text: "Renewals and Maturities in next 45 days" },
  { count: 9, icon: ShieldCheckIcon, title: "Re-KYC due", text: "Meet regulatory requirement" },
  { count: 2, icon: CakeIcon, title: "Birthdays today", text: "Wish and build stronger relationship" },
  { count: 6, icon: ArrowLeftRightIcon, title: "Large debits/credits", text: "Cross-sell or prevent attrition" },
]

const products = [
  { eyebrow: "Alternate Equity Income", title: "3P India Equity Fund-1", meta: "AIF" },
  { eyebrow: "Alternate Equity Income", title: "ICICI Prudential Contra", meta: "PMS" },
  { eyebrow: "Alternate Equity Income", title: "Kotak India Focus Portfolio Investment Advisory", meta: "PMS" },
  { eyebrow: "Alternate Equity Income", title: "Axis Growth Opportunities", meta: "AIF" },
]
const riskTags = [
  { label: "Conservative", variant: "conservative" },
  { label: "Moderate", variant: "moderate" },
  { label: "Growth", variant: "growth" },
  { label: "Aggressive", variant: "aggressive" },
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
    <div className="flex min-h-full flex-col gap-(--spacing-stack-lg) bg-surface-hover px-(--spacing-inline-md) pt-(--spacing-inline-lg) pb-(--spacing-stack-lg)">
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
        <SectionHeader title="Focussed Products" />
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
            {products.map((p, i) => (
              <ItemCard
                key={p.title}
                inList
                {...p}
                state={state === "loading" ? "loading" : "default"}
                tags={i === 0 || i === 1 ? [...riskTags] : undefined}
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
      workspaces={workspaces}
      navigation={{ active, onActiveChange: onNavigate }}
      hero={
        hero ? (
          <>
            <div className="flex gap-(--spacing-inline-md) px-(--spacing-group)">
              <div className="flex-1">
                <StatCard tone="inverse" layout="inline" state={state === "loading" ? "loading" : state === "empty" ? "empty" : "default"} metrics={[{ label: "Families", value: "20" }, { label: "CRNs", value: "23" }]} />
              </div>
              <div className="flex-1">
                <StatCard tone="inverse" layout="inline" state={state === "loading" ? "loading" : state === "empty" ? "empty" : "default"} metrics={[{ label: "AUM", value: "₹9.2 Cr", trend: "up", change: "+3.3%" }]} />
              </div>
            </div>
            <div className="px-(--spacing-inline-lg) pt-(--spacing-stack-3xs)">
              <Search placeholder="Search name, CRN" />
            </div>
          </>
        ) : undefined
      }
      footerNote={footerNote ? "Powered by Brand • v0.2.0 • 08 Oct 2026" : undefined}
    >
      {screen ?? <HomeContent state={state} />}
    </ApplicationShell>
  )
}
