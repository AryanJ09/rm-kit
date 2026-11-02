"use client"

import * as React from "react"
import { cn } from "cn"
import * as RechartsPrimitive from "recharts"
import type { TooltipValueType } from "recharts"

// Format: { THEME_NAME: CSS_SELECTOR }
const THEMES = { light: "", dark: ".dark" } as const

const INITIAL_DIMENSION = { width: 320, height: 200 } as const
type TooltipNameType = number | string

export type ChartConfig = Record<
  string,
  {
    label?: React.ReactNode
    icon?: React.ComponentType
  } & (
    | { color?: string; theme?: never }
    | { color?: never; theme: Record<keyof typeof THEMES, string> }
  )
>

type ChartContextProps = {
  config: ChartConfig
  activeKey: string | null
}

const CHART_SERIES_COUNT = 10

// Positional fallback: the chart palette by index, for a series with no colour of its own.
/**
 * Resolves semantic size roles to pixels. The chart library needs numbers for its geometry, so they are read from the tokens
 * (measured through a probe element) instead of being typed in. Server render gives 0 until the client measures.
 */
function measureTokens<T extends Record<string, string>>(roles: T): Record<keyof T, number> {
  const out = {} as Record<keyof T, number>
  for (const key of Object.keys(roles) as (keyof T)[]) {
    if (typeof document === "undefined") {
      out[key] = 0
      continue
    }
    const probe = document.createElement("div")
    probe.style.cssText = `position:absolute;visibility:hidden;width:var(${roles[key]})`
    document.body.appendChild(probe)
    out[key] = probe.getBoundingClientRect().width
    probe.remove()
  }
  return out
}

function useTokenPx<T extends Record<string, string>>(roles: T): Record<keyof T, number> {
  const [px, setPx] = React.useState(() => measureTokens(roles))
  React.useLayoutEffect(() => setPx(measureTokens(roles)), []) // eslint-disable-line react-hooks/exhaustive-deps
  return px
}

function getChartColor(index: number) {
  return `var(--chart-${(index % CHART_SERIES_COUNT) + 1})`
}

const ChartContext = React.createContext<ChartContextProps | null>(null)

function useChart() {
  const context = React.useContext(ChartContext)

  if (!context) {
    throw new Error("useChart must be used within a <ChartContainer />")
  }

  return context
}

function ChartContainer({
  id,
  className,
  children,
  config,
  initialDimension = INITIAL_DIMENSION,
  onClick,
  ...props
}: React.ComponentProps<"div"> & {
  config: ChartConfig
  children: React.ComponentProps<
    typeof RechartsPrimitive.ResponsiveContainer
  >["children"]
  initialDimension?: {
    width: number
    height: number
  }
}) {
  const uniqueId = React.useId()
  const chartId = `chart-${id ?? uniqueId.replace(/:/g, "")}`
  const [activeKey, setActiveKey] = React.useState<string | null>(null)
  const contextValue = React.useMemo(() => ({ config, activeKey }), [config, activeKey])

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    onClick?.(event)
    const target = (event.target as Element).closest<HTMLElement>("[data-series]")
    const key = target?.dataset.series ?? null
    setActiveKey((current) => (key && key !== current ? key : null))
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") setActiveKey(null)
  }

  return (
    <ChartContext.Provider value={contextValue}>
      <div
        data-slot="chart"
        data-chart={chartId}
        data-active-series={activeKey ?? undefined}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        className={cn(
          "flex aspect-video justify-center text-(length:--font-size-xs) select-none [&_.recharts-wrapper]:outline-hidden [&_.recharts-wrapper_*]:outline-hidden [&_[data-series]]:cursor-pointer [&_[data-series]]:transition-opacity [&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-layer]:outline-hidden [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted [&_.recharts-sector]:outline-hidden [&_.recharts-surface]:outline-hidden",
          className
        )}
        {...props}
      >
        <ChartStyle id={chartId} config={config} />
        <RechartsPrimitive.ResponsiveContainer
          initialDimension={initialDimension}
        >
          {children}
        </RechartsPrimitive.ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  )
}

const ChartStyle = ({ id, config }: { id: string; config: ChartConfig }) => {
  const colorConfig = Object.entries(config).filter(
    ([, config]) => config.theme ?? config.color
  )

  if (!colorConfig.length) return null

  const hasThemeColors = colorConfig.some(([, item]) => item.theme)
  const themes = (hasThemeColors ? Object.entries(THEMES) : [["light", ""]]) as [string, string][]

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: themes
          .map(
            ([theme, prefix]) => `
${prefix} [data-chart=${id}] {
${colorConfig
  .map(([key, itemConfig]) => {
    const color =
      itemConfig.theme?.[theme as keyof typeof itemConfig.theme] ??
      itemConfig.color
    return color ? `  --color-${key}: ${color};` : null
  })
  .join("\n")}
}
${colorConfig
  .map(([key]) => `[data-chart=${id}][data-active-series="${key}"] [data-series]:not([data-series="${key}"]) { opacity: var(--chart-inactive-opacity); }\n[data-chart=${id}][data-active-series="${key}"] button[data-series="${key}"] { opacity: 1; }`)
  .join("\n")}
`
          )
          .join("\n"),
      }}
    />
  )
}

const ChartTooltip = RechartsPrimitive.Tooltip

function ChartTooltipContent({
  active,
  payload,
  className,
  indicator = "dot",
  hideLabel = false,
  hideIndicator = false,
  label,
  labelFormatter,
  labelClassName,
  formatter,
  color,
  nameKey,
  labelKey,
}: React.ComponentProps<typeof RechartsPrimitive.Tooltip> &
  React.ComponentProps<"div"> & {
    hideLabel?: boolean
    hideIndicator?: boolean
    indicator?: "line" | "dot" | "dashed"
    nameKey?: string
    labelKey?: string
  } & Omit<
    RechartsPrimitive.DefaultTooltipContentProps<
      TooltipValueType,
      TooltipNameType
    >,
    "accessibilityLayer"
  >) {
  const { config } = useChart()

  const tooltipLabel = React.useMemo(() => {
    if (hideLabel || !payload?.length) {
      return null
    }

    const [item] = payload
    const key = `${labelKey ?? item?.dataKey ?? item?.name ?? "value"}`
    const itemConfig = getPayloadConfigFromPayload(config, item, key)
    const value =
      !labelKey && typeof label === "string"
        ? (config[label]?.label ?? label)
        : itemConfig?.label

    if (labelFormatter) {
      return (
        <div className={cn("font-(--typography-label-sm-font-weight)", labelClassName)}>
          {labelFormatter(value, payload)}
        </div>
      )
    }

    if (!value) {
      return null
    }

    return <div className={cn("font-(--typography-label-sm-font-weight)", labelClassName)}>{value}</div>
  }, [
    label,
    labelFormatter,
    payload,
    hideLabel,
    labelClassName,
    config,
    labelKey,
  ])

  if (!active || !payload?.length) {
    return null
  }

  const nestLabel = payload.length === 1 && indicator !== "dot"

  return (
    <div
      className={cn(
        "grid min-w-(--size-128) items-start gap-(--spacing-stack-2xs) rounded-(--radius-lg) border border-border/[calc(var(--opacity-half)*100%)] bg-background px-(--spacing-inset-md) py-(--spacing-stack-2xs) text-(length:--font-size-xs) shadow-(--elevation-scale-xl)",
        className
      )}
    >
      {!nestLabel ? tooltipLabel : null}
      <div className="grid gap-(--spacing-stack-2xs)">
        {payload
          .filter((item) => item.type !== "none")
          .map((item, index) => {
            const key = `${nameKey ?? item.name ?? item.dataKey ?? "value"}`
            const itemConfig = getPayloadConfigFromPayload(config, item, key)
            const indicatorColor = color ?? item.payload?.fill ?? item.color

            return (
              <div
                key={index}
                className={cn(
                  "flex w-(--size-share-full) flex-wrap items-stretch gap-(--spacing-inline-sm) [&>svg]:h-(--size-icon-2xs) [&>svg]:w-(--size-icon-2xs) [&>svg]:text-muted-foreground",
                  indicator === "dot" && "items-center"
                )}
              >
                {formatter && item?.value !== undefined && item.name ? (
                  formatter(item.value, item.name, item, index, item.payload)
                ) : (
                  <>
                    {itemConfig?.icon ? (
                      <itemConfig.icon />
                    ) : (
                      !hideIndicator && (
                        <div
                          className={cn(
                            "shrink-0 rounded-(--radius-xs) border-(--color-border) bg-(--color-bg)",
                            {
                              "h-(--size-icon-2xs) w-(--size-icon-2xs)":
                                indicator === "dot",
                              "w-(--spacing-inline-xs)": indicator === "line",
                              "w-0 border-(length:--border-width-thick) border-dashed bg-transparent":
                                indicator === "dashed",
                              "my-(--spacing-stack-3xs)":
                                nestLabel && indicator === "dashed",
                            }
                          )}
                          style={
                            {
                              "--color-bg": indicatorColor,
                              "--color-border": indicatorColor,
                            } as React.CSSProperties
                          }
                        />
                      )
                    )}
                    <div
                      className={cn(
                        "flex flex-1 justify-between leading-none",
                        nestLabel ? "items-end" : "items-center"
                      )}
                    >
                      <div className="grid gap-(--spacing-stack-2xs)">
                        {nestLabel ? tooltipLabel : null}
                        <span className="text-muted-foreground">
                          {itemConfig?.label ?? item.name}
                        </span>
                      </div>
                      {item.value != null && (
                        <span className="font-mono font-(--typography-label-sm-font-weight) text-foreground tabular-nums">
                          {typeof item.value === "number"
                            ? item.value.toLocaleString()
                            : String(item.value)}
                        </span>
                      )}
                    </div>
                  </>
                )}
              </div>
            )
          })}
      </div>
    </div>
  )
}

const ChartLegend = RechartsPrimitive.Legend

function ChartLegendContent({
  className,
  hideIcon = false,
  payload,
  verticalAlign = "bottom",
  nameKey,
}: React.ComponentProps<"div"> & {
  hideIcon?: boolean
  nameKey?: string
} & RechartsPrimitive.DefaultLegendContentProps) {
  const { config, activeKey } = useChart()

  if (!payload?.length) {
    return null
  }

  return (
    <div
      className={cn(
        "flex items-center justify-center gap-(--spacing-inline-xs)",
        verticalAlign === "top"
          ? "pb-(--spacing-stack-xs)"
          : "pt-(--spacing-stack-xs)",
        className
      )}
    >
      {payload
        .filter((item) => item.type !== "none")
        .map((item, index) => {
          const key = `${nameKey ?? item.dataKey ?? "value"}`
          const itemConfig = getPayloadConfigFromPayload(config, item, key)

          return (
            <button
              type="button"
              key={index}
              data-series={getPayloadSeriesKey(item, key)}
              aria-pressed={activeKey === getPayloadSeriesKey(item, key)}
              className={cn(
                "flex cursor-pointer items-center gap-(--spacing-stack-2xs) rounded-(--radius-xs) transition-opacity outline-none focus-visible:ring-(length:--focus-ring-width) focus-visible:ring-primary-focus-ring [&>svg]:h-(--size-icon-3xs) [&>svg]:w-(--size-icon-3xs) [&>svg]:text-muted-foreground"
              )}
            >
              {itemConfig?.icon && !hideIcon ? (
                <itemConfig.icon />
              ) : (
                <div
                  className="h-(--size-dot) w-(--size-dot) shrink-0 rounded-(--radius-xs)"
                  style={{
                    backgroundColor: item.color,
                  }}
                />
              )}
              {itemConfig?.label}
            </button>
          )
        })}
    </div>
  )
}

function getPayloadSeriesKey(payload: unknown, key: string) {
  if (typeof payload !== "object" || payload === null) return key
  const inner =
    "payload" in payload &&
    typeof payload.payload === "object" &&
    payload.payload !== null
      ? payload.payload
      : undefined
  if (key in payload && typeof payload[key as keyof typeof payload] === "string")
    return payload[key as keyof typeof payload] as string
  if (inner && key in inner && typeof inner[key as keyof typeof inner] === "string")
    return inner[key as keyof typeof inner] as string
  return key
}

function getPayloadConfigFromPayload(
  config: ChartConfig,
  payload: unknown,
  key: string
) {
  if (typeof payload !== "object" || payload === null) {
    return undefined
  }

  const payloadPayload =
    "payload" in payload &&
    typeof payload.payload === "object" &&
    payload.payload !== null
      ? payload.payload
      : undefined

  let configLabelKey: string = key

  if (
    key in payload &&
    typeof payload[key as keyof typeof payload] === "string"
  ) {
    configLabelKey = payload[key as keyof typeof payload] as string
  } else if (
    payloadPayload &&
    key in payloadPayload &&
    typeof payloadPayload[key as keyof typeof payloadPayload] === "string"
  ) {
    configLabelKey = payloadPayload[
      key as keyof typeof payloadPayload
    ] as string
  }

  return configLabelKey in config ? config[configLabelKey] : config[key]
}

export {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  ChartStyle,
  getChartColor,
  useTokenPx,
}
