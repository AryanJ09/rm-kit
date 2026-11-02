import React from "react"
import { TrendCard } from "@/rm-style/ui/chart-cards"
import type { StackedBarChartProps, ChartState } from "@/rm-style/ui/stacked-bar-chart"
import { datasets, examples, tabs as tabSpec } from "./chart-data"
import { productSeries } from "../../examples/product-series"

export function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rmchart-panel">
      <h3>{title}</h3>
      <div className="rmchart-frame">{children}</div>
    </section>
  )
}

const stateToCard = { populated: "default", loading: "loading", noData: "empty", error: "error" } as const

// The card title names the metric, never the client: a dataset key is "<metric>.<client>" and only the metric is shown.
const metricLabels: Record<string, string> = {
  rv: "Relationship value",
  deposits: "Deposits",
  investments: "Investments",
  assets: "Assets",
  insurance: "Insurance",
  allocation: "Allocation",
  book: "RM book",
}
const metricTitle = (name: string) => metricLabels[name.split(".")[0]] ?? name

/** A dataset on its own: the chart inside a card (a chart always sits in a card). */
export function DatasetChart({ name, title = metricTitle(name), state = "populated", ...rest }: { name: string; title?: string; state?: ChartState } & Partial<Omit<StackedBarChartProps, "state">>) {
  const d = datasets[name]
  return (
    <TrendCard
      title={title}
      state={stateToCard[state]}
      chart={{
        series: d.series,
        points: d.points,
        unit: d.unit,
        scale: d.scale === "percent" ? "percent" : "absolute",
        showValueLabels: d.scale !== "percent",
        summary: d.summary ?? title,
        seriesMeta: productSeries,
        ...rest,
      }}
    />
  )
}

const tabChoices = Object.entries(tabSpec).map(([id, t]) => ({ id, label: t.label }))
const trend = { positive: "up", negative: "down", neutral: "neutral" } as const

/** The banking portfolio card with its tabs working (used by the chart sandbox). */
export function PortfolioCard() {
  const [tab, setTab] = React.useState("rv")
  const ex = examples.find((e) => e.tab === tab)!
  const d = datasets[ex.chart.replace("datasets.", "")]
  return (
    <TrendCard
      title="Banking Portfolio"
      subtitle={tabSpec[tab as keyof typeof tabSpec].subtitle}
      tabs={tabChoices}
      tab={tab}
      onTabChange={setTab}
      headline={ex.headline}
      growth={(ex.metricStrip ?? []).map((m) => ({ label: m.label, change: m.change, trend: trend[m.trend as keyof typeof trend] }))}
      chart={{ seriesMeta: productSeries, series: d.series, points: d.points, unit: d.unit, summary: d.summary ?? ex.chart }}
      rows={"breakdown" in ex ? ex.breakdown : undefined}
      footnote={"footnote" in ex ? ex.footnote : undefined}
    />
  )
}
