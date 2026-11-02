import * as React from "react"
import { Bar, BarChart, LabelList, XAxis, YAxis } from "recharts"
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  getChartColor,
  type ChartConfig,
} from "@/rm-style/ui/chart"
import { Button } from "@/rm-style/ui/button"
import { Skeleton } from "@/rm-style/ui/skeleton"
import { getChartSeriesColor, getChartSeriesColorIndex, getChartSeriesLabel } from "./chart-series"
import "./stacked-bar-chart.css"

export type Point = {
  period: string
  totalLabel: string
  values: Record<string, number>
}

export type ChartState = "populated" | "loading" | "noData" | "error"
export type ChartScale = "absolute" | "percent"

// tokens.chart.* from the spec (plotHeight 140, barRadius 4, labelGap 6, legendGap 8)
const PLOT_HEIGHT = 140
const VALUE_LABEL_ROOM = 14
const AXIS_ROOM = 22
const BAR_RADIUS = 4
const LEGEND_PAD = 8
const DEFAULT_CHART_WIDTH = 366

export interface StackedBarChartProps {
  type?: "stackedBar"
  scale?: ChartScale
  state?: ChartState
  series: string[]
  points: Point[]
  unit: string
  showValueLabels?: boolean
  showLegend?: boolean
  summary: string
  width?: number
  onRetry?: () => void
}

// Rounds the outer corners of the whole stack: bottom of the lowest segment, top of the highest.
function Segment(props: {
  x?: number
  y?: number
  width?: number
  height?: number
  fill?: string
  payload?: Record<string, number>
  dataKey?: string
  isBottom?: boolean
  isTop?: boolean
}) {
  const { x = 0, y = 0, width = 0, height = 0, fill, dataKey, isBottom, isTop } = props
  if (!dataKey || height <= 0) return null
  const r = Math.min(BAR_RADIUS, height / 2, width / 2)
  const tl = isTop ? r : 0
  const bl = isBottom ? r : 0
  const d = `M${x},${y + tl} Q${x},${y} ${x + tl},${y} L${x + width - tl},${y} Q${x + width},${y} ${x + width},${y + tl} L${x + width},${y + height - bl} Q${x + width},${y + height} ${x + width - bl},${y + height} L${x + bl},${y + height} Q${x},${y + height} ${x},${y + height - bl} Z`
  // 1px surface gap between segments
  return <path data-series={dataKey} d={d} fill={fill} stroke="var(--background)" strokeWidth={1} />
}

export function StackedBarChart({
  scale = "absolute",
  state = "populated",
  series,
  points,
  unit,
  showValueLabels = true,
  showLegend = true,
  summary,
  width = DEFAULT_CHART_WIDTH,
  onRetry,
}: StackedBarChartProps) {
  const config = React.useMemo<ChartConfig>(
    () => {
      const entries = series.map((key, index) => {
        const fallbackIndex = getChartSeriesColorIndex(key) ?? index
        return [key, { label: getChartSeriesLabel(key), color: getChartSeriesColor(key, getChartColor(fallbackIndex)) }]
      })
      return Object.fromEntries(entries)
    },
    [series]
  )

  const percent = scale === "percent"
  const labelsOn = showValueLabels && !percent
  const populated = state === "populated"
  const legendOn = showLegend && state !== "error"
  const rows = React.useMemo(
    () =>
      points.map((p) => {
        const sum = series.reduce((a, k) => a + (p.values[k] ?? 0), 0)
        const present = series.filter((k) => (p.values[k] ?? 0) > 0)
        const values = Object.fromEntries(
          series.map((k) => [k, percent && sum ? ((p.values[k] ?? 0) / sum) * 100 : (p.values[k] ?? 0)])
        )
        return {
          period: p.period,
          totalLabel: p.totalLabel,
          ...values,
          __total: 0.0001,
          __sum: percent ? 100 : sum,
          __bottom: present[0],
          __top: present[present.length - 1],
        }
      }),
    [points, series, percent]
  )
  const max = React.useMemo(() => Math.max(...rows.map((r) => r.__sum), 1), [rows])
  const [legendHeight, setLegendHeight] = React.useState(LEGEND_PAD)
  const legendContent = React.useMemo(() => {
    if (!legendOn) return null
    return (
      <div ref={(element) => {
        if (!element) return
        const measure = () => setLegendHeight(element.getBoundingClientRect().height)
        const observer = new ResizeObserver(measure)
        observer.observe(element)
        measure()
        return () => observer.disconnect()
      }}>
        <ChartLegendContent
          className="flex-wrap justify-start gap-x-(--spacing-inline-xs) gap-y-(--spacing-stack-3xs) pt-(--spacing-inline-xs) text-[length:var(--font-size-chart-legend)] text-text-secondary [&>div>div]:size-(--size-icon-3xs) [&>div>div]:rounded-none"
        />
      </div>
    )
  }, [legendOn, series])

  const plotRoom = VALUE_LABEL_ROOM + PLOT_HEIGHT + AXIS_ROOM
  const legendH = legendHeight || LEGEND_PAD

  // Loading is compact, as in Figma: three skeleton lines and the legend, with no empty plot area.
  if (state === "loading") {
    return (
      <div role="group" aria-label={summary} aria-busy="true" data-slot="rm-chart" data-state="loading" data-scale={scale} className="flex flex-col gap-(--spacing-inline-md)">
        <div className="flex flex-col gap-(--spacing-inline-md)">
          <Skeleton className="h-(--size-skeleton-line-height) w-full" />
          <Skeleton className="h-(--size-skeleton-line-height) w-full" />
          <Skeleton className="h-(--size-skeleton-line-height) w-(--size-skeleton-line-width)" />
        </div>
        {showLegend && (
          <div className="flex flex-wrap gap-x-(--spacing-inline-xs) gap-y-(--spacing-stack-3xs) text-(length:--font-size-chart-legend) text-text-secondary">
            {series.map((k) => (
              <span key={k} className="flex items-center gap-(--spacing-stack-2xs)">
                <span aria-hidden className="size-(--size-icon-3xs)" style={{ background: getChartSeriesColor(k, getChartColor(getChartSeriesColorIndex(k) ?? 0)) }} />
                {getChartSeriesLabel(k)}
              </span>
            ))}
          </div>
        )}
      </div>
    )
  }

  return (
    <div role="group" aria-label={summary} data-slot="rm-chart" data-state={state} data-scale={scale}>
      <div className="rmchart-chart-area">
        <ChartContainer
          config={config}
          className="aspect-auto w-full justify-start"
          style={{ height: plotRoom + legendH }}
          initialDimension={{ width, height: plotRoom + legendH }}
        >
          <BarChart
            data={populated ? rows : []}
            margin={{ top: VALUE_LABEL_ROOM, right: 0, bottom: 0, left: 0 }}
            barCategoryGap={8}
          >
            <XAxis
              dataKey="period"
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: "var(--font-size-chart-axis)", fill: "var(--text-secondary)" }}
              tickMargin={1.5}
              hide={!populated}
            />
            <YAxis hide domain={[0, max]} />
            {series.map((k) => (
              <Bar
                key={k}
                dataKey={k}
                stackId="s"
                fill={`var(--color-${k})`}
                isAnimationActive={false}
                shape={(p: unknown) => {
                  const props = p as { payload?: { __bottom?: string; __top?: string } }
                  return (
                    <Segment
                      {...(p as object)}
                      dataKey={k}
                      isBottom={props.payload?.__bottom === k}
                      isTop={props.payload?.__top === k}
                    />
                  )
                }}
              />
            ))}
            <Bar dataKey="__total" stackId="s" fill="transparent" legendType="none" isAnimationActive={false}>
              {labelsOn && (
                <LabelList
                  dataKey="totalLabel"
                  content={(p: { x?: number | string; y?: number | string; width?: number | string; value?: unknown }) => (
                    <text
                      x={Number(p.x ?? 0) + Number(p.width ?? 0) / 2}
                      y={Number(p.y ?? 0) - 3}
                      textAnchor="middle"
                      fontSize="var(--font-size-chart-axis)"
                      fill="var(--text-secondary)"
                    >
                      {String(p.value)}
                    </text>
                  )}
                />
              )}
            </Bar>
            {legendOn && (
              <ChartLegend
                verticalAlign="bottom"
                itemSorter={null}
                height={legendH}
                content={legendContent ?? undefined}
              />
            )}
          </BarChart>
        </ChartContainer>

        {state === "noData" && (
          <div className="rmchart-chart-overlay" style={{ height: plotRoom }}>
            <p className="rmchart-empty-text m-0">No historical data available</p>
            <div className="rmchart-baseline" style={{ marginBottom: AXIS_ROOM }} />
          </div>
        )}
        {state === "error" && (
          <div className="rmchart-chart-overlay" style={{ height: plotRoom }} role="alert">
            <p className="rmchart-empty-text m-0 text-error!">Couldn’t load chart.</p>
            {onRetry && (
              <div>
                <Button variant="ghost" size="sm" onClick={onRetry}>
                  Retry
                </Button>
              </div>
            )}
          </div>
        )}
      </div>

      {populated && (
        <table className="sr-only">
          <caption>{summary}</caption>
          <thead>
            <tr>
              <th>Period</th>
              {series.map((k) => (
                <th key={k}>{getChartSeriesLabel(k)}</th>
              ))}
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {points.map((p) => (
              <tr key={p.period}>
                <th>{p.period}</th>
                {series.map((k) => (
                  <td key={k}>
                    {(p.values[k] ?? 0)}
                    {percent ? "%" : ` ${unit}`}
                  </td>
                ))}
                <td>{p.totalLabel}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
