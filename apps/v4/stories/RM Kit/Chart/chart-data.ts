import data from "./chart-data.json"

export type SeriesKey = keyof typeof data.series
export type Unit = "L" | "Cr" | "K" | "%"
export type Point = {
  period: string
  totalLabel: string
  values: Record<string, number>
}
export type Dataset = {
  unit: string
  series: string[]
  points: Point[]
  summary?: string
  scale?: string
}

export const datasets = data.datasets as unknown as Record<string, Dataset>
export const { tabs, examples, aiRules, decisionTree } = data
