import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { DatasetChart, Panel } from "./ChartParts"
import { datasets } from "./chart-data"

const meta = {
  title: "RM Kit/Chart/Stacked bar chart",
  parameters: { layout: "fullscreen" },
} satisfies Meta
export default meta
type Story = StoryObj<typeof meta>

const page = "grid grid-cols-[repeat(auto-fill,minmax(var(--size-layout-frame-width),1fr))] items-start gap-(--spacing-stack-md) p-(--spacing-page-content)"
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
        <DatasetChart name="rv.rajesh" showLegend={false} />
      </Panel>
      <Panel title="showValueLabels = false">
        <DatasetChart name="rv.rajesh" showValueLabels={false} />
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
        <DatasetChart name="investments.rajesh" scale="percent" showValueLabels={false} />
      </Panel>
      <Panel title="scale = percent · allocation">
        <DatasetChart name="allocation.rajesh" />
      </Panel>
    </div>
  ),
}
