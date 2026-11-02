"use client"

// RM Kit chart cards: a tabbed trend card and an allocation card. A chart always sits in a card, so these are
// card archetypes (see cards.tsx and the card catalog), fed with data:
//   TrendCard       how a total changed over time (history, growth, performance): a stacked-bar chart with a headline, a growth
//                   strip and breakdown rows. Tab and part are data, never variants.
//   AllocationCard  how a total is split right now (mix, share, composition): a donut with its legend, and per part the holding
//                   numbers and products.
// They share the card states (default, loading, empty, error) and the choice chips with every other archetype.
import * as React from "react"
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react"
import { cn } from "cn"

import { Button } from "./button"
import { Card, CardBody, CardDescription, CardHeader, CardKeyValue, CardTitle, CardTitleGroup } from "./card"
import { SummaryCard, type CardState } from "./cards"
import { Chip } from "./chip/chip"
import { DonutChart, type DonutSegment } from "./donut-chart"
import { Separator } from "./separator"
import { StackedBarChart, type ChartState, type StackedBarChartProps } from "./stacked-bar-chart"
import { Switch } from "./switch"
import { Tabs, TabsList, TabsTrigger } from "./tabs"

const trendText = {
  up: "text-(color:--category-success-text)",
  down: "text-(color:--category-aggressive-text)",
  neutral: "text-muted-foreground",
}
type Trend = keyof typeof trendText

type Choice = { id: string; label: string }

/** Choice chips: one is on. They wrap when the card is narrow. */
function Choices({ items, value, onChange, label }: { items: Choice[]; value: string; onChange: (id: string) => void; label: string }) {
  return (
    <div role="group" aria-label={label} className="flex flex-wrap gap-(--spacing-stack-2xs)">
      {items.map((c) => (
        <Chip key={c.id} pressed={c.id === value} onPressedChange={() => onChange(c.id)}>
          {c.label}
        </Chip>
      ))}
    </div>
  )
}

/** A choice set that works on its own (uncontrolled) or from a parent. */
function useChoice(items: Choice[], value?: string, onChange?: (id: string) => void) {
  const [inner, setInner] = React.useState(items[0]?.id ?? "")
  const current = value ?? inner
  return [
    current,
    (id: string) => {
      if (value === undefined) setInner(id)
      onChange?.(id)
    },
  ] as const
}

/* TrendCard */

export type GrowthMetric = { label: string; change: string; trend: Trend }

export type TrendCardProps = {
  title: string
  subtitle?: string
  /** Choice chips under the title, e.g. one per metric. The parent supplies the matching chart and numbers. */
  tabs?: Choice[]
  tab?: string
  onTabChange?: (id: string) => void
  /** The current value: label and figure, shown above the growth strip. */
  headline?: { label: string; value: string }
  /** Three growth numbers (YoY, YTD, MoM), each with a trend. */
  growth?: GrowthMetric[]
  chart: Omit<StackedBarChartProps, "state" | "onRetry">
  /** Rows under the chart (e.g. "Current   1 account · ₹16 L"). */
  rows?: { label: string; value: string }[]
  footnote?: string
  state?: CardState
  onRetry?: () => void
}

const chartState: Record<CardState, ChartState> = { default: "populated", loading: "loading", empty: "noData", error: "error" }

function TrendCard({
  title,
  subtitle,
  tabs,
  tab,
  onTabChange,
  headline,
  growth,
  chart,
  rows,
  footnote,
  state = "default",
  onRetry,
}: TrendCardProps) {
  const [current, change] = useChoice(tabs ?? [], tab, onTabChange)
  return (
    <Card>
      <CardHeader>
        <CardTitleGroup>
          <CardTitle className="text-(length:--font-size-base)">{title}</CardTitle>
          {subtitle && <CardDescription>{subtitle}</CardDescription>}
        </CardTitleGroup>
      </CardHeader>
      {tabs && tabs.length > 0 && <Choices items={tabs} value={current} onChange={change} label={`${title} view`} />}
      <CardBody>
        {headline && (
          <CardKeyValue label={headline.label}>
            <strong className="font-(--typography-label-strong-font-weight)">{headline.value}</strong>
          </CardKeyValue>
        )}
        {growth && growth.length > 0 && (
          <div className="grid grid-flow-col auto-cols-fr gap-(--spacing-inline-md)">
            {growth.map((g) => (
              <div key={g.label} className="flex min-w-0 flex-col gap-(--spacing-stack-xs)">
                <span className="text-(length:--font-size-xs) text-muted-foreground">{g.label}</span>
                <span className={cn("flex items-center gap-(--spacing-stack-3xs) text-(length:--font-size-sm) font-(--typography-heading-md-font-weight)", trendText[g.trend])}>
                  {g.change.replace(/^\+/, "")}
                  {g.trend === "up" && <ArrowUpIcon aria-label="up" className="size-(--size-icon-xs)" />}
                  {g.trend === "down" && <ArrowDownIcon aria-label="down" className="size-(--size-icon-xs)" />}
                </span>
              </div>
            ))}
          </div>
        )}
        <StackedBarChart {...chart} state={chartState[state]} onRetry={onRetry} />
        {rows && rows.length > 0 && state === "default" && (
          <>
            <Separator />
            {rows.map((r) => (
              <CardKeyValue key={r.label} label={r.label}>
                {r.value}
              </CardKeyValue>
            ))}
          </>
        )}
        {footnote && <CardDescription>{footnote}</CardDescription>}
      </CardBody>
    </Card>
  )
}

/* AllocationCard */

export type AllocationProduct = { label: string; value: string; change: string; trend: Trend; holdings: string }

export type AllocationPart = {
  id: string
  label: string
  /** Colour of the part in the donut and the legend, e.g. "var(--chart-1)". */
  colour?: string
  /** Share of the whole, 0 to 100. */
  share: number
  /** Display value, e.g. "₹6.85 M". */
  value: string
  cost?: string
  returns?: string
  benchmark?: string
  products?: AllocationProduct[]
}

export type AllocationCardProps = {
  title: string
  /** Family or Individual: the scope of the numbers. Omit when there is no scope. */
  scope?: { options: Choice[]; value?: string; onChange?: (id: string) => void }
  /** The centre of the donut, e.g. { label: "Total", value: "₹11.3 Cr" }. */
  total: { label: string; value: string }
  parts: AllocationPart[]
  /** Which view is on: "summary" or a part id. */
  tab?: string
  onTabChange?: (id: string) => void
  /** Text for the empty state. */
  emptyText?: string
  /** Show the part chips (Summary, each part). Off for a donut on its own. */
  chips?: boolean
  /** Labels for the figures and the products list. Defaults are neutral; a product sets its own words. */
  labels?: Partial<AllocationLabels>
  state?: CardState
}

const defaultAllocationLabels = {
  value: "Value",
  share: "Share",
  cost: "Cost",
  returns: "Returns",
  benchmark: "Benchmark",
  items: "Items",
}
export type AllocationLabels = typeof defaultAllocationLabels

const dash = "—"

function LegendRow({ part }: { part: AllocationPart }) {
  return (
    <div className="flex items-center gap-(--spacing-inline-sm) text-(length:--font-size-xs)">
      <span className="flex min-w-0 items-center gap-(--spacing-stack-2xs)">
        <span aria-hidden className="size-(--size-icon-xs) shrink-0" style={{ background: part.colour ?? "var(--chart-1)" }} />
        <span className="truncate text-(length:--font-size-chart-legend) text-muted-foreground">{part.label}</span>
      </span>
      <span className="flex shrink-0 items-center gap-(--spacing-inline-sm)">
        <span className="font-(--typography-label-strong-font-weight) text-foreground">{part.value}</span>
        <span className="text-muted-foreground">{part.share}%</span>
      </span>
    </div>
  )
}

function Stat({ label, value }: { label: string; value?: string }) {
  return (
    <div className="flex min-w-0 flex-1 flex-col gap-(--spacing-stack-3xs)">
      <span className="text-(length:--font-size-xs) text-muted-foreground">{label}</span>
      <span className="text-(length:--font-size-sm) font-(--typography-label-md-font-weight) text-foreground">{value ?? dash}</span>
    </div>
  )
}

function AllocationCard({ title, scope, total, parts, tab, onTabChange, emptyText, state = "default", chips = true, labels }: AllocationCardProps) {
  const L = { ...defaultAllocationLabels, ...labels }
  const tabs: Choice[] = [{ id: "summary", label: "Summary" }, ...parts.map((p) => ({ id: p.id, label: p.label }))]
  const [current, change] = useChoice(tabs, tab, onTabChange)
  const [scopeValue, setScope] = useChoice(scope?.options ?? [], scope?.value, scope?.onChange)
  const part = parts.find((p) => p.id === current)
  const empty = state === "empty"
  const segments: DonutSegment[] = parts.map((p) => ({ key: p.id, value: p.share, label: p.label, colour: p.colour }))
  return (
    <Card>
      <CardHeader>
        <CardTitleGroup>
          <CardTitle className="text-(length:--font-size-base)">{title}</CardTitle>
        </CardTitleGroup>
      </CardHeader>
      {scope && scope.options.length === 2 && (
        // Two scope options are a labelled switch; more are tabs.
        <Switch
          startLabel={scope.options[0].label}
          endLabel={scope.options[1].label}
          checked={scopeValue === scope.options[1].id}
          onCheckedChange={(on) => setScope(scope.options[on ? 1 : 0].id)}
        />
      )}
      {scope && scope.options.length !== 2 && (
        <Tabs value={scopeValue} onValueChange={(v) => setScope(String(v))}>
          <TabsList variant="secondary" className="w-(--size-share-full)">
            {scope.options.map((o) => (
              <TabsTrigger key={o.id} value={o.id} className="flex-1">
                {o.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      )}
      {chips && <Choices items={tabs} value={current} onChange={change} label={`${title} view`} />}
      <CardBody loading={state === "loading"}>
        {!part ? (
          <>
            <DonutChart
              segments={segments}
              total={total}
              state={empty ? "empty" : "populated"}
              summary={`${title}: ${parts.map((p) => `${p.label} ${p.share}%`).join(", ")}`}
              emptyText={emptyText}
            />
            {!empty && (
              <div className="flex flex-col gap-(--spacing-stack-sm)">
                {parts.map((p) => (
                  <LegendRow key={p.id} part={p} />
                ))}
              </div>
            )}
          </>
        ) : (
          <>
            <div className="flex gap-(--spacing-inline-md)">
              <Stat label={L.value} value={empty ? undefined : part.value} />
              <Stat label={L.share} value={empty ? undefined : `${part.share}%`} />
            </div>
            <div className="flex gap-(--spacing-inline-md)">
              <Stat label={L.cost} value={empty ? undefined : part.cost} />
              <Stat label={L.returns} value={empty ? undefined : part.returns} />
              <Stat label={L.benchmark} value={empty ? undefined : part.benchmark} />
            </div>
            <Separator />
            <div className="flex flex-col gap-(--spacing-inline-md)">
              <span className="text-(length:--font-size-sm) font-(--typography-label-md-font-weight) text-foreground">{L.items}</span>
              {(empty ? [] : part.products ?? []).map((p) => (
                <SummaryCard
                  key={p.label}
                  items={[{ label: p.label, value: p.value }]}
                  note={<span className={trendText[p.trend]}>{`${p.change} · ${p.holdings}`}</span>}
                />
              ))}
            </div>
          </>
        )}
      </CardBody>
    </Card>
  )
}

export { TrendCard, AllocationCard }
