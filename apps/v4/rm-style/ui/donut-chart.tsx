"use client"

// RM Kit Donut chart, from Figma "Wealth allocation donut": a ring split into parts, with a total in the centre. States:
// populated, loading (skeleton lines) and empty (a grey ring and a line of text). It shares the chart wrapper, the named series
// colours and the accessible summary with the stacked bar chart.
import * as React from "react"
import { Cell, Pie, PieChart } from "recharts"

import { ChartContainer, getChartColor, type ChartConfig } from "@/rm-style/ui/chart"
import { Skeleton } from "@/rm-style/ui/skeleton"
import { getChartSeriesColor, getChartSeriesColorIndex, getChartSeriesLabel } from "./chart-series"

export type DonutSegment = { key: string; value: number }
export type DonutState = "populated" | "loading" | "empty"

// Chart geometry is in numbers because the chart library needs them (the stacked bar does the same).
const DONUT_SIZE = 180
const DONUT_INNER = "64%"
const DONUT_GAP_ANGLE = 1

export interface DonutChartProps {
  segments: DonutSegment[]
  /** Text in the centre, e.g. { label: "AUM", value: "₹11.3 Cr" }. */
  total?: { label: string; value: string }
  state?: DonutState
  /** Accessible label; a hidden data table is rendered with it. */
  summary: string
  emptyText?: string
}

export function DonutChart({
  segments,
  total,
  state = "populated",
  summary,
  emptyText = "No allocation data available",
}: DonutChartProps) {
  const config = React.useMemo<ChartConfig>(
    () =>
      Object.fromEntries(
        segments.map((s, index) => [
          s.key,
          {
            label: getChartSeriesLabel(s.key),
            color: getChartSeriesColor(s.key, getChartColor(getChartSeriesColorIndex(s.key) ?? index)),
          },
        ])
      ),
    [segments]
  )

  if (state === "loading") {
    return (
      <div data-slot="rm-donut" data-state="loading" aria-busy="true" className="flex flex-col gap-(--spacing-inline-md)">
        <Skeleton className="h-(--size-skeleton-line-height) w-full" />
        <Skeleton className="h-(--size-skeleton-line-height) w-full" />
        <Skeleton className="h-(--size-skeleton-line-height) w-(--size-skeleton-line-width)" />
      </div>
    )
  }

  if (state === "empty") {
    return (
      <div data-slot="rm-donut" data-state="empty" className="flex flex-col items-center gap-(--spacing-inline-md)">
        <div
          aria-hidden
          className="rounded-(--radius-pill) border-(length:--border-width-thick) border-muted"
          style={{ width: DONUT_SIZE, height: DONUT_SIZE }}
        />
        <p className="m-0 text-(length:--font-size-xs) text-card-foreground">{emptyText}</p>
      </div>
    )
  }

  const sum = segments.reduce((a, s) => a + s.value, 0)
  return (
    <div role="group" aria-label={summary} data-slot="rm-donut" data-state="populated" className="flex justify-center">
      <div className="relative" style={{ width: DONUT_SIZE, height: DONUT_SIZE }}>
        <ChartContainer config={config} className="aspect-auto size-full" initialDimension={{ width: DONUT_SIZE, height: DONUT_SIZE }}>
          <PieChart>
            <Pie
              data={segments}
              dataKey="value"
              nameKey="key"
              innerRadius={DONUT_INNER}
              outerRadius="100%"
              startAngle={90}
              endAngle={-270}
              paddingAngle={segments.length > 1 ? DONUT_GAP_ANGLE : 0}
              stroke="none"
              isAnimationActive={false}
            >
              {segments.map((s) => (
                <Cell key={s.key} data-series={s.key} fill={`var(--color-${s.key})`} />
              ))}
            </Pie>
          </PieChart>
        </ChartContainer>
        {total && (
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-(--spacing-stack-xs)">
            <span className="text-(length:--font-size-chart-legend) text-muted-foreground">{total.label}</span>
            <span className="text-(length:--font-size-sm) font-(--typography-heading-md-font-weight) text-card-foreground">{total.value}</span>
          </div>
        )}
      </div>
      <table className="sr-only">
        <caption>{summary}</caption>
        <thead>
          <tr>
            <th>Part</th>
            <th>Share</th>
          </tr>
        </thead>
        <tbody>
          {segments.map((s) => (
            <tr key={s.key}>
              <th>{getChartSeriesLabel(s.key)}</th>
              <td>{sum ? `${Math.round((s.value / sum) * 1000) / 10}%` : "0%"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
