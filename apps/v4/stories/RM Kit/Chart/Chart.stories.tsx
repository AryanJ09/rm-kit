import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Card, CardContent } from "@/registry/bases/base/ui/card"
import { DatasetChart, Panel, PortfolioCard } from "./ChartParts"
import { StackedBarChart } from "@/rm-style/ui/stacked-bar-chart"
import { datasets } from "./chart-data"

const meta = {
  title: "RM Kit/Chart",
  parameters: { layout: "fullscreen" },
} satisfies Meta
export default meta
type Story = StoryObj<typeof meta>

const page = "grid grid-cols-[repeat(auto-fill,minmax(398px,1fr))] items-start gap-(--spacing-stack-md) p-(--spacing-page-content)"
const rv = datasets["rv.rajesh"]
const inv = datasets["investments.rajesh"]
const datasetNames = Object.keys(datasets).filter((k) => k !== "allocation.rajesh")

export const Overview: Story = {
  name: "Datasets",
  render: () => (
    <div className={page}>
      {datasetNames.map((n) => (
        <Panel key={n} title={`${n} · ${datasets[n].unit}`}>
          <DatasetChart name={n} />
        </Panel>
      ))}
    </div>
  ),
}

export const States: Story = {
  render: () => (
    <div className={page}>
      {(["populated", "loading", "noData", "error"] as const).map((s) => (
        <Panel key={s} title={`state = ${s}`}>
          <DatasetChart name="rv.rajesh" state={s} />
        </Panel>
      ))}
      <Panel title="showLegend = false">
        <Card pattern="detail"><CardContent>
          <StackedBarChart series={rv.series} points={rv.points} unit="L" showLegend={false} summary={rv.summary!} />
        </CardContent></Card>
      </Panel>
      <Panel title="showValueLabels = false">
        <Card pattern="detail"><CardContent>
          <StackedBarChart series={rv.series} points={rv.points} unit="L" showValueLabels={false} summary={rv.summary!} />
        </CardContent></Card>
      </Panel>
    </div>
  ),
}

export const Scale: Story = {
  render: () => (
    <div className={page}>
      <Panel title="scale = absolute · investments value">
        <DatasetChart name="investments.rajesh" />
      </Panel>
      <Panel title="scale = percent · investments mix">
        <Card pattern="detail"><CardContent>
          <StackedBarChart scale="percent" unit="%" series={inv.series} points={inv.points} showValueLabels={false} summary="Investment mix by asset class, bars total 100%." />
        </CardContent></Card>
      </Panel>
      <Panel title="scale = percent · allocation">
        <DatasetChart name="allocation.rajesh" />
      </Panel>
    </div>
  ),
}

export const PortfolioCardStory: Story = {
  name: "Portfolio card",
  render: () => (
    <div className={page}>
      <Panel title="Chart inside Card · click a bar or legend item to highlight a series">
        <PortfolioCard />
      </Panel>
    </div>
  ),
}
