import React, { useState } from "react"
import { createRoot } from "react-dom/client"
import { Card, CardContent } from "@/registry/bases/base/ui/card"
import { StackedBarChart as Chart, type ChartState } from "@/rm-style/ui/stacked-bar-chart"
import { DatasetChart, Panel, PortfolioCard } from "@/stories/RM Kit/Chart/ChartParts"
import { aiRules, datasets, decisionTree } from "@/stories/RM Kit/Chart/chart-data"
import { getChartSeries } from "@/rm-style/ui/chart-series"
import "./styles.css"

const view = ["Datasets", "States", "Scale", "Portfolio card", "Palette", "Rules"] as const
type View = (typeof view)[number]

const datasetNames = Object.keys(datasets).filter((k) => k !== "allocation.rajesh")
const rv = datasets["rv.rajesh"]

function Datasets() {
  return (
    <div className="page grid">
      {datasetNames.map((n) => (
        <Panel key={n} title={`${n} · ${datasets[n].unit}`}>
          <DatasetChart name={n} />
        </Panel>
      ))}
    </div>
  )
}

function States() {
  const states: ChartState[] = ["populated", "loading", "noData", "error"]
  return (
    <div className="page grid">
      {states.map((s) => (
        <Panel key={s} title={`state = ${s}`}>
          <DatasetChart name="rv.rajesh" state={s} />
        </Panel>
      ))}
      <Panel title="showLegend = false">
        <Card pattern="detail"><CardContent>
          <Chart series={rv.series} points={rv.points} unit="L" showLegend={false} summary={rv.summary!} />
        </CardContent></Card>
      </Panel>
      <Panel title="showValueLabels = false">
        <Card pattern="detail"><CardContent>
          <Chart series={rv.series} points={rv.points} unit="L" showValueLabels={false} summary={rv.summary!} />
        </CardContent></Card>
      </Panel>
    </div>
  )
}

function Scale() {
  const inv = datasets["investments.rajesh"]
  return (
    <div className="page grid">
      <Panel title="scale = absolute · investments value">
        <DatasetChart name="investments.rajesh" />
      </Panel>
      <Panel title="scale = percent · investments mix (same series family, shares)">
        <Card pattern="detail"><CardContent>
          <Chart scale="percent" unit="%" series={inv.series} points={inv.points} showValueLabels={false} summary="Investment mix by asset class, bars total 100%." />
        </CardContent></Card>
      </Panel>
      <Panel title="scale = percent · allocation.rajesh (CH8)">
        <DatasetChart name="allocation.rajesh" />
      </Panel>
    </div>
  )
}

function Portfolio() {
  return (
    <div className="page grid">
      <Panel title="Card (pattern=chart recipe) · interactive, synthetic data">
        <PortfolioCard />
      </Panel>
      <Panel title="Chart inside Card · state = loading">
        <DatasetChart name="assets.rajesh" state="loading" />
      </Panel>
    </div>
  )
}

function Palette() {
  const keys = [...new Set(Object.values(datasets).flatMap((d) => d.series))]
  return (
    <div className="page">
      <p className="rmchart-caption" style={{ margin: 0 }}>
        Colours come from the RM kit chart tokens (<code>--chart-deposits</code>, <code>--chart-investments</code> …).
        Series with no RM colour use a stable fallback slot.
      </p>
      <table className="swatch-table">
        <thead><tr><th>Series</th><th>Colour token</th></tr></thead>
        <tbody>
          {keys.map((k) => {
            const t = getChartSeries(k)
            return (
              <tr key={k}>
                <td><span className="swatch" style={{ background: t?.colour ?? "transparent" }} />{k}</td>
                <td>{t?.token ? <code>--chart-{t.token}</code> : t?.colour ?? <em>stable fallback slot</em>}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

function Rules() {
  return (
    <div className="page">
      <h3 style={{ margin: 0 }}>AI rules</h3>
      <ol className="rules">{aiRules.map((r) => <li key={r}>{r}</li>)}</ol>
      <h3 style={{ margin: 0 }}>Decision tree</h3>
      <ul className="rules">{decisionTree.map((d) => <li key={d.ask}><strong>{d.ask}</strong> → {d.use}</li>)}</ul>
    </div>
  )
}

function App() {
  const [v, setV] = useState<View>("Datasets")
  return (
    <div className="sandbox">
      <header className="topbar">
        <div>
          <strong>RM Kit · Chart sandbox</strong>
          <p>Chart.consolidated.json v1.1.0 · built on rm-style/ui/chart.tsx · isolated from Storybook</p>
        </div>
        <nav>
          {view.map((n) => (
            <button key={n} className={n === v ? "selected" : ""} onClick={() => setV(n)}>{n}</button>
          ))}
        </nav>
      </header>
      {v === "Datasets" && <Datasets />}
      {v === "States" && <States />}
      {v === "Scale" && <Scale />}
      {v === "Portfolio card" && <Portfolio />}
      {v === "Palette" && <Palette />}
      {v === "Rules" && <Rules />}
    </div>
  )
}

createRoot(document.getElementById("root")!).render(<App />)
