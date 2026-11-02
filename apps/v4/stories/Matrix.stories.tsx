// Hand-written. The RM Kit matrix: rows by columns of tinted value tiles. Labels, values and tones are data.
import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { Matrix, type MatrixColumn, type MatrixRow } from "@/rm-style/ui/matrix"

const meta = { title: "RM Kit/Matrix", component: Matrix, tags: ["autodocs"], parameters: { layout: "padded" } } satisfies Meta<typeof Matrix>
export default meta
type Story = StoryObj<typeof meta>

const columns: MatrixColumn[] = [
  { id: "a", label: "Guard", tone: "success", hint: "In programme, target met" },
  { id: "b", label: "Revive", tone: "aggressive", hint: "In programme, below threshold" },
  { id: "c", label: "Upgrade", tone: "growth", hint: "Target met, not signed up" },
  { id: "d", label: "Acquire", tone: "moderate", hint: "Potential, below threshold" },
]
const rows: MatrixRow[] = [
  { id: "r1", label: "Tier one", caption: "100 records" },
  { id: "r2", label: "Tier two", caption: "80 records" },
  { id: "r3", label: "Tier three", caption: "120 records" },
]
const values = {
  r1: { a: 60, b: 40, c: 40, d: 80 },
  r2: { a: 30, b: 50, c: 55, d: 120 },
  r3: { a: 95, b: 25, c: 70, d: 150 },
}

/** The matrix: heading dots and tile tints come from each column's tone. */
export const Playground: Story = {
  args: { columns, rows, values },
  render: (args) => (
    <div className="w-(--size-layout-frame-width) max-w-full">
      <Matrix {...args} />
    </div>
  ),
}

/** Tiles as buttons: give it onCellClick. */
export const Interactive: Story = {
  args: { columns, rows, values, onCellClick: () => {} },
  render: (args) => (
    <div className="w-(--size-layout-frame-width) max-w-full">
      <Matrix {...args} />
    </div>
  ),
}
