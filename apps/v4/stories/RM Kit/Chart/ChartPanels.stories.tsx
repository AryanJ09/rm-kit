// Hand-written from Figma "Client banking portfolio", "Wealth allocation donut" and "Wealth portfolio". Not generated.
// The two chart cards (rm-style/ui/chart-cards.tsx): TrendCard and AllocationCard. Data is generic; layout is fixed in the cards.
import * as React from "react"
import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { AllocationCard, TrendCard, type AllocationPart, type GrowthMetric } from "@/rm-style/ui/chart-cards"
import type { CardState } from "@/rm-style/ui/cards"
import { datasets, examples, tabs as tabSpec } from "./chart-data"

const meta = {
  title: "RM Kit/Chart/Panels",
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
} satisfies Meta

export default meta
type Story = StoryObj

const states: CardState[] = ["default", "loading", "empty", "error"]
const tabChoices = Object.entries(tabSpec).map(([id, t]) => ({ id, label: t.label }))
const trendMap = { positive: "up", negative: "down", neutral: "neutral" } as const

// One TrendCard from the sample data: the tab and the client pick the numbers and the chart.
function trendFor(tab: string, client: string) {
  const ex = examples.find((e) => e.tab === tab && e.chart.endsWith(client)) ?? examples.find((e) => e.tab === tab)!
  const d = datasets[ex.chart.replace("datasets.", "")]
  return {
    title: "Banking Portfolio",
    subtitle: tabSpec[tab as keyof typeof tabSpec].subtitle,
    tabs: tabChoices,
    headline: ex.headline,
    growth: (ex.metricStrip ?? []).map((m) => ({ label: m.label, change: m.change, trend: trendMap[m.trend as keyof typeof trendMap] })) as GrowthMetric[],
    chart: { series: d.series, points: d.points, unit: d.unit, summary: d.summary ?? ex.chart },
    rows: "breakdown" in ex ? ex.breakdown : undefined,
    footnote: "footnote" in ex ? ex.footnote : undefined,
  }
}

const parts: AllocationPart[] = [
  {
    id: "equity", label: "Equity", series: "equityAllocation", share: 60.6, value: "₹6.85 Cr",
    cost: "₹5.2 Cr", returns: "+18.4%", benchmark: "+14.1%",
    products: [
      { label: "Direct equity", value: "₹5.54 Cr", change: "+₹2.75 L (+20.79%)", trend: "up", holdings: "2 holdings" },
      { label: "Mutual funds & ETFs", value: "₹1.27 Cr", change: "+₹42 K (+5.25%)", trend: "up", holdings: "1 holding" },
    ],
  },
  {
    id: "fixed-income", label: "Fixed income", series: "fixedIncomeAllocation", share: 39.4, value: "₹4.45 Cr",
    cost: "₹4.5 Cr", returns: "-0.6%", benchmark: "+5.9%",
    products: [{ label: "Bonds, Debentures & other fixed income", value: "₹2.69 Cr", change: "-₹25 K", trend: "down", holdings: "1 holding" }],
  },
]
const wealth = {
  title: "Wealth Portfolio",
  scope: { options: [{ id: "family", label: "Family" }, { id: "individual", label: "Individual" }] },
  total: { label: "AUM", value: "₹11.3 Cr" },
  parts,
}

const column = "flex w-(--size-layout-frame-width) flex-col gap-(--spacing-inline-md)"
const canvas = "flex flex-wrap items-start gap-(--spacing-stack-lg) bg-muted p-(--spacing-stack-lg)"

function Labelled({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <section className={column}>
      <h3 className="text-(length:--font-size-sm) font-(--typography-title-sm-font-weight) text-foreground capitalize">{label}</h3>
      {children}
    </section>
  )
}

/** Banking portfolio: pick a tab and a client; the chart, headline, growth strip and rows follow. */
export const Trend: StoryObj<{ tab: string; client: "rajesh" | "jayanti"; state: CardState }> = {
  args: { tab: "deposits", client: "rajesh", state: "default" },
  argTypes: {
    tab: { control: "select", options: tabChoices.map((t) => t.id) },
    client: { control: "inline-radio", options: ["rajesh", "jayanti"], description: "Data only. Jayanti has the RV data." },
    state: { control: "inline-radio", options: states },
  },
  render: ({ tab, client, state }) => {
    const [current, setCurrent] = React.useState(tab)
    React.useEffect(() => setCurrent(tab), [tab])
    return (
      <div className={canvas}>
        <div className={column}>
          <TrendCard {...trendFor(current, client === "jayanti" ? "jayanti" : "rajesh")} tab={current} onTabChange={setCurrent} state={state} onRetry={() => {}} />
        </div>
      </div>
    )
  },
}

export const TrendAllStates: Story = {
  name: "Trend: all states",
  render: () => (
    <div className={canvas}>
      {states.map((s) => (
        <Labelled key={s} label={s}>
          <TrendCard {...trendFor("rv", "rajesh")} state={s} onRetry={() => {}} />
        </Labelled>
      ))}
    </div>
  ),
}

export const TrendTabs: Story = {
  name: "Trend: every tab",
  render: () => (
    <div className={canvas}>
      {tabChoices.map((t) => (
        <Labelled key={t.id} label={t.label}>
          <TrendCard {...trendFor(t.id, "rajesh")} tab={t.id} />
        </Labelled>
      ))}
    </div>
  ),
}

/** Wealth portfolio: Summary shows the donut; a part shows the holding numbers and its products. */
export const Allocation: StoryObj<{ tab: string; state: CardState }> = {
  args: { tab: "summary", state: "default" },
  argTypes: {
    tab: { control: "select", options: ["summary", ...parts.map((p) => p.id)] },
    state: { control: "inline-radio", options: ["default", "loading", "empty"] },
  },
  render: ({ tab, state }) => {
    const [current, setCurrent] = React.useState(tab)
    React.useEffect(() => setCurrent(tab), [tab])
    return (
      <div className={canvas}>
        <div className={column}>
          <AllocationCard {...wealth} tab={current} onTabChange={setCurrent} state={state} />
        </div>
      </div>
    )
  },
}

export const AllocationAllStates: Story = {
  name: "Allocation: all states",
  render: () => (
    <div className={canvas}>
      {(["default", "loading", "empty"] as const).map((s) => (
        <Labelled key={s} label={s}>
          <AllocationCard {...wealth} state={s} />
        </Labelled>
      ))}
    </div>
  ),
}

export const AllocationViews: Story = {
  name: "Allocation: every view",
  render: () => (
    <div className={canvas}>
      {["summary", ...parts.map((p) => p.id)].map((v) => (
        <Labelled key={v} label={v.replace("-", " ")}>
          <AllocationCard {...wealth} tab={v} />
        </Labelled>
      ))}
    </div>
  ),
}
