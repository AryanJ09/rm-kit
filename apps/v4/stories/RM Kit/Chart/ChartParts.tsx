import React, { useState } from "react"
import { ArrowDown, ArrowUp } from "lucide-react"
import { Button } from "@/rm-style/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/registry/bases/base/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/rm-style/ui/tabs"
import { StackedBarChart, type ChartState } from "@/rm-style/ui/stacked-bar-chart"
import { datasets, examples, tabs as tabSpec } from "./chart-data"

export function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rmchart-panel">
      <h3>{title}</h3>
      <div className="rmchart-frame">{children}</div>
    </section>
  )
}

export function DatasetChart({ name, ...rest }: { name: string; state?: ChartState }) {
  const d = datasets[name]
  return (
    <Card pattern="detail" density="comfortable">
      <CardContent>
        <StackedBarChart
          series={d.series}
          points={d.points}
          unit={d.unit}
          scale={d.scale === "percent" ? "percent" : "absolute"}
          showValueLabels={d.scale !== "percent"}
          summary={d.summary ?? name}
          {...rest}
        />
      </CardContent>
    </Card>
  )
}

const trendIcon = { positive: ArrowUp, negative: ArrowDown, neutral: null } as const

export function PortfolioCard() {
  const [tab, setTab] = useState("rv")
  const [mix, setMix] = useState<"value" | "allocation">("value")
  const ex = examples.find((e) => e.tab === tab && e.chart.endsWith("rajesh"))
  if (!ex) return <Card pattern="detail"><CardContent>No chart available.</CardContent></Card>
  const name = tab === "investments" && mix === "allocation" ? "allocation.rajesh" : ex.chart.replace("datasets.", "")
  const d = datasets[name]
  const spec = tabSpec[tab as keyof typeof tabSpec]
  const pct = name === "allocation.rajesh"
  return (
    <Card pattern="detail">
      <CardHeader>
        <CardTitle>Banking Portfolio</CardTitle>
        <CardDescription>{spec.subtitle}</CardDescription>
      </CardHeader>
      <Tabs className="min-w-0" value={tab} onValueChange={(v) => { setTab(String(v)); setMix("value") }}>
        <TabsList variant="line" className="w-full justify-start overflow-x-auto">
          {Object.entries(tabSpec).map(([k, t]) => (
            <TabsTrigger key={k} value={k} className="flex-none px-1 text-[13px]">{t.label}</TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
      <CardContent className="rmchart-portfolio-body">
        <div className="rmchart-row"><span>{ex.headline.label}</span><strong>{ex.headline.value}</strong></div>
        <div className="rmchart-metric-strip">
          {(ex.metricStrip ?? []).map((m) => {
            const Icon = trendIcon[m.trend as keyof typeof trendIcon]
            return (
              <div key={m.label}>
                <div className="rmchart-label">{m.label}</div>
                <div className={`rmchart-change rmchart-${m.trend}`}>
                  {Icon && <Icon size={14} aria-hidden />}
                  {m.change.replace(/^[+]/, "")}
                  <span className="sr-only">{m.trend}</span>
                </div>
              </div>
            )
          })}
        </div>
        {tab === "investments" && (
          <div className="rmchart-chips" role="group" aria-label="Chart view">
            {(["value", "allocation"] as const).map((v) => (
              <Button key={v} size="sm" variant={mix === v ? "default" : "outline"} onClick={() => setMix(v)}>
                {v === "value" ? "Value" : "Allocation"}
              </Button>
            ))}
          </div>
        )}
        <StackedBarChart
          series={d.series}
          points={d.points}
          unit={d.unit}
          scale={pct ? "percent" : "absolute"}
          showValueLabels={!pct}
          summary={d.summary ?? name}
        />
        {"breakdown" in ex && ex.breakdown && (
          <>
            <div className="rmchart-divider" />
            {ex.breakdown.map((b) => (
              <div className="rmchart-row" key={b.label}><span>{b.label}</span><span>{b.value}</span></div>
            ))}
          </>
        )}
        {"footnote" in ex && ex.footnote && <p className="rmchart-caption m-0">{ex.footnote}</p>}
      </CardContent>
    </Card>
  )
}
