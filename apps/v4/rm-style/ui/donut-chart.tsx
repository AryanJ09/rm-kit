"use client"

// RM Kit Donut chart: a ring split into parts, with a total in the centre. States:
// populated, loading (skeleton lines) and empty (a grey ring and a line of text). It shares the chart wrapper, the named series
// colours and the accessible summary with the stacked bar chart.
import * as React from "react"
import { Cell, Pie, PieChart } from "recharts"

import { ChartContainer, getChartColor, useTokenPx, type ChartConfig } from "./chart"
import { Skeleton } from "./skeleton"

export type DonutSegment = { key: string; value: number; label?: string; colour?: string }
export type DonutState = "populated" | "loading" | "empty"

// The ring is sized by a size role (the nearest role is --size-160). Ring thickness and the gap between parts
// are chart parameters (a share of the radius and degrees), not lengths.
const DONUT_INNER = "64%"
const DONUT_GAP_ANGLE = 1

export interface DonutChartProps {
  segments: DonutSegment[]
  /** Text in the centre, e.g. { label: "Total", value: "₹11.3 Cr" }. */
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
  const { size } = useTokenPx({ size: "--size-160" })
  const config = React.useMemo<ChartConfig>(
    () =>
      Object.fromEntries(
        segments.map((s, index) => [
          s.key,
          {
            label: s.label ?? s.key,
            color: s.colour ?? getChartColor(index),
          },
        ])
      ),
    [segments]
  )

  if (state === "loading") {
    return (
      <div data-slot="rm-donut" data-state="loading" aria-busy="true" className="flex flex-col gap-(--spacing-inline-md)">
        <Skeleton className="h-(--size-skeleton-line-height) w-(--size-share-full)" />
        <Skeleton className="h-(--size-skeleton-line-height) w-(--size-share-full)" />
        <Skeleton className="h-(--size-skeleton-line-height) w-(--size-skeleton-line-width)" />
      </div>
    )
  }

  if (state === "empty") {
    return (
      <div data-slot="rm-donut" data-state="empty" className="flex flex-col items-center gap-(--spacing-inline-md)">
        <div
          aria-hidden
          className="size-(--size-160) rounded-(--radius-pill) border-(length:--border-width-thick) border-muted"
        />
        <p className="m-0 text-(length:--font-size-xs) text-foreground">{emptyText}</p>
      </div>
    )
  }

  const sum = segments.reduce((a, s) => a + s.value, 0)
  return (
    <div role="group" aria-label={summary} data-slot="rm-donut" data-state="populated" className="flex justify-center">
      <div className="relative size-(--size-160)">
        <ChartContainer config={config} className="aspect-auto size-full" initialDimension={{ width: size, height: size }}>
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
            <span className="text-(length:--font-size-sm) font-(--typography-heading-md-font-weight) text-foreground">{total.value}</span>
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
              <th>{s.label ?? s.key}</th>
              <td>{sum ? `${Math.round((s.value / sum) * 1000) / 10}%` : "0%"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
