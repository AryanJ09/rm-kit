import { productSeries } from "../examples/product-series"
// Pattern example, not a component: the RM Portfolio screen of the mobile application shell, from the prototype (RM Portfolio).
// Assembled only from kit components: ApplicationShell (inside page header), SummaryCard (profile, revenue; children host the
// tier bars), TrendCard (composition over time, no value labels), AllocationCard (donut on its own, no chips).
import * as React from "react"

import { ApplicationShell } from "@/rm-style/ui/application-shell"
import type { Destination } from "@/rm-style/ui/application-shell/bottom-navigation"
import { AllocationCard, TrendCard } from "@/rm-style/ui/chart-cards"
import { SummaryCard } from "@/rm-style/ui/cards"
import { Progress } from "@/rm-style/ui/progress"
import { datasets } from "../RM Kit/Chart/chart-data"
import { footerNoteText, shellWorkspaces } from "./mobile-home"

const tiers = [
  { label: "Platinum+", count: 12 },
  { label: "Platinum", count: 24 },
  { label: "Gold", count: 18 },
  { label: "Silver", count: 8 },
]

const allocation = [
  { id: "fixed-income", label: "Fixed income", colour: productSeries.fixedIncomeAllocation?.colour, share: 51.6, value: "₹5,680 L", cost: "", returns: "", benchmark: "", products: [] },
  { id: "equity", label: "Equity", colour: productSeries.equityAllocation?.colour, share: 29.5, value: "₹3,240 L", cost: "", returns: "", benchmark: "", products: [] },
  { id: "alt-inv", label: "Alt Inv", colour: productSeries.altFixedIncome?.colour, share: 7.6, value: "₹840 L", cost: "", returns: "", benchmark: "", products: [] },
  { id: "cash", label: "Cash", colour: productSeries.cash?.colour, share: 11.3, value: "₹1,240 L", cost: "", returns: "", benchmark: "", products: [] },
]

export type MobileRmPortfolioProps = {
  footerNote?: boolean
  active?: Destination
  onNavigate?: (destination: Destination) => void
}

/** RM Portfolio inside the framed mobile shell. */
export function MobileRmPortfolio({ footerNote = true, active = "Home", onNavigate }: MobileRmPortfolioProps) {
  const book = datasets["book.rm"]
  const max = Math.max(...tiers.map((t) => t.count))
  return (
    <ApplicationShell
      variant="mobile"
      title="RM Portfolio"
      initials="LP"
      workspaces={shellWorkspaces}
      navigation={{ active, onActiveChange: onNavigate }}
      pageHeader={{ context: "inside", title: "RM Portfolio", onBack: () => {}, time: "12:30" }}
      footerNote={footerNote ? footerNoteText : undefined}
    >
      <div className="flex min-h-(--size-share-full) flex-col gap-(--spacing-stack-md) bg-surface-hover p-(--spacing-inline-lg)">
        <SummaryCard
          subtitle="Relationship Manager"
          title="Lakshmesh Prabhu"
          items={[
            { label: "Total CRNs", value: "23" },
            { label: "Total AUM", value: "₹24000 L" },
          ]}
        />
        <TrendCard
          title="Portfolio composition trend"
          chart={{ seriesMeta: productSeries, series: book.series, points: book.points, unit: book.unit, summary: book.summary ?? "Portfolio composition trend", showValueLabels: false }}
        />
        <AllocationCard
          title="Asset allocation"
          total={{ label: "", value: "₹12K L" }}
          parts={allocation}
          chips={false}
        />
        <SummaryCard title="Client distribution by tier">
          <div className="flex flex-col gap-(--spacing-stack-sm)">
            {tiers.map((t) => (
              <div key={t.label} className="flex items-center gap-(--spacing-inline-sm) text-(length:--font-size-xs)">
                <span className="w-(--size-72) shrink-0 text-muted-foreground">{t.label}</span>
                <Progress value={(t.count / max) * 100} className="min-w-0 flex-1" />
                <span className="w-(--size-icon-xl) shrink-0 text-right font-(--typography-label-strong-font-weight)">{t.count}</span>
              </div>
            ))}
          </div>
        </SummaryCard>
        <SummaryCard
          title="Revenue & growth"
          items={[
            { label: "Annuity revenue", value: "₹420 L (65%)" },
            { label: "Transactional revenue", value: "₹225 L (35%)" },
            { label: "QoQ change", value: "+2.3%", trend: "up" },
            { label: "YTD new clients", value: "12" },
          ]}
        />
      </div>
    </ApplicationShell>
  )
}
